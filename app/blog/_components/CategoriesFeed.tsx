import SuperButton from "@/components/SuperButton";
import prisma from "@/lib/prisma";
import React from "react";

type Props = {category:string};

const CategoriesFeed = async ({category:categoryParams}: Props) => {
  const categories = await prisma.blogCategory.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section>
         <p className="text-site-primary font-semibold text-md ">Categories</p>
         <div className="flex items-center gap-4 overflow-x-auto mt-4">
       <SuperButton 
       variant={!categoryParams?'site' :'secondary'}
       className="rounded-md text-xs capitalize"
           buttonType="pushButton"
           href={`/blog`}
           title={"All"}
       />
       {categories.map((category) => (
         <SuperButton
         key={`category-${category.id}`}
         variant={categoryParams===category.id ? 'site' : 'secondary'}
         className="rounded-md text-xs capitalize"
           buttonType="pushButton"
           href={`/blog?category=${category.id}`}
           title={category.title}
         />
       ))}
     </div>
    </section>
   
  );
};

export default CategoriesFeed;
