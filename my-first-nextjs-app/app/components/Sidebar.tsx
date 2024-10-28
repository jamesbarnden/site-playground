import React, { useState } from 'react';
import { Button } from "@/app/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"
import TagFilter from './TagFilter';

interface SidebarProps {
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

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`relative h-full transition-all duration-300 ease-in-out z-30 ${isOpen ? 'w-64' : 'w-6'}`}>
      <div className={`h-full bg-background-light dark:bg-background-dark border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {isOpen && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <TagFilter {...props} />
          </div>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        className={`absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full w-8 h-8 p-0 flex items-center justify-center bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 z-40`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default Sidebar;
