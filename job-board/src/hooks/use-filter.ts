import { ChangeEvent, useState } from 'react';

type Filters = {
  category: string;
  type: Array<string>;
  level: Array<string>;
  location: string;
};

export default function useFilter() {
  const defaultValues = {
    category: '',
    type: [],
    level: [],
    location: '',
  };

  const [filters, setFilters] = useState<Filters>(defaultValues);

  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, location: value }));
  };

  const handleLevelChange = (updatedLevel: string[]) => {
    setFilters((prev) => ({ ...prev, level: updatedLevel }));
  };

  const handleTypeChange = (updatedType: string[]) => {
    setFilters((prev) => ({ ...prev, type: updatedType }));
  };

  const toggleTypes = (value: string) => {
    let updatedTypes;
    if (selectedTypes.includes(value)) {
      updatedTypes = selectedTypes.filter((item) => item !== value);
    } else {
      updatedTypes = [...selectedTypes, value];
    }

    setSelectedTypes(updatedTypes);
  };

  const toggleLevels = (value: string) => {
    let updatedLevels;
    if (selectedLevels.includes(value)) {
      updatedLevels = selectedLevels.filter((item) => item !== value);
    } else {
      updatedLevels = [...selectedLevels, value];
    }

    setSelectedLevels(updatedLevels);
  };

  const applyFilters = () => {
    handleLevelChange(selectedLevels);
    handleTypeChange(selectedTypes);
  };

  const resetFilters = () => {
    setFilters(defaultValues);
    setSelectedLevels([]);
    setSelectedTypes([]);
  };

  return {
    filters,
    handleCategoryChange,
    selectedLevels,
    selectedTypes,
    toggleLevels,
    toggleTypes,
    applyFilters,
    handleLocationChange,
    resetFilters,
  };
}
