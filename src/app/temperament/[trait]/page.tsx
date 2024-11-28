import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllBreeds } from '@/lib/breeds'
import { capitalizeWords } from '@/lib/utils'

// Import temperament categories from the parent page
const temperamentCategories = {
    'friendly': ['Affectionate', 'Social', 'Gentle', 'Friendly', 'Good with children', 'Sociable', 'Outgoing'],
    'active': ['Energetic', 'Athletic', 'Playful', 'Active', 'Agile', 'High-energy', 'Lively'],
    'intelligent': ['Smart', 'Trainable', 'Focused', 'Intelligent', 'Quick learner', 'Clever', 'Bright'],
    'calm': ['Peaceful', 'Patient', 'Quiet', 'Calm', 'Gentle', 'Easygoing', 'Relaxed', 'Laid-back']
  } as const

type ValidTemperament = keyof typeof temperamentCategories

function isValidTemperament(trait: string): trait is ValidTemperament {
  return Object.keys(temperamentCategories).includes(trait)
}

export async function generateMetadata({ params }: { params: { trait: string } }) {
  const trait = await Promise.resolve(params.trait)
  
  if (!isValidTemperament(trait)) {
    return {
      title: 'Temperament Not Found',
      description: 'This temperament category does not exist'
    }
  }

  const capitalizedTrait = capitalizeWords(trait)
  return {
    title: `${capitalizedTrait} Dog Breeds - Temperament Guide`,
    description: `Discover all ${trait.toLowerCase()} dog breeds. Find the perfect ${trait.toLowerCase()} dog for your home.`
  }
}

export default async function TemperamentPage({ params }: { params: { trait: string } }) {
  const trait = await Promise.resolve(params.trait)

  if (!isValidTemperament(trait)) {
    notFound()
  }

  const breeds = await getAllBreeds()
  
  const traitBreeds = breeds.filter(breed => {
    if (!breed.temperament) return false
    const breedTemperament = breed.temperament.toLowerCase()
    
    return temperamentCategories[trait].some(traitTerm => 
      breedTemperament.includes(traitTerm.toLowerCase())
    )
  })

  if (!traitBreeds.length) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{capitalizeWords(trait)} Dogs</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Browse all dog breeds known for being {trait.toLowerCase()}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {traitBreeds.map((breed) => (
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
                      {breed.breedGroup}
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