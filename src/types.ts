export interface BasicDogBreed {
  id: string
  slug: string
  name: string
  temperament: string
  image: {
    url: string
  }
  breedGroup: string
  height: {
    metric: string
    imperial: string
  }
  weight: {
    metric: string
    imperial: string
  }
  aiDescription: {
    tags: string[]
    suitability: {
      families: number
      apartments: number
      training: number
      exercise: number
      grooming: number
      adaptability: number
    }
    characteristics: string[]
  }
}
  
  export interface EnhancedDogBreed {
    id: string
    name: string
    slug: string
    image?: {
        url: string
    }
    aiDescription?: {
        suitability?: {
          adaptability: number
          families: number
          apartments: number
          training: number
          exercise: number
          grooming: number
        }
        tags: string[]
        characteristics: string[]
    }
    friendliness: number
    health_needs: number
    trainability: number
    physical_needs: number
    height?: {
        imperial: string
        metric: string
      }
      weight?: {
        imperial: string
        metric: string
      }
    bred_for: string
    breed_group: string
    life_span: string
    origin: string
    description: string
    history: string
    healthIssues: string[]
    trainingTips: string[]
    groomingNeeds: string[]
    funFacts: string[]
  }