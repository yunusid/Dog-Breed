export interface DogBreed {
    id: number;
    name: string;
    temperament?: string;
    life_span?: string;
    breed_group?: string;
    bred_for?: string;
    origin?: string;
    weight: {
      imperial: string;
      metric: string;
    };
    height: {
      imperial: string;
      metric: string;
    };
    image?: {
      id: string;
      url: string;
    };
  }
  
  export interface EnhancedDogBreed extends DogBreed {
    aiDescription: {
      detailedDescription: string;
      characteristics: string[];
      suitability: {
        families: number;
        apartments: number;
        training: number;
        exercise: number;
      };
      tags: string[];
      faqs: Array<{
        question: string;
        answer: string;
      }>;
      comparisons: string[];
      slug: string;
    };
  }
  
  export interface Category {
    name: string;
    slug: string;
    description: string;
    breeds: string[];
  }