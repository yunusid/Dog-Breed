'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { EnhancedDogBreed } from '@/types'

interface SearchOptimizationProps {
  breeds: EnhancedDogBreed[]
}

export function SearchOptimization({ breeds }: SearchOptimizationProps) {
  const router = useRouter()
  const fuseRef = useRef<Fuse<EnhancedDogBreed>>()

  useEffect(() => {
    // Initialize Fuse.js for fuzzy search
    fuseRef.current = new Fuse(breeds, {
      keys: [
        'name',
        'aiDescription.tags',
        'aiDescription.characteristics',
        'temperament',
      ],
      threshold: 0.3,
    })

    // Listen for custom search event
    const handleSearch = (event: CustomEvent) => {
      const { query } = event.detail
      if (!query || !fuseRef.current) return

      const results = fuseRef.current.search(query)
      if (results.length > 0) {
        router.push(`/breeds/${results[0].item.aiDescription.slug}`)
      }
    }

    window.addEventListener('dog-breed-search' as any, handleSearch)
    return () => {
      window.removeEventListener('dog-breed-search' as any, handleSearch)
    }
  }, [breeds, router])

  return null
}