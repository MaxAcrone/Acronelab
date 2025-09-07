// u0422u0438u043fu044b u0434u0430u043du043du044bu0445 u0434u043bu044f u043fu0440u043eu0435u043au0442u043eu0432

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  previewUrl?: string;
  client?: string;
  services?: string[];
  goals?: string;
  screens?: string[];
  featured?: boolean;
}

// u0422u0438u043fu044b u0434u043bu044f FAQ
export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

// u0422u0438u043fu044b u0434u043bu044f u043eu0442u0437u044bu0432u043eu0432
export interface Testimonial {
  id: number;
  name: string;
  company: string;
  role?: string;
  avatar?: string;
  rating: number;
  text: string;
}
