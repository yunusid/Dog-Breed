import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Heart, Zap, Brain, Coffee } from 'lucide-react'

const temperamentCategories = {
  'friendly': {
    description: 'Sociable and outgoing dogs that get along well with everyone.',
    traits: ['Affectionate', 'Social', 'Gentle'],
    icon: Heart
  },
  'active': {
    description: 'High-energy dogs that need plenty of exercise and activities.',
    traits: ['Energetic', 'Athletic', 'Playful'],
    icon: Zap
  },
  'intelligent': {
    description: 'Quick learners that excel in training and problem-solving.',
    traits: ['Smart', 'Trainable', 'Focused'],
    icon: Brain
  },
  'calm': {
    description: 'Relaxed and easygoing dogs that adapt well to quiet living.',
    traits: ['Peaceful', 'Patient', 'Quiet'],
    icon: Coffee
  }
}

export default function TemperamentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Dog Breeds by Temperament</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Discover dogs that match your personality and lifestyle preferences
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(temperamentCategories).map(([temperament, info]) => (
          <Link key={temperament} href={`/temperament/${temperament}`}>
            <Card className="hover:shadow-lg transition-shadow h-full">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {info.icon && <info.icon className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-semibold capitalize">{temperament} Dogs</h3>
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