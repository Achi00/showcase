import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import Infinite from "@/components/Infinite";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import ProjectsOfDay from "@/components/ProjectsOfDay";
import { fetchAllProjects } from "@/lib/actions";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
}

type Props = {
  searchParams: SearchParams
}

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  },
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = await fetchAllProjects(category, endcursor) as ProjectSearch

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text font-bold text-center glow text-primary-purple">No projects found, go create some first.</p>
      </section>
    )
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
      <ProjectsOfDay />
      <Infinite searchParams={{
        category: category,
        endcursor: endcursor
      }} />
    </section>
  )
};

export default Home;