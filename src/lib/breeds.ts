import { cache } from 'react'
import dogData from '../data/breeds/dogData.json'
import type { EnhancedDogBreed, BasicDogBreed } from '@/types'

// Helper function to create a unique slug
function createUniqueSlug(name: string, existingSlugs: Set<string>): string {
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  
  let slug = baseSlug
  let counter = 1
  
  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }
  
  existingSlugs.add(slug)
  return slug
}

// Helper function to map dog data to our app's format
function mapDogData(dog: any): BasicDogBreed {
  // Extraire la taille et le poids des caractéristiques
  const heightStr = dog.general.height.toString()
  const weightStr = dog.general.weight.toString()

  return {
    id: dog.id,
    slug: dog.id,
    name: dog.general.name,
    temperament: dog.general.personalityTraits.join(', '),
    image: {
      url: dog.images.small.studio
    },
    breedGroup: dog.general.group,
    height: {
      metric: heightStr,
      imperial: heightStr // Convertir si nécessaire
    },
    weight: {
      metric: weightStr,
      imperial: weightStr // Convertir si nécessaire
    },
    aiDescription: {
      tags: dog.general.personalityTraits,
      suitability: {
        families: dog.behavior.familyAffection,
        apartments: dog.behavior.adaptability,
        training: 6 - dog.care.trainingDifficulty,
        exercise: dog.care.exerciseNeeds,
        grooming: dog.care.groomingFrequency,
        adaptability: dog.behavior.adaptability
      },
      characteristics: [
        `Size: ${heightStr} inches tall`,
        `Weight: ${weightStr} pounds`,
        `Lifespan: ${dog.general.lifespan} years`
      ]
    }
  }
}

// Helper function to map detailed dog data
function mapDetailedDogData(dog: any): EnhancedDogBreed {
  const basic = mapDogData(dog)
  return {
    ...basic,
    weight: {
      metric: dog.general.weight.toString()
    },
    height: {
      metric: dog.general.height.toString()
    },
    bred_for: dog.general.group,
    breed_group: dog.general.group,
    life_span: `${dog.general.lifespan} years`,
    origin: 'Information not available',
    description: dog.general.shortDescription,
    history: dog.general.longDescription,
    healthIssues: ['Regular vet check-ups recommended'],
    trainingTips: [
      'Start training early',
      'Be consistent',
      'Use positive reinforcement',
      'Socialize well'
    ],
    groomingNeeds: [
      `Shedding: ${dog.care.sheddingAmount}/5`,
      `Grooming frequency: ${dog.care.groomingFrequency}/5`,
      `Coat type: ${dog.physical.coatStyle}, ${dog.physical.coatTexture}`
    ],
    funFacts: [
      `Part of the ${dog.general.group} group`,
      `Typical lifespan of ${dog.general.lifespan} years`,
      `${dog.behavior.barkingFrequency}/5 barking frequency`
    ]
  }
}

export const getAllBreeds = cache(async (): Promise<BasicDogBreed[]> => {
  return dogData.map(mapDogData)
})

export const getBreedBySlug = cache(async (slug: string): Promise<EnhancedDogBreed | null> => {
  const breed = dogData.find(dog => dog.id === slug)
  return breed ? mapDetailedDogData(breed) : null
})

export const getBreedData = getBreedBySlug