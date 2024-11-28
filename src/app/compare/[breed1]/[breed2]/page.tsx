import { getAllBreeds } from '@/lib/breeds'
import { generateComparisonMetadata } from '@/lib/metadata'
import ComparePage from '../../compare-client'

interface PageProps {
  params: {
    breed1: string
    breed2: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { breed1, breed2 } = params
  
  return generateComparisonMetadata(
    breed1.replace(/-/g, ' '),
    breed2.replace(/-/g, ' ')
  )
}

export default async function Page({ params }: PageProps) {
  const breeds = await getAllBreeds()
  return <ComparePage 
    breeds={breeds} 
    initialBreeds={{
      breed1: params.breed1.replace(/-/g, ' '),
      breed2: params.breed2.replace(/-/g, ' ')
    }} 
  />
}