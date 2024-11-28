import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllBreeds } from '@/lib/breeds'

export const metadata = {
  title: 'Dog Breeds Directory',
  description: 'Browse and learn about different dog breeds',
}

async function BreedsContent() {
    const breeds = await getAllBreeds()
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breeds.map((breed) => (
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
    )
  }

export default function BreedsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dog Breeds Directory</h1>
      <Suspense
        fallback={
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-[300px] animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <BreedsContent />
      </Suspense>
    </div>
  )
}