'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  onClearFilters: () => void
  totalImages: number
  filteredImagesCount: number
}

export default function TagFilter({
  tags,
  selectedTags,
  onTagToggle,
  onClearFilters,
  totalImages,
  filteredImagesCount
}: TagFilterProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="mb-8 bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-heading-light dark:text-heading-dark">Filters</h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-text-light hover:text-secondary dark:text-text-dark dark:hover:text-secondary"
        >
          {isCollapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </button>
      </div>
      {!isCollapsed && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-text-dark'
                    : 'bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-primary hover:text-secondary dark:text-primary dark:hover:text-secondary flex items-center"
            >
              <X size={16} className="mr-1" /> Clear all filters
            </button>
          )}
        </>
      )}
      <p className="text-sm text-text-light dark:text-text-dark mt-2">
        Showing {filteredImagesCount} of {totalImages} images
      </p>
    </div>
  )
}
