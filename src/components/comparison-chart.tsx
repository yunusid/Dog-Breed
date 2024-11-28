'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { type EnhancedDogBreed } from '@/types'

interface ComparisonChartProps {
  breed1: EnhancedDogBreed
  breed2: EnhancedDogBreed
}

export function ComparisonChart({ breed1, breed2 }: ComparisonChartProps) {
  // Préparer les données pour le graphique
  const data = [
    {
      characteristic: 'Adaptability',
      [breed1.name]: breed1.aiDescription?.suitability?.adaptability || 0,
      [breed2.name]: breed2.aiDescription?.suitability?.adaptability || 0,
    },
    {
      characteristic: 'Family Friendly',
      [breed1.name]: breed1.aiDescription?.suitability?.families || 0,
      [breed2.name]: breed2.aiDescription?.suitability?.families || 0,
    },
    {
      characteristic: 'Apartment Living',
      [breed1.name]: breed1.aiDescription?.suitability?.apartments || 0,
      [breed2.name]: breed2.aiDescription?.suitability?.apartments || 0,
    },
    {
      characteristic: 'Training',
      [breed1.name]: breed1.aiDescription?.suitability?.training || 0,
      [breed2.name]: breed2.aiDescription?.suitability?.training || 0,
    },
    {
      characteristic: 'Exercise Needs',
      [breed1.name]: breed1.aiDescription?.suitability?.exercise || 0,
      [breed2.name]: breed2.aiDescription?.suitability?.exercise || 0,
    },
    {
      characteristic: 'Grooming',
      [breed1.name]: breed1.aiDescription?.suitability?.grooming || 0,
      [breed2.name]: breed2.aiDescription?.suitability?.grooming || 0,
    }
  ]

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="characteristic" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar
            name={breed1.name}
            dataKey={breed1.name}
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name={breed2.name}
            dataKey={breed2.name}
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>

      {/* Ajout d'une légende détaillée */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-semibold mb-2">{breed1.name}</h4>
          <ul className="space-y-1">
            {Object.entries(data[0]).filter(([key]) => key !== 'characteristic').map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span>{key}:</span>
                <span>{value}/5</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">{breed2.name}</h4>
          <ul className="space-y-1">
            {Object.entries(data[0]).filter(([key]) => key !== 'characteristic').map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span>{key}:</span>
                <span>{value}/5</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}