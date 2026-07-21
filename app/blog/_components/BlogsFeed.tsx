import BlogCard from '@/app/_components/BlogCard'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {
    category:string
}

const BlogsFeed =async ({category}: Props) => {
    const blogs =await  prisma.blog.findMany({
        where:{
            ...(category && {categoryId:category})
        },
        orderBy:{
            createdAt:'desc'
        }
    })

  return (
    <div className='col-span-1 md:col-span-2'>
        {!!blogs.length && <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
            {blogs.map(blog=><BlogCard key={blog.id} blog={blog} />)}
            </div>}

    </div>
  )
}

export default BlogsFeed