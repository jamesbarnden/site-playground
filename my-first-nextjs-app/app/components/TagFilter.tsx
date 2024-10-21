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
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
                className={`px-3 py-1 rounded-full text-sm border ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-transparent text-gray-800 dark:text-gray-200 border-outline-light dark:border-outline-dark'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
            >
              <X size={16} className="mr-1" />
              Clear filters
            </button>
          )}
        </>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Showing {filteredImagesCount} of {totalImages} images
      </p>
    </div>
  )
}
