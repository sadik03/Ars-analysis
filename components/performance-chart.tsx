'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface PerformanceMetrics {
  strength: number;
  powerOutput: number;
  technique: number;
  consistency: number;
  improvement: number;
  endurance: number;
  speed: number;
  agility: number;
  flexibility: number;
  balance: number;
  mentalToughness: number;
  tacticalAwareness: number;
}

export function PerformanceChart({ metrics }: { metrics: PerformanceMetrics }) {
  const data = Object.entries(metrics).map(([name, value]) => ({ name, value }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Score",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 210, left: 0, bottom: 5 }}>
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background p-2 border rounded shadow text-xs sm:text-sm">
                        <p className="font-bold">{payload[0].name}</p>
                        <p>Score: {payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar
                dataKey="value"
                fill="hsl(var(--chart-1))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

