import { cache } from 'react'
import { Redis } from '@upstash/redis'
import { EnhancedDogBreed } from '@/types'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

const CACHE_TTL = 60 * 60 * 24 // 24 hours

export const getCachedBreedData = cache(async (slug: string): Promise<EnhancedDogBreed | null> => {
  const cacheKey = `breed:${slug}`
  
  try {
    // Try to get from Redis first
    const cached = await redis.get(cacheKey)
    if (cached) {
      return JSON.parse(cached as string)
    }

    // If not in Redis, get from file system
    const breed = await import(`@/data/breeds/${slug}.json`)
    
    // Cache in Redis for future requests
    await redis.set(cacheKey, JSON.stringify(breed), {
      ex: CACHE_TTL,
    })

    return breed
  } catch (error) {
    return null
  }
})

export const getCachedBreeds = cache(async (): Promise<string[]> => {
  const cacheKey = 'all-breeds'

  try {
    // Try to get from Redis first
    const cached = await redis.get(cacheKey)
    if (cached) {
      return JSON.parse(cached as string)
    }

    // If not in Redis, get from file system
    const breeds = await import('@/data/breeds/index.json')
    
    // Cache in Redis for future requests
    await redis.set(cacheKey, JSON.stringify(breeds), {
      ex: CACHE_TTL,
    })

    return breeds
  } catch (error) {
    return []
  }
})