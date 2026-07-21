import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'
 
import { cn, getBlog } from '@/lib/utils';
import { format } from 'date-fns';
import ImageComponent from '@/components/ImageComponent';
import dynamic from 'next/dynamic';
import BlogEditor from './BlogEditor';


type Props = {
    slug:string
}

 

const BlogElement = async({slug}: Props) => {

   const blog = await getBlog(slug)

    if(!blog) notFound()
  return (
    <div  >
        <span className='bg-[#0522060D] rounded-[6px] px-[10px] py-[4px] capitalize text-[14px] font-[600]'>
        {blog.category.title}
        </span>
        <h3 className='font-[700] text-[36px] text-[#181A2A] capitalize'>
            {blog.title}
        </h3>
        <p className='text-[#696A75] text-[14px] font-[600] mt-[20px]'>
            {format(new Date(blog.createdAt),'MMM dd, yyyy')}
        </p>
        <ImageComponent src={blog.featuredImage} alt='blog-image' aspect='video' className='mt-[54px] overflow-hidden rounded-[12px]' />
        <div className='mt-[54px]'>
           <BlogEditor content={blog.content} />

        </div>
      
    </div>
  )
}

export default BlogElement