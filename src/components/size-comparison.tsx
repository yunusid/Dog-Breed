'use client'

import { useEffect, useRef } from 'react'
import { type BasicDogBreed } from '@/types'

interface SizeComparisonProps {
  breeds: BasicDogBreed[]
}

export function SizeComparison({ breeds }: SizeComparisonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Helper function to extract numeric height value
  const getHeightValue = (breed: BasicDogBreed): number => {
    const heightChar = breed.aiDescription.characteristics.find(c => c.startsWith('Size:'))
    if (!heightChar) return 0
    const match = heightChar.match(/(\d+)/)
    return match ? parseInt(match[0], 10) : 0
  }

  // Helper function to extract numeric weight value
  const getWeightValue = (breed: BasicDogBreed): number => {
    const weightChar = breed.aiDescription.characteristics.find(c => c.startsWith('Weight:'))
    if (!weightChar) return 0
    const match = weightChar.match(/(\d+)/)
    return match ? parseInt(match[0], 10) : 0
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 50

    breeds.forEach((breed, index) => {
      const heightValue = getHeightValue(breed)
      const weightValue = getWeightValue(breed)

      // Calculate scaled dimensions
      const dogHeight = heightValue * 8 // Scale factor for better visibility
      const dogWidth = Math.max(20, weightValue * 2) // Scale width based on weight

      // Draw dog silhouette
      ctx.fillStyle = index === 0 ? 'rgba(136, 132, 216, 0.6)' : 'rgba(130, 202, 157, 0.6)'
      ctx.strokeStyle = index === 0 ? '#8884d8' : '#82ca9d'
      ctx.lineWidth = 2

      const x = padding + (index * (width - padding * 2 - dogWidth)) / (breeds.length - 1)
      const y = height - padding - dogHeight

      // Draw filled rectangle with border
      ctx.fillRect(x, y, dogWidth, dogHeight)
      ctx.strokeRect(x, y, dogWidth, dogHeight)

      // Add labels
      ctx.fillStyle = '#000'
      ctx.font = '14px Arial'
      ctx.textAlign = 'center'

      // Breed name and measurements
      ctx.fillText(breed.name, x + dogWidth / 2, height - padding + 20)
      ctx.fillText(
        `Height: ${heightValue} inches`, 
        x + dogWidth / 2, 
        height - padding + 40
      )
      ctx.fillText(
        `Weight: ${weightValue} lbs`,
        x + dogWidth / 2,
        height - padding + 60
      )
    })
  }, [breeds])

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg">
        <canvas
          ref={canvasRef}
          width={400}  // Réduit de 600 à 400
          height={300} // Réduit de 400 à 300
          className="w-full"
        />
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs"> {/* Réduit la taille du texte et l'espacement */}
          {breeds.map((breed) => (
            <div key={breed.id}>
              <h4 className="font-semibold">{breed.name}</h4>
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <span className="text-muted-foreground">Height:</span>
                  <p>{getHeightValue(breed)} inches</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Weight:</span>
                  <p>{getWeightValue(breed)} lbs</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}