
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

interface ChartData {
  name: string;
  score: number;
}

interface RadarChartComponentProps {
  data: ChartData[];
}

export const RadarChartComponent: React.FC<RadarChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.2}/>
            </linearGradient>
        </defs>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} />
        <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} />
        <Radar 
            name="Кандидат" 
            dataKey="score" 
            stroke="#4f46e5" 
            fill="url(#colorScore)"
            fillOpacity={0.6}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #ccc',
            borderRadius: '0.5rem',
            backdropFilter: 'blur(5px)',
          }}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};