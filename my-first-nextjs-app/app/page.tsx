'use client'

import { useState, useMemo, useCallback } from 'react'
import ExpandableImage from './components/ExpandableImage'
import Heading from './components/Heading'
import TagFilter from './components/TagFilter'

const images = [
  { src: "/photographs/BUS-03.jpg", alt: "Bus", tags: ["night", "urban"] },
  { src: "/photographs/ASAKUSA-BURGER-01.jpg", alt: "Burger", tags: ["restaurant", "urban", "night"] },
  { src: "/photographs/HOPPY-03.jpg", alt: "Hoppy", tags: ["people", "urban", "night"] },
  { src: "/photographs/JEA-A-03.jpg", alt: "Jea", tags: ["portrait", "urban", "people", "night"] },
  { src: "/photographs/OKAMOTO-02.jpg", alt: "Okamoto", tags: ["restaurant", "urban", "night"] },
  { src: "/photographs/TANABATA-01.jpg", alt: "Tanabata", tags: ["festival", "urban", "night"] },
  { src: "/photographs/ITO-B-01.jpg", alt: "Ito", tags: ["rural"] },
  { src: "/photographs/ITO-FISHER-03.jpg", alt: "Fishmun", tags: ["people", "rural"] },
  { src: "/photographs/ONII-JEA-02.jpg", alt: "OniiJea", tags: ["portrait", "people"] },
  { src: "/photographs/ITO-KAKI-02.jpg", alt: "Kaki", tags: ["restaurant"] },
  { src: '/photographs/BROKKU-01.jpg', alt: 'BROKKU-01', tags: ["abstract", "architecture"] },
  { src: '/photographs/BUTTER-01-SQ.jpg', alt: 'BUTTER-01-SQ', tags: ["people", "urban"] },
  { src: '/photographs/FROGGY-03.jpg', alt: 'FROGGY-03', tags: [] },
  { src: '/photographs/MIYATA-01.jpg', alt: 'MIYATA-01', tags: ["urban", "architecture"] },
  { src: '/photographs/OJII-02.jpg', alt: 'OJII-02', tags: ["portrait", "restaurant"] },
  { src: '/photographs/REF-LEATHER-04.jpg', alt: 'REF-LEATHER-04', tags: ["urban", "architecture"] },
  { src: '/photographs/SKY-TRAIN-01.jpg', alt: 'SKY-TRAIN-01', tags: ["urban", "night"] },
  { src: '/photographs/STATION-01.jpg', alt: 'STATION-01', tags: ["people", "urban", "night"] },
  { src: '/photographs/TAIYAKI-01-Big-Grain.jpg', alt: 'TAIYAKI-01-Big-Grain', tags: ["restaurant", "urban", "people"] },
  { src: '/photographs/TRUCK-01.jpg', alt: 'TRUCK-01', tags: ["urban", "vehicles", "architecture"] },
  { src: '/photographs/CAT-01.jpg', alt: 'CAT-01', tags: ["urban"] },
  { src: '/photographs/DUDE-01.jpg', alt: 'DUDE-01', tags: ["urban", "people", "portrait"] },
  {"src":"/photographs/STAIRS-A-01.jpg","alt":"STAIRS-A-01","tags":["architecture", "urban", "stairs", "night"]}, 
  {"src":"/photographs/STAIRS-B-01.jpg","alt":"STAIRS-B-01","tags":["architecture", "urban", "stairs", "night"]}, 
  {"src":"/photographs/STAIRS-C-01.jpg","alt":"STAIRS-C-01","tags":["architecture", "urban", "stairs", "night"]}, 
  {"src":"/photographs/STAIRS-D-01.jpg","alt":"STAIRS-D-01","tags":["architecture", "urban", "stairs", "night"]}, 
  {"src":"/photographs/STAIRS-E-01.jpg","alt":"STAIRS-E-01","tags":["architecture", "urban", "stairs", "night"]}
]

const allTags = Array.from(new Set(images.flatMap(img => img.tags)))

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null)

  const filteredImages = useMemo(() => {
    if (selectedTags.length === 0) return images
    return images.filter(img => 
      selectedTags.every(tag => img.tags.includes(tag))
    )
  }, [selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
  }

  const handleNavigate = useCallback((currentIndex: number, direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length
    setExpandedImageIndex(newIndex)
  }, [filteredImages])

  const handleExpand = (index: number) => {
    setExpandedImageIndex(index)
  }

  const handleClose = () => {
    setExpandedImageIndex(null)
  }

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
