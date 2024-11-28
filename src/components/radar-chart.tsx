'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'

interface CharacteristicsData {
  subject: string
  value: number
  fullMark: number
}

interface BreedRadarChartProps {
  data: CharacteristicsData[]
}

export function BreedRadarChart({ data }: BreedRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          name="Characteristics"
          dataKey="value"
          stroke="#2563eb"
          fill="#2563eb"
          fillOpacity={0.5}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}