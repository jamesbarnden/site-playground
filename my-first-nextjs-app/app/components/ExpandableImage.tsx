'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

interface ExpandableImageProps {
  src: string
  alt: string
  index: number
  totalImages: number
  onNavigate: (direction: 'prev' | 'next') => void
  isExpanded: boolean
  onExpand: () => void
  onClose: () => void
}

export default function ExpandableImage({ 
  src, 
  alt, 
  index, 
  totalImages, 
  onNavigate, 
  isExpanded, 
  onExpand, 
  onClose 
}: ExpandableImageProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isExpanded) {
      if (e.key === 'ArrowLeft') {
        onNavigate('prev')
      } else if (e.key === 'ArrowRight') {
        onNavigate('next')
      } else if (e.key === 'Escape') {
        onClose()
      }
    }
  }, [isExpanded, onNavigate, onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <>
      <div className="relative w-[400px] h-[400px] cursor-pointer" onClick={onExpand}>
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
          onClick={onClose}
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
                onClose()
              }}
            >
              ×
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {index + 1} / {totalImages}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
