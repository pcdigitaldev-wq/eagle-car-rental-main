import BlogCard from "@/app/_components/BlogCard";
import NoResult from "@/app/_components/NoResult";
import prisma from "@/lib/prisma";
import React from "react";

type Props = {
  category: string;
  slug: string;
};

const RelatedBlogs = async ({ category, slug }: Props) => {
  const relatedBlogs = await prisma.blog.findMany({
    where: {
      categoryId: category,
      NOT: {
        slug,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <h3 className="text-[#181A2A text-[24px] font-[700]">Related Blogs</h3>
      {!relatedBlogs.length && <NoResult title="No Related Blogs" />}
      {!!relatedBlogs.length && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[32px] gap-[68px]">
          {relatedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedBlogs;
