import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    title:string,
    description?:string,
    className?:string,
    titleClassName?:string
}

const NoResult = ({title,className,description,titleClassName}: Props) => {
  return (
    <div className={cn("flex items-center flex-col justify-center gap-1 min-h-[400px] ",className)}>
        <p className={cn('text-muted-foreground font-bold text-5xl capitalize',titleClassName)}>{title}</p>
        {description && <p className='text-md font-normal text-muted-foreground capitalize'>{description}</p>}
    </div>
  )
}

export default NoResult