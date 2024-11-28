'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type EnhancedDogBreed } from '@/types'

interface BreedSelectorProps {
  breeds: EnhancedDogBreed[]
  position: 'first' | 'second'
  value: string | null
  onChange: (value: string | null) => void
}

export function BreedSelector({ breeds, position, value, onChange }: BreedSelectorProps) {
  return (
    <Select
      value={value || undefined}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder={`Select ${position === 'first' ? 'first' : 'second'} breed`} />
      </SelectTrigger>
      <SelectContent>
        {breeds.map((breed) => (
          <SelectItem key={breed.id} value={breed.name}>
            {breed.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}