"use client";

import { useRouter } from "next/navigation";
import { useState } from 'react'
import Button from "./Button";
import { useEffect } from "react";

type Props = {
    startCursor: string
    endCursor: string
    hasPreviousPage: boolean
    hasNextPage: boolean
}

const LoadMore = ({ startCursor, endCursor, hasPreviousPage, hasNextPage }: Props) => {
    const router = useRouter();
    const [pathnameHistory, setPathnameHistory] = useState<string[]>([]);

    useEffect(() => {
        setPathnameHistory([window.location.href]);
      }, []);

    const handleNavigation = (type: string) => {
        const currentParams = new URLSearchParams(window.location.search);

        if (type === "next" && hasNextPage) {
          setPathnameHistory([...pathnameHistory, window.location.href]);
          currentParams.set("endcursor", endCursor);
        } else if (type === "prev" && hasPreviousPage && pathnameHistory.length > 0) {
          const previousPathname = pathnameHistory.pop()!;
          setPathnameHistory([...pathnameHistory]);
          router.push(previousPathname);
          return; // exit early since we don't need to construct a new pathname
        }

        const newSearchParams = currentParams.toString();
        const newPathname = `${window.location.pathname}?${newSearchParams}`;

        router.push(newPathname);
      };

    return (
        <div className="w-full flexCenter gap-5 mt-10">
            {hasPreviousPage && (
                <Button title="Previous Page" handleClick={() => handleNavigation('prev')} />
            )}
            {hasNextPage && (
                <Button title="Next Page" handleClick={() => handleNavigation('next')} />
            )}
        </div>
    );
};

export default LoadMore;