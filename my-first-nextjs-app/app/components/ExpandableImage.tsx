'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ExpandableImageProps {
  src: string
  alt: string
}

export default function ExpandableImage({ src, alt }: ExpandableImageProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <div className="relative w-[400px] h-[400px] cursor-pointer" onClick={() => setIsExpanded(true)}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover rounded-lg transition-transform hover:scale-105"
        />
      </div>
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsExpanded(false)}
        >
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(false)
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}