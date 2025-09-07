import projectsData from '../data/projects.json';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  slug: string;
  content: string;
  featured: boolean;
  date?: string;
  client?: string;
  services?: string[];
  goals?: string;
  screens?: string[];
  previewUrl?: string;
}

export function getAllProjects(): { projects: Project[] } {
  return projectsData;
}

export function getProjectBySlug(slug: string): Project | undefined {
  const { projects } = getAllProjects();
  return projects.find(project => project.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  const { projects } = getAllProjects();
  return projects.filter(project => project.category === category);
}

export function getFeaturedProjects(): Project[] {
  const { projects } = getAllProjects();
  return projects.filter(project => project.featured);
}

export function searchProjects(query: string): Project[] {
  const { projects } = getAllProjects();
  const lowercaseQuery = query.toLowerCase();
  
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    project.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function getProjectCategories(): string[] {
  const { projects } = getAllProjects();
  const categories = new Set(projects.map(project => project.category));
  return Array.from(categories);
}
