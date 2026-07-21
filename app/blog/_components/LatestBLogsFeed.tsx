import ImageComponent from "@/components/ImageComponent";
import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  category: string;
};

const LatestBLogsFeed = async ({ category }: Props) => {
  const latestBlogs = await prisma.blog.findMany({
    ...(category && {
      where: {
        categoryId: category,
      },
    }),
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="border rounded-[14px] p-[8px] sticky top-[110px]">
      <p className="text-[24px] font-[700]">Latest BLogs</p>
      <div className="h-[6px] mt-[6px] w-[60px] bg-[#DE2127]" />
      {/* blogs */}
      <div className="mt-[15px] flex flex-col gap-[12px]">
        {latestBlogs.map((blog) => {
          const formattedDate = formatDistanceToNow(new Date(blog.createdAt), {
            addSuffix: true,
          });
          return (
            <Link
              key={`latest-blogs-${blog.id} `}
              href={`/blog/${blog.slug}`}
              className="border-b-2 last:border-b-0 hover:shadow-md transition"
            >
              <article className="grid grid-cols-3 p-[8px] gap-[14px]  ">
                <div className="col-span-1">
                  <ImageComponent
                    src={blog.featuredImage}
                    alt="blog-image"
                    className="w-full rounded-[8px] overflow-hidden"
                    aspect="square"
                  />
                </div>
                {/* content */}
                <div className="col-span-2 flex flex-col gap-[12px] justify-center">
                  <p className="text-[#494949] font-[500] text-[16px] capitalize">
                    {blog.title}
                  </p>
                  <div className="flex   text-[#757575] text-xs   items-center gap-2">
                    <Clock className="w-[18px] h-[18px]" />
                    <p>{formattedDate}</p>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LatestBLogsFeed;
