'use client'


import { Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
 
const Locations = dynamic(()=>import("./Locations"),{ssr:false})
 

  type Props = {}

const Map = (props: Props) => {
  const locationsRef = useRef<HTMLDivElement | null>(null)
  useEffect(()=>{
    if (window.location.hash === "#locations") {
      console.log("^^^",window.location.hash)
      console.log('^^^COMPONENT',locationsRef.current)
      if (locationsRef.current) {
        console.log('^^^COMPONENT_EXIST',locationsRef.current)
        locationsRef.current.scrollIntoView({block:'start' });
      }
    }
  },[locationsRef.current])
  return (
    <div ref={locationsRef}>
 <Locations />
    </div>

  )
}

export default Map