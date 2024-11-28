import { Suspense } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BreedRadarChart } from '@/components/radar-chart'
import { getBreedBySlug } from '@/lib/breeds'

interface BreedPageProps {
  params: {
    breed: string
  }
}
async function BreedContent({ breedSlug }: { breedSlug: string }) {
  const breed = await getBreedBySlug(breedSlug)

  if (!breed) {
    notFound()
  }

  const radarData = [
    { subject: 'Good with Children', value: breed.aiDescription?.suitability?.families || 3, fullMark: 5 },
    { subject: 'Trainability', value: breed.aiDescription?.suitability?.training || 3, fullMark: 5 },
    { subject: 'Good with Other Dogs', value: breed.aiDescription?.suitability?.sociability || 3, fullMark: 5 },
    { subject: 'Energy Level', value: breed.aiDescription?.suitability?.exercise || 3, fullMark: 5 },
    { subject: 'Grooming Needs', value: breed.aiDescription?.suitability?.grooming || 3, fullMark: 5 },
  ]

  const temperamentTraits = breed.temperament ? breed.temperament.split(',').map(t => t.trim()) : []

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {breed.image?.url && (
          <Card>
            <div className="relative w-full h-[400px]">
              <Image
                src={breed.image.url}
                alt={breed.name}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </Card>
        )}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{breed.name}</h1>
          <p className="text-lg text-muted-foreground">
            {breed.description || `A wonderful ${breed.breedGroup?.toLowerCase() || 'dog'} breed.`}
          </p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium">Life Expectancy</h3>
            <p className="text-2xl font-bold">{breed.life_span || 'N/A'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium">Height</h3>
            <p className="text-2xl font-bold">{breed.height?.metric ? `${breed.height.metric} cm` : 'N/A'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium">Weight</h3>
            <p className="text-2xl font-bold">{breed.weight?.metric ? `${breed.weight.metric} kg` : 'N/A'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium">Breed Group</h3>
            <p className="text-2xl font-bold">{breed.breed_group || 'N/A'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Characteristics Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Characteristics</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <BreedRadarChart data={radarData} />
        </CardContent>
      </Card>

      {/* History Section */}
      {breed.history && (
        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{breed.history}</p>
          </CardContent>
        </Card>
      )}

      {/* Temperament & Ideal Owner */}
      <div className="grid md:grid-cols-2 gap-6">
        {temperamentTraits.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Temperament</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {temperamentTraits.map((trait, index) => (
                  <li key={index} className="text-muted-foreground">
                    {trait}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {breed.aiDescription?.characteristics?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Ideal Owner</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {breed.aiDescription.characteristics.map((char, index) => (
                  <li key={index} className="text-muted-foreground">
                    {char}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Health Considerations */}
      {breed.healthIssues?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Health Considerations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {breed.healthIssues.map((issue, index) => (
                <li key={index} className="text-muted-foreground">
                  {issue}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Training & Care */}
      <div className="grid md:grid-cols-2 gap-6">
        {breed.trainingTips?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Training Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {breed.trainingTips.map((tip, index) => (
                  <li key={index} className="text-muted-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {breed.groomingNeeds?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Grooming Needs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {breed.groomingNeeds.map((need, index) => (
                  <li key={index} className="text-muted-foreground">
                    {need}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Fun Facts */}
      {breed.funFacts?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Fun Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {breed.funFacts.map((fact, index) => (
                <li key={index} className="text-muted-foreground">
                  {fact}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
export default function BreedPage({ params }: BreedPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense 
        fallback={
          <div className="space-y-6">
            <div className="h-[400px] bg-muted animate-pulse rounded-lg" />
            <div className="grid md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-8 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        }
      >
        <BreedContent breedSlug={params.breed} />
      </Suspense>
    </div>
  )
}