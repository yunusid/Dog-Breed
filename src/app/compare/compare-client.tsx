'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ComparisonChart } from '@/components/comparison-chart'
import { BreedSelector } from '@/components/breed-selector'
import { SizeComparison } from '@/components/size-comparison'
import { type EnhancedDogBreed } from '@/types'

interface ComparisonContentProps {
  breed1: EnhancedDogBreed
  breed2: EnhancedDogBreed
}

function ComparisonContent({ breed1, breed2 }: ComparisonContentProps) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Size Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <SizeComparison breeds={[breed1, breed2]} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Characteristics Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ComparisonChart breed1={breed1} breed2={breed2} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ComparePage({ breeds, initialBreeds }: ComparePageProps) {
  const router = useRouter()
  const [selectedBreed1, setSelectedBreed1] = useState<string | null>(initialBreeds?.breed1 || null)
  const [selectedBreed2, setSelectedBreed2] = useState<string | null>(initialBreeds?.breed2 || null)
  const [showComparison, setShowComparison] = useState(!!initialBreeds)

  const breed1 = breeds.find(breed => breed.name.toLowerCase() === selectedBreed1?.toLowerCase())
  const breed2 = breeds.find(breed => breed.name.toLowerCase() === selectedBreed2?.toLowerCase())

  const handleCompare = () => {
    if (selectedBreed1 && selectedBreed2) {
      const slug1 = breeds.find(b => b.name.toLowerCase() === selectedBreed1.toLowerCase())?.slug
      const slug2 = breeds.find(b => b.name.toLowerCase() === selectedBreed2.toLowerCase())?.slug
      if (slug1 && slug2) {
        router.push(`/compare/${slug1}/${slug2}`)
        setShowComparison(true)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Compare Dog Breeds</h1>
      
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <BreedSelector 
            breeds={breeds} 
            position="first" 
            value={selectedBreed1}
            onChange={setSelectedBreed1}
          />
          <BreedSelector 
            breeds={breeds} 
            position="second"
            value={selectedBreed2}
            onChange={setSelectedBreed2}
          />
        </div>
        <Button 
          onClick={handleCompare}
          disabled={!selectedBreed1 || !selectedBreed2}
          className="w-full"
        >
          Compare Breeds
        </Button>
      </div>

      {showComparison && breed1 && breed2 && (
        <ComparisonContent breed1={breed1} breed2={breed2} />
      )}
    </div>
  )
}