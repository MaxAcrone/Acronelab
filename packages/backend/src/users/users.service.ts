import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName } = createUserDto;

    // Check if user already exists
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        role: 'USER',
        isActive: true,
      },
    });

    // Create profile
    await this.prisma.profile.create({
      data: {
        userId: user.id,
        bio: '',
        website: '',
        location: '',
        company: '',
        jobTitle: '',
        skills: '[]',
        experience: '[]',
        education: '[]',
        socialLinks: '{}',
      },
    });

    // Create subscription
    await this.prisma.subscription.create({
      data: {
        userId: user.id,
        status: 'INACTIVE',
        cancelAtPeriodEnd: false,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        profile: true,
      },
    });
    return users;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        subscriptions: true,
        payments: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        subscriptions: true,
        payments: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        profile: true,
        subscriptions: true,
        payments: true,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }

  async updateProfile(id: string, profileData: any) {
    await this.findById(id);

    const updatedProfile = await this.prisma.profile.update({
      where: { userId: id },
      data: profileData,
    });

    return updatedProfile;
  }
}
