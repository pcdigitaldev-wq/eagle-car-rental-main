import React from 'react'
import SectionHeader from './SectionHeader'
import prisma from '@/lib/prisma'
import { Blog } from '@prisma/client'
import ImageComponent from '@/components/ImageComponent'
import { Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import BlogCard from './BlogCard'

type Props = {}

const Blogs = async(props: Props) => {

    const blogs = await prisma.blog.findMany({
        take:3,
        orderBy:{
            createdAt:'desc'
        }
    })
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-[13px] px-1 sm:px-0'>
      {blogs.map(blog=><BlogCard key={blog.id}  blog={blog}/>)}

    </div>
  )
}

export default Blogs


