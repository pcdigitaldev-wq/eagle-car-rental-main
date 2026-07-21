import prisma from '@/lib/prisma'
import React from 'react'

type Props = {}

const CategoriesCount = async(props: Props) => {
    const categoriesRes = prisma.blogCategory.findMany({
        select:{
            id:true,
            title:true,
            _count:{
                select:{
                    blogs:true
                }
            }
        },
        
    })
    const blogsCountRes = prisma.blog.count()

    const [categories, blogsCount] = await Promise.all([categoriesRes, blogsCountRes])
  return (
    <div>
        <h3 className='text-[#181A2A] text-[21px] font-[600]'>
            Categories
        </h3>
        <div className='mt-[43px] flex flex-col gap-[12px]'>
            <Element title='All' number={blogsCount} />
            {categories.map(category=><Element key={category.id} title={category.title} number={category._count.blogs} />)}
        </div>


    </div>
  )
}

export default CategoriesCount




const Element = ({number,title}:{title:string,number:number})=>{
return (<div className='flex items-center justify-between last:border-b-0 border-b-2 pb-[11px] border-dashed'>
    <span className='text-[15px] font-[500] text-[#1C1C1C] capitalize'>{title}</span>
    <span className='text-[15px] font-[500] text-[#1C1C1C]'>{number}</span>
</div>)

}