"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const { email, password, firstName, lastName } = createUserDto;
        const existingUser = await this.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
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
        await this.prisma.subscription.create({
            data: {
                userId: user.id,
                status: 'INACTIVE',
                cancelAtPeriodEnd: false,
            },
        });
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
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
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
                subscriptions: true,
                payments: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByEmail(email) {
        return await this.prisma.user.findUnique({
            where: { email },
            include: {
                profile: true,
                subscriptions: true,
                payments: true,
            },
        });
    }
    async update(id, updateUserDto) {
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
        const { password } = updatedUser, userWithoutPassword = __rest(updatedUser, ["password"]);
        return userWithoutPassword;
    }
    async remove(id) {
        await this.findById(id);
        await this.prisma.user.delete({ where: { id } });
        return { message: 'User deleted successfully' };
    }
    async updateProfile(id, profileData) {
        await this.findById(id);
        const updatedProfile = await this.prisma.profile.update({
            where: { userId: id },
            data: profileData,
        });
        return updatedProfile;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map