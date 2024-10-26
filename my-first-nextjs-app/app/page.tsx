'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import ExpandableImage from './components/ExpandableImage'
import Heading from './components/Heading'
import TagFilter from './components/TagFilter'

interface ImageData {
  src: string
  alt: string
  tags: string[]
}

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/images')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching images:', error))
  }, [])

  const allTags = useMemo(() => 
    Array.from(new Set(images.flatMap(img => img.tags))),
    [images]
  )

  const filteredImages = useMemo(() => {
    if (selectedTags.length === 0) return images
    return images.filter(img => 
      selectedTags.every(tag => img.tags.includes(tag))
    )
  }, [selectedTags, images])

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }, [])

  const clearFilters = useCallback(() => {
    setSelectedTags([])
  }, [])

  const handleNavigate = useCallback((currentIndex: number, direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length
    setExpandedImageIndex(newIndex)
  }, [filteredImages])

  const handleExpand = useCallback((index: number) => {
    setExpandedImageIndex(index)
  }, [])

  const handleClose = useCallback(() => {
    setExpandedImageIndex(null)
  }, [])

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Heading className="text-center py-8">My Image Gallery</Heading>
        <div className="mb-8">
          <TagFilter
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearFilters={clearFilters}
            totalImages={images.length}
            filteredImagesCount={filteredImages.length}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filteredImages.map((img, index) => (
            <ExpandableImage 
              key={index}
              src={img.src} 
              alt={img.alt}
              index={index}
              totalImages={filteredImages.length}
              onNavigate={(direction) => handleNavigate(index, direction)}
              isExpanded={expandedImageIndex === index}
              onExpand={() => handleExpand(index)}
              onClose={handleClose}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
