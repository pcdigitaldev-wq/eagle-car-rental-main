import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

type Props = {className?:string} & PropsWithChildren

const Container = ({className,children}: Props) => {
  return (
    <div className={cn('max-w-[1224px]  w-[95vw] mx-auto',className)}>
        {children}
    </div>
  )
}

export default Container