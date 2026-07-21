import ImageComponent from '@/components/ImageComponent'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = { className?:string}

const Logo = ({className}: Props) => {
  return (
    <Link href={'/'} className=''>
        <ImageComponent className={cn('w-[141px] h-[40px] ',className)} alt='logo' aspect='video' src='/Logo.png' imgClassName='object-contain' />
    </Link>
  )
}

export default Logo