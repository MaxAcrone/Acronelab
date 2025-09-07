import { Metadata } from 'next';
import { getAllProjects } from '../../utils/projectManager';
import ProjectsClient from './ProjectsClient';
import Header from '../../components/Header';

// Получаем данные проектов из JSON файла
const { projects } = getAllProjects();

// Метаданные страницы
export const metadata: Metadata = {
  title: 'Projects | Acronelab Portfolio',
  description: 'Explore our innovative projects across Web3, Finance, Gaming, SaaS, E-commerce, and Health',
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <ProjectsClient projects={projects} />
    </>
  );
}
