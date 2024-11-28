import { getAllBreeds } from '@/lib/breeds'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SearchBreeds } from '@/components/search-breeds'
import Link from 'next/link'


export default async function HomePage() {
  const breeds = await getAllBreeds()
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Dog Breed</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Discover, compare, and learn about different dog breeds to find your perfect match
        </p>
        <SearchBreeds breeds={breeds} />
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" variant="outline">
            <Link href="/breeds">Browse Breeds</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-12">
      <Card>
          <CardHeader>
            <CardTitle>Compare Breeds</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Compare different dog breeds side by side to find your perfect match.
            </p>
            <Button asChild>
              <Link href="/compare">Compare Breeds</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browse by Size</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Find dogs that fit your living space, from small to giant breeds.
            </p>
            <Button asChild>
              <Link href="/sizes">Explore Sizes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browse by Temperament</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Discover dogs that match your lifestyle and personality.
            </p>
            <Button asChild>
              <Link href="/temperament">Explore Temperaments</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Browse By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['small', 'medium', 'large', 'giant'].map((size) => (
            <Link key={size} href={`/sizes/${size}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <p className="font-semibold capitalize">{size} Dogs</p>
                </CardContent>
              </Card>
            </Link>
          ))}
          {['friendly', 'active', 'intelligent', 'calm'].map((temperament) => (
            <Link key={temperament} href={`/temperament/${temperament}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <p className="font-semibold capitalize">{temperament} Dogs</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}