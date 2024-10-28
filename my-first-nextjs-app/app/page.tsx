'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import ExpandableImage from './components/ExpandableImage'
import Heading from './components/Heading'
import Sidebar from './components/Sidebar'

interface ImageData {
  src: string
  alt: string
  yearTag: string
  monthTag: string
  locationTags: string[]
  iptcTags: string[]
  date?: Date
}

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([])
  const [selectedYearTags, setSelectedYearTags] = useState<string[]>([])
  const [selectedMonthTags, setSelectedMonthTags] = useState<string[]>([])
  const [selectedLocationTags, setSelectedLocationTags] = useState<string[]>([])
  const [selectedIptcTags, setSelectedIptcTags] = useState<string[]>([])
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/images')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching images:', error))
  }, [])

  const allYearTags = useMemo(() => 
    Array.from(new Set(images.map(img => img.yearTag))),
    [images]
  )

  const allMonthTags = useMemo(() => 
    Array.from(new Set(images.map(img => img.monthTag))),
    [images]
  )

  const allLocationTags = useMemo(() => 
    Array.from(new Set(images.flatMap(img => img.locationTags))),
    [images]
  )

  const allIptcTags = useMemo(() => 
    Array.from(new Set(images.flatMap(img => img.iptcTags))),
    [images]
  )

  const filteredImages = useMemo(() => {
    return images.filter(img => 
      (selectedYearTags.length === 0 || selectedYearTags.includes(img.yearTag)) &&
      (selectedMonthTags.length === 0 || selectedMonthTags.includes(img.monthTag)) &&
      (selectedLocationTags.length === 0 || selectedLocationTags.every(tag => img.locationTags.includes(tag))) &&
      (selectedIptcTags.length === 0 || selectedIptcTags.every(tag => img.iptcTags.includes(tag)))
    )
  }, [selectedYearTags, selectedMonthTags, selectedLocationTags, selectedIptcTags, images])

  const handleYearTagToggle = useCallback((tag: string) => {
    setSelectedYearTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }, [])

  const handleMonthTagToggle = useCallback((tag: string) => {
    setSelectedMonthTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }, [])

  const handleLocationTagToggle = useCallback((tag: string) => {
    setSelectedLocationTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }, [])

  const handleIptcTagToggle = useCallback((tag: string) => {
    setSelectedIptcTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }, [])

  const clearFilters = useCallback(() => {
    setSelectedYearTags([])
    setSelectedMonthTags([])
    setSelectedLocationTags([])
    setSelectedIptcTags([])
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
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <header className="sticky top-0 z-40 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading className="text-center py-4">My Image Gallery</Heading>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar
          yearTags={allYearTags}
          monthTags={allMonthTags}
          locationTags={allLocationTags}
          iptcTags={allIptcTags}
          selectedYearTags={selectedYearTags}
          selectedMonthTags={selectedMonthTags}
          selectedLocationTags={selectedLocationTags}
          selectedIptcTags={selectedIptcTags}
          onYearTagToggle={handleYearTagToggle}
          onMonthTagToggle={handleMonthTagToggle}
          onLocationTagToggle={handleLocationTagToggle}
          onIptcTagToggle={handleIptcTagToggle}
          onClearFilters={clearFilters}
          totalImages={images.length}
          filteredImagesCount={filteredImages.length}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
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
      </div>
    </div>
  )
}
