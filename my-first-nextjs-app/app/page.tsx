'use client'

import { useState, useMemo } from 'react'
import ExpandableImage from './components/ExpandableImage'
import Heading from './components/Heading'
import TagFilter from './components/TagFilter'

const images = [
  { src: "/photographs/BUS-03.jpg", alt: "Bus", tags: ["transport", "urban"] },
  { src: "/photographs/ASAKUSA-BURGER-01.jpg", alt: "Burger", tags: ["food", "urban"] },
  { src: "/photographs/HOPPY-03.jpg", alt: "Hoppy", tags: ["drink", "urban"] },
  { src: "/photographs/JEA-A-03.jpg", alt: "Jea", tags: ["portrait", "urban"] },
  { src: "/photographs/OKAMOTO-02.jpg", alt: "Okamoto", tags: ["portrait", "rural"] },
  { src: "/photographs/TANABATA-01.jpg", alt: "Tanabata", tags: ["festival", "urban"] },
  { src: "/photographs/ITO-B-01.jpg", alt: "Ito", tags: ["portrait", "rural"] },
  { src: "/photographs/ITO-FISHER-03.jpg", alt: "Fishmun", tags: ["portrait", "rural", "occupation"] },
  { src: "/photographs/ONII-JEA-02.jpg", alt: "OniiJea", tags: ["portrait", "urban"] },
  { src: "/photographs/ITO-KAKI-02.jpg", alt: "Kaki", tags: ["food", "rural"] },
]

const allTags = Array.from(new Set(images.flatMap(img => img.tags)))

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

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
            />
          ))}
        </div>
      </div>
    </main>
  )
}
