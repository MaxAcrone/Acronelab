import { Metadata } from 'next';
import { getAllProjects } from '../../../utils/projectManager';
import ProjectDetailClient from './ProjectDetailClient';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { projects } = getAllProjects();
  const project = projects.find(p => p.slug === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found'
    };
  }

  return {
    title: `${project.title} | Acronelab Portfolio`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const { projects } = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { projects } = getAllProjects();
  const project = projects.find(p => p.slug === params.slug);
  
  if (!project) {
    notFound();
  }

  const relatedProjects = projects
    .filter(p => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} />;
}
