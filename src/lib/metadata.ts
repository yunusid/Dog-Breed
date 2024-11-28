import { Metadata } from 'next'
import { EnhancedDogBreed } from '@/types'

const SITE_NAME = 'Dog Breed Helper'
const BASE_URL = 'https://www.dogbreedhelper.com'

export function generateBreedMetadata(breed: EnhancedDogBreed): Metadata {
  const title = `${breed.name} Dog Breed - Characteristics, Temperament & Care Guide`
  const description = `Learn everything about the ${breed.name}. Discover their temperament, characteristics, training needs, and if they're the right dog for your lifestyle. Complete breed guide with photos and expert advice.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${BASE_URL}/breeds/${breed.aiDescription.slug}`,
      images: breed.image ? [
        {
          url: breed.image.url,
          width: 1200,
          height: 630,
          alt: breed.name,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: breed.image ? [breed.image.url] : [],
    },
    alternates: {
      canonical: `${BASE_URL}/breeds/${breed.aiDescription.slug}`,
    },
    keywords: [
      `${breed.name} dog`,
      `${breed.name} breed`,
      `${breed.name} characteristics`,
      `${breed.name} temperament`,
      ...breed.aiDescription.tags,
    ].join(', '),
  }
}

export function generateComparisonMetadata(breed1: string, breed2: string): Metadata {
  const title = `${breed1} vs ${breed2} - Dog Breed Comparison`
  const description = `Compare ${breed1} and ${breed2} dog breeds side by side. See differences in temperament, size, care needs, and suitability for your lifestyle.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${BASE_URL}/compare?breed1=${breed1}&breed2=${breed2}`,
    },
    alternates: {
      canonical: `${BASE_URL}/compare?breed1=${breed1}&breed2=${breed2}`,
    },
  }
}