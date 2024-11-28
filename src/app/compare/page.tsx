import { getAllBreeds } from '@/lib/breeds'
import { generateComparisonMetadata } from '@/lib/metadata'
import ComparePage from './compare-client'

interface PageProps {
  searchParams: {
    breed1?: string
    breed2?: string
  }
}

export async function generateMetadata({ searchParams }: PageProps) {
  const breed1 = searchParams?.breed1
  const breed2 = searchParams?.breed2

  if (breed1 && breed2) {
    return generateComparisonMetadata(
      breed1.replace(/-/g, ' '),
      breed2.replace(/-/g, ' ')
    )
  }

  return {
    title: 'Compare Dog Breeds',
    description: 'Compare different dog breeds side by side',
  }
}

export default async function Page({ searchParams }: PageProps) {
  const breeds = await getAllBreeds()
  return <ComparePage breeds={breeds} />
}