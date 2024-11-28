'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { type EnhancedDogBreed } from '@/types'

interface SearchBreedsProps {
  breeds: EnhancedDogBreed[]
}

export function SearchBreeds({ breeds }: SearchBreedsProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(false)

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (breed: EnhancedDogBreed) => {
    router.push(`/breeds/${breed.slug}`)
    setSearchQuery('')
    setOpen(false)
  }

  return (
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <Command className="rounded-lg border shadow-md">
        <CommandInput 
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value)
            setOpen(!!value)
          }}
          placeholder="Search for a breed..." 
        />
        {open && (
          <CommandList>
            <CommandEmpty>No breeds found.</CommandEmpty>
            <CommandGroup>
              {filteredBreeds.map((breed) => (
                <CommandItem
                  key={breed.id}
                  value={breed.name}
                  onSelect={() => handleSelect(breed)}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  {breed.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  )
}