'use client'
import { useState, useEffect } from 'react';
import { ProjectInterface } from '@/common.types';
import { fetchAllProjects } from '@/lib/actions';
import React from 'react'
import ProjectCard from './ProjectCard';
import InfiniteScroll from "react-infinite-scroll-component";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
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

type Props = {
  searchParams: SearchParams
}

const Infinite = ({ searchParams }: Props) => {
  const { category = null, endcursor = null } = searchParams;
  const [projects, setProjects] = useState<ProjectSearch["projectSearch"]["edges"]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState<string | null>(endcursor);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const fetchData = async () => {
    const data = await fetchAllProjects(category, endCursor) as ProjectSearch;
    if (data.projectSearch.edges.length === 0) {
      setHasMore(false);
      return(
        <p className='font-bold glow text-primary-purple'>No Posts To Show...</p>
      )
    }
    setEndCursor(data?.projectSearch?.pageInfo?.endCursor || null);
    setProjects(prevProjects => [...prevProjects, ...data.projectSearch.edges]);
    setShouldRefetch(false);
  };

  useEffect(() => {
    setProjects([]);
    setEndCursor(null);
    setHasMore(true);
    setShouldRefetch(true);
  }, [category]);

  useEffect(() => {
    if (shouldRefetch) {
      fetchData();
    }
  }, [shouldRefetch, endCursor]);

  return (
    <InfiniteScroll
      dataLength={projects.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <div className="flex w-full justify-center items-center text-center pt-10">
          <h1 className="font-bold glow text-primary-purple">Scroll Down To Load More</h1>
        </div>
      }
      endMessage={
        <div className="flex w-full justify-center items-center text-center pt-10">
          <p className="font-bold glow text-primary-purple text-center">
            You have seen it all
          </p>
        </div>
      }
    >
      <section className="projects-grid">
        {projects.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
            category={node?.category}
          />
        ))}
      </section>
    </InfiniteScroll>
  )
}

export default Infinite;
