'use client'

import React, { useEffect, useRef } from 'react'

type Props = {}

const Scroller = (props: Props) => {

    useEffect(()=>{
        if(scrollerRef){
            scrollerRef.current?.scrollIntoView({behavior:'smooth',block:'center'})
        }
    })
    const scrollerRef = useRef<HTMLDivElement>(null)
  return (
   <div ref={scrollerRef} />
  )
}

export default Scroller