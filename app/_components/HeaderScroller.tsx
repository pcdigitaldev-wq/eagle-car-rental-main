'use client'

import React, { PropsWithChildren, useEffect, useState } from 'react'

type Props = {} & PropsWithChildren

const HeaderScroller = ({children}: Props) => {
    const [hide,setHide] = useState(false)

    useEffect(()=>{
        let previousScroll = window.scrollY

        const handleScroll  =()=>{
            const currentScroll = window.scrollY
            const condition = (currentScroll > previousScroll)
                setHide(condition)
                previousScroll = currentScroll

        }
        window.addEventListener('scroll',handleScroll)

        return ()=>window.removeEventListener('scroll',handleScroll)
    },[])
  return (
    <div    className={`fixed top-0 left-0 w-full transition-transform duration-300 z-50 ${
        hide ? '-translate-y-full' : 'translate-y-0'
      }`}>
        {children}
    </div>
  )
}

export default HeaderScroller