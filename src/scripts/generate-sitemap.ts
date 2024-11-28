import fs from 'fs/promises'
import path from 'path'
import { EnhancedDogBreed } from '@/types'

const SITE_URL = 'http://localhost:3000'
const URLS_PER_SITEMAP = 5000

async function generateSitemaps() {
  try {
    // Get all breeds
    const breedsDir = path.join(process.cwd(), 'data', 'breeds')
    const breedFiles = await fs.readdir(breedsDir)
    
    // Get all categories
    const categoriesDir = path.join(process.cwd(), 'data', 'categories')
    const categoryFiles = await fs.readdir(categoriesDir)

    const urls: string[] = []

    // Add static pages
    urls.push(
      '/',
      '/breeds',
      '/categories',
      '/compare',
      '/about',
      '/contact'
    )

    // Add breed pages
    for (const file of breedFiles) {
      const breedData: EnhancedDogBreed = JSON.parse(
        await fs.readFile(path.join(breedsDir, file), 'utf-8')
      )
      urls.push(`/breeds/${breedData.aiDescription.slug}`)
    }

    // Add category pages
    for (const file of categoryFiles) {
      const slug = file.replace('.json', '')
      urls.push(`/categories/${slug}`)
    }

    // Split URLs into chunks
    const urlChunks = []
    for (let i = 0; i < urls.length; i += URLS_PER_SITEMAP) {
      urlChunks.push(urls.slice(i, i + URLS_PER_SITEMAP))
    }

    // Generate sitemap index
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlChunks.map((_, index) => `
    <sitemap>
      <loc>${SITE_URL}/sitemap-${index + 1}.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
  `).join('')}
</sitemapindex>`

    // Generate individual sitemaps
    await Promise.all(urlChunks.map(async (chunk, index) => {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${chunk.map(url => `
    <url>
      <loc>${SITE_URL}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${url === '/' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`

      await fs.writeFile(
        path.join(process.cwd(), 'public', `sitemap-${index + 1}.xml`),
        sitemap
      )
    }))

    // Save sitemap index
    await fs.writeFile(
      path.join(process.cwd(), 'public', 'sitemap.xml'),
      sitemapIndex
    )

    console.log(`Generated ${urlChunks.length} sitemaps`)
  } catch (error) {
    console.error('Error generating sitemaps:', error)
  }
}

generateSitemaps()