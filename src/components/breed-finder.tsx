'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import type { EnhancedDogBreed } from '@/types'

interface BreedFinderProps {
  breeds: EnhancedDogBreed[]
}

export function BreedFinder({ breeds }: BreedFinderProps) {
  const router = useRouter()
  const [preferences, setPreferences] = useState({
    familyFriendly: 3,
    apartmentLiving: 3,
    trainingEase: 3,
    exerciseNeeds: 3,
    grooming: 3,
    size: 3, // 1: Small, 3: Medium, 5: Large
  })

  const findMatchingBreeds = () => {
    return breeds
      .map(breed => {
        const scores = {
          familyFriendly: Math.abs(preferences.familyFriendly - breed.aiDescription.suitability.families),
          apartmentLiving: Math.abs(preferences.apartmentLiving - breed.aiDescription.suitability.apartments),
          trainingEase: Math.abs(preferences.trainingEase - breed.aiDescription.suitability.training),
          exerciseNeeds: Math.abs(preferences.exerciseNeeds - breed.aiDescription.suitability.exercise),
          grooming: Math.abs(preferences.grooming - (breed.aiDescription.suitability.grooming || 3)),
          size: Math.abs(preferences.size - getSizeScore(breed.weight.metric)),
        }

        const totalDifference = Object.values(scores).reduce((a, b) => a + b, 0)
        const matchScore = 1 - (totalDifference / (Object.keys(scores).length * 4))

        return {
          breed,
          matchScore,
        }
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5)
  }

  const getSizeScore = (weightMetric: string): number => {
    const weight = parseFloat(weightMetric.split('-')[0])
    if (weight < 10) return 1 // Small
    if (weight < 25) return 3 // Medium
    return 5 // Large
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Your Perfect Dog Breed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Family Friendly</label>
              <Slider
                value={[preferences.familyFriendly]}
                onValueChange={([value]) => setPreferences(prev => ({ ...prev, familyFriendly: value }))}
                max={5}
                step={1}
                className="mt-2"
              />
            </div>
            {/* Repeat for other preferences */}
          </div>

          <Button 
            className="w-full"
            onClick={() => {
              const matches = findMatchingBreeds()
              if (matches.length > 0) {
                router.push(`/breeds/${matches[0].breed.aiDescription.slug}`)
              }
            }}
          >
            Find Matches
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {findMatchingBreeds().map(({ breed, matchScore }) => (
          <Card key={breed.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/breeds/${breed.aiDescription.slug}`)}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{breed.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {Math.round(matchScore * 100)}% match
                  </p>
                </div>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${Math.round(matchScore * 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}