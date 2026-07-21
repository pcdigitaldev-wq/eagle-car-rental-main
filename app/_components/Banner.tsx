import ImageComponent from '@/components/ImageComponent'
import { cn } from '@/lib/utils'
import React from 'react'
import { Figtree } from "next/font/google";
import Container from './Container';
import FramerComponent from './FramerComponent';

type Props = {
    className?:string,
    labelStyles?:string,
    label:string
}

const figtree = Figtree({
    weight: ["400", "500", "700", "900"],
    subsets: ["latin"],
  });

const Banner = ({className,label,labelStyles}: Props) => {
  return (
    <div className={cn('h-[350px] md:h-[600px] w-full relative flex items-center  justify-center')}>
        <ImageComponent className='absolute w-full h-full' imgClassName='object-cover object-bottom' alt='banner' src='/banner.jpg' aspect='video' />
        <div className='absolute w-full h-full top-0 left-0 bg-site-primary/60' />
        <Container className={cn("flex items-center  justify-center",className)}>
          <FramerComponent
          
          >
          <p className={cn('relative text-3xl font-semibold md:font-[700] md:text-[52px] leading-[30px] text-white md:leading-[60px]',labelStyles,figtree.className)} dangerouslySetInnerHTML={{ __html: label }}></p>
          </FramerComponent>
      
        </Container>
      
    </div>
  )
}

export default Banner