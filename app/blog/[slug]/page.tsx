import Banner from "@/app/_components/Banner";
import Container from "@/app/_components/Container";
import React, { Suspense } from "react";
import BlogElement from "./_components/BlogElement";
import { Skeleton } from "@/components/ui/skeleton";
import CategoriesCount from "./_components/CategoriesCount";
import RelatedBlogs from "./_components/RelatedBlogs";
import { getBlog } from "@/lib/utils";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams(){
  const blogs = await prisma.blog.findMany()

  return blogs.map(blog=>({slug:blog.slug}))
}

const SingleBlogPage = async ({ params }: Props) => {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) notFound();
  return (
    <div>
      <Banner label="Blog" />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[65px] mt-[68px]">
          {/* Blog */}
          <div className="col-span-1 md:col-span-2">
            <Suspense
              fallback={
                <Skeleton className="min-h-[700px] bg-muted-foreground rounded-md" />
              }
            >
              <BlogElement slug={slug} />
            </Suspense>
          </div>

          {/* Categories and numbers */}
          <Suspense
            fallback={
              <Skeleton className="min-h-[700px] bg-muted-foreground rounded-md" />
            }
          >
            <CategoriesCount />
          </Suspense>
        </div>
        {/* Related Blogs */}
        <div className="mt-[87px]">
          <RelatedBlogs category={blog.categoryId} slug={slug} />
        </div>
      </Container>
    </div>
  );
};

export default SingleBlogPage;
