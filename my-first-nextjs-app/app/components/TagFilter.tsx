import React from 'react';
import { Button } from "@/app/components/ui/button"
import { X } from "lucide-react"

interface TagFilterProps {
  yearTags: string[];
  monthTags: string[];
  locationTags: string[];
  iptcTags: string[];
  selectedYearTags: string[];
  selectedMonthTags: string[];
  selectedLocationTags: string[];
  selectedIptcTags: string[];
  onYearTagToggle: (tag: string) => void;
  onMonthTagToggle: (tag: string) => void;
  onLocationTagToggle: (tag: string) => void;
  onIptcTagToggle: (tag: string) => void;
  onClearFilters: () => void;
  totalImages: number;
  filteredImagesCount: number;
}

export default function TagFilter({
  yearTags,
  monthTags,
  locationTags,
  iptcTags,
  selectedYearTags,
  selectedMonthTags,
  selectedLocationTags,
  selectedIptcTags,
  onYearTagToggle,
  onMonthTagToggle,
  onLocationTagToggle,
  onIptcTagToggle,
  onClearFilters,
  totalImages,
  filteredImagesCount
}: TagFilterProps) {
  return (
    <div className="space-y-4">
      <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Date Filters</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-2">Year</h4>
            <div className="flex flex-wrap gap-2">
              {yearTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedYearTags.includes(tag) ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => onYearTagToggle(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-2">Month</h4>
            <div className="flex flex-wrap gap-2">
              {monthTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedMonthTags.includes(tag) ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => onMonthTagToggle(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Location Filters</h3>
        <div className="flex flex-wrap gap-2">
          {locationTags.map(tag => (
            <Button
              key={tag}
              variant={selectedLocationTags.includes(tag) ? "secondary" : "outline"}
              size="sm"
              onClick={() => onLocationTagToggle(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">IPTC Filters</h3>
        <div className="flex flex-wrap gap-2">
          {iptcTags.map(tag => (
            <Button
              key={tag}
              variant={selectedIptcTags.includes(tag) ? "secondary" : "outline"}
              size="sm"
              onClick={() => onIptcTagToggle(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="flex items-center"
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
        <span className="text-sm text-muted-foreground">
          Showing {filteredImagesCount} of {totalImages} images
        </span>
      </div>
    </div>
  );
}
