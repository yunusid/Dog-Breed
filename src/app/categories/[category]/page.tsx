import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getBreedsByCategory } from '@/lib/breeds'
import { capitalizeWords } from '@/lib/utils'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = capitalizeWords(params.category.replace(/-/g, ' '))
  
  return {
    title: `${category} Dog Breeds - Complete List & Information Guide`,
    description: `Discover all ${category.toLowerCase()} dog breeds. Compare characteristics, temperament, and find the perfect ${category.toLowerCase()} dog for your lifestyle.`
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const breeds = await getBreedsByCategory(params.category)

  if (!breeds.length) {
    notFound()
  }

  const category = capitalizeWords(params.category.replace(/-/g, ' '))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{category} Dog Breeds</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Discover all dog breeds that are known for being {category.toLowerCase()}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breeds.map((breed) => (
          <Link key={breed.id} href={`/breeds/${breed.aiDescription.slug}`}>
            <Card className="hover:shadow-lg transition-shadow">
              {breed.image && (
                <div className="relative aspect-video">
                  <Image
                    src={breed.image.url}
                    alt={breed.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{breed.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {breed.aiDescription.detailedDescription}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}