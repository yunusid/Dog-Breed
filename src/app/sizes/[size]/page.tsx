import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllBreeds } from '@/lib/breeds'
import { capitalizeWords } from '@/lib/utils'

// Define valid size categories
const validSizes = ['small', 'medium', 'large', 'giant'] as const
type ValidSize = typeof validSizes[number]

const sizeRanges = {
  'small': { min: 0, max: 10 },
  'medium': { min: 10, max: 25 },
  'large': { min: 25, max: 40 },
  'giant': { min: 40, max: Infinity }
} as const

// Validate size parameter
function isValidSize(size: string): size is ValidSize {
  return validSizes.includes(size as ValidSize)
}

export async function generateMetadata({ params }: { params: { size: string } }) {
    const size = await Promise.resolve(params.size)
    
    if (!isValidSize(size)) {
      return {
        title: 'Size Not Found',
        description: 'This size category does not exist'
      }
    }
  
    const capitalizedSize = capitalizeWords(size)
    return {
      title: `${capitalizedSize} Dog Breeds - Size Guide`,
      description: `Discover all ${size.toLowerCase()} dog breeds. Find the perfect ${size.toLowerCase()} sized dog for your home.`
    }
  }
  
  export default async function SizePage({ params }: { params: { size: string } }) {
    const size = await Promise.resolve(params.size)
  
    if (!isValidSize(size)) {
      notFound()
    }
  
    const breeds = await getAllBreeds()
    
    const sizeBreeds = breeds.filter(breed => {
      const weight = breed.weight?.metric 
        ? parseInt(breed.weight.metric.split('-')[0])
        : 0
      
      const range = sizeRanges[size as ValidSize]
      return weight >= range.min && weight < range.max
    })
  
    if (!sizeBreeds.length) {
      notFound()
    }
  
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">{capitalizeWords(params.size)} Dogs</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Browse all dog breeds in the {params.size} size category
          </p>
    
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sizeBreeds.map((breed) => (
              <Link key={breed.id} href={`/breeds/${breed.slug}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                      {breed.image?.url && (
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={breed.image.url}
                            alt={breed.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{breed.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Weight: {breed.weight?.metric} kg
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {breed.temperament}
                      </p>
                      {breed.aiDescription?.tags && (
                        <div className="flex flex-wrap gap-2">
                          {breed.aiDescription.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )
}