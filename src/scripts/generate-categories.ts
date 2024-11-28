import fs from 'fs/promises'
import path from 'path'
import OpenAI from 'openai'
import { EnhancedDogBreed } from '@/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

async function generateCategories() {
  try {
    const breedsDir = path.join(process.cwd(), 'data', 'breeds')
    const files = await fs.readdir(breedsDir)
    
    const categories = new Set<string>()
    
    // Collect all unique categories from breed tags
    for (const file of files) {
      const breedData: EnhancedDogBreed = JSON.parse(
        await fs.readFile(path.join(breedsDir, file), 'utf-8')
      )
      breedData.aiDescription.tags.forEach(tag => categories.add(tag))
    }

    // Generate category descriptions
    const categoryData = await Promise.all(
      Array.from(categories).map(async category => {
        const prompt = `Generate a detailed description for the category of "${category}" dog breeds in JSON format.
        
Example output format:
{
  "name": "${category}",
  "slug": "category-slug",
  "description": "Detailed description of what makes a dog breed fit into this category",
  "characteristics": ["trait1", "trait2", "trait3"],
  "considerations": ["consideration1", "consideration2"]
}`;

        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{
            role: "system",
            content: "You are an expert in dog breeds and their categorization."
          }, {
            role: "user",
            content: prompt
          }],
          response_format: { type: "json_object" },
          temperature: 0.7,
        })

        return JSON.parse(response.choices[0]?.message?.content || '{}')
      })
    )

    // Save category data
    const categoriesDir = path.join(process.cwd(), 'data', 'categories')
    await fs.mkdir(categoriesDir, { recursive: true })

    for (const category of categoryData) {
      await fs.writeFile(
        path.join(categoriesDir, `${category.slug}.json`),
        JSON.stringify(category, null, 2)
      )
    }

    console.log(`Generated ${categoryData.length} categories`)
  } catch (error) {
    console.error('Error generating categories:', error)
  }
}

generateCategories()