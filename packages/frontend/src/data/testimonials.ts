import { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ryan Harper',
    company: 'Microsoft',
    role: 'CEO',
    avatar: '/testimonials/microsoft.svg',
    rating: 5,
    text: 'Using this analytics tool has been a game-changer for our team. The seamless interface and actionable insights make every decision smarter.'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    company: 'Google',
    role: 'Product Manager',
    avatar: '/testimonials/google.svg',
    rating: 5,
    text: 'The attention to detail in the design process was exceptional. Our platform not only looks beautiful but also performs brilliantly. The user engagement metrics have increased by 45% since launch.'
  },
  {
    id: 3,
    name: 'Michael Chen',
    company: 'Apple',
    role: 'CTO',
    avatar: '/testimonials/apple.svg',
    rating: 4.8,
    text: 'The development team delivered our complex application ahead of schedule with all the features we requested. Their technical expertise and problem-solving abilities are truly impressive.'
  },
  {
    id: 4,
    name: 'Emma Rodriguez',
    company: 'Amazon',
    role: 'Design Director',
    avatar: '/testimonials/amazon.svg',
    rating: 5,
    text: 'As a design studio, we have high standards for visual work. The branding package created for us exceeded our expectations and perfectly captured our company\'s essence.'
  }
];