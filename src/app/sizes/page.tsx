import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Rabbit, Dog, PawPrint, Bone } from 'lucide-react'

const sizeCategories = {
  'small': {
    description: 'Perfect for apartments and small spaces.',
    traits: ['Under 20 pounds', 'Compact', 'Easy to carry'],
    icon: Rabbit
  },
  'medium': {
    description: 'Versatile dogs that adapt to most living situations.',
    traits: ['20-50 pounds', 'Balanced', 'Adaptable'],
    icon: Dog
  },
  'large': {
    description: 'Ideal for spacious homes and active families.',
    traits: ['50-90 pounds', 'Strong', 'Protective'],
    icon: PawPrint
  },
  'giant': {
    description: 'Gentle giants that need plenty of space.',
    traits: ['Over 90 pounds', 'Powerful', 'Majestic'],
    icon: Bone
  }
}

export default function SizePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Dog Breeds by Size</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Find dogs that fit your living space and lifestyle
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(sizeCategories).map(([size, info]) => (
          <Link key={size} href={`/sizes/${size}`}>
            <Card className="hover:shadow-lg transition-shadow h-full">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {info.icon && <info.icon className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-semibold capitalize">{size} Dogs</h3>
                    <p className="text-sm text-muted-foreground">
                      {info.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {info.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}