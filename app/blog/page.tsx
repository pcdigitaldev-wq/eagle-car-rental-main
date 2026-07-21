import React, { Suspense } from "react";
import Banner from "../_components/Banner";
import Container from "../_components/Container";
import CategoriesFeed from "./_components/CategoriesFeed";
import { Skeleton } from "@/components/ui/skeleton";
import BlogsFeed from "./_components/BlogsFeed";
import LatestBLogsFeed from "./_components/LatestBLogsFeed";

type Props = {
  searchParams: Promise<{ category: string }>;
};

const BlogPage = async ({ searchParams }: Props) => {
  const category = (await searchParams).category;
  return (
    <div>
      <Banner label="Blogs" />
      <Container className="py-4">
        {/* categories */}
        <Suspense
          fallback={
            <Skeleton className="min-h-[100px] bg-muted-foreground rounded-md w-full" />
          }
        >
          <CategoriesFeed category={category} />
        </Suspense>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px] mt-4">
          <div className="col-span-1 md:col-span-2">
            {/* Blogs */}
            <div className="">
              <Suspense
                key={category}
                fallback={
                  <Skeleton className="min-h-[400px] bg-muted-foreground rounded-md w-full" />
                }
              >
                <BlogsFeed category={category} />
              </Suspense>
            </div>
          </div>

          {/* Last Blogs */}
          <div>
            <Suspense
              fallback={
                <Skeleton className="min-h-[600px] bg-muted-foreground rounded-md w-full" />
              }
            >
              <LatestBLogsFeed category={category} />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
