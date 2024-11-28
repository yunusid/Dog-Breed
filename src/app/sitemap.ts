import { getAllBreeds } from '@/lib/breeds'

const validSizes = ['small', 'medium', 'large', 'giant']
const temperamentCategories = ['friendly', 'active', 'intelligent', 'calm']

export default async function sitemap() {
  const breeds = await getAllBreeds()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'

  // Static routes
  const routes = [
    '',
    '/breeds',
    '/compare',
    '/sizes',
    '/temperament',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  // Dynamic breed routes
  const breedRoutes = breeds.map((breed) => ({
    url: `${baseUrl}/breeds/${breed.slug}`,
    lastModified: new Date().toISOString(),
  }))

  // Size category routes
  const sizeRoutes = validSizes.map((size) => ({
    url: `${baseUrl}/sizes/${size}`,
    lastModified: new Date().toISOString(),
  }))

  // Temperament category routes
  const temperamentRoutes = temperamentCategories.map((trait) => ({
    url: `${baseUrl}/temperament/${trait}`,
    lastModified: new Date().toISOString(),
  }))

  // Dynamic comparison routes
  const comparisonRoutes = breeds.flatMap((breed1) =>
    breeds.map((breed2) => ({
      url: `${baseUrl}/compare/${breed1.slug}/${breed2.slug}`,
      lastModified: new Date().toISOString(),
    }))
  )

  return [
    ...routes,
    ...breedRoutes,
    ...sizeRoutes,
    ...temperamentRoutes,
    ...comparisonRoutes,
  ]
}