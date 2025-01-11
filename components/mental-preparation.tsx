import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain } from 'lucide-react'

interface MentalPreparationProps {
  strategies: string[];
}

export function MentalPreparation({ strategies }: MentalPreparationProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Brain className="h-6 w-6" />
        <CardTitle>Mental Preparation Strategies</CardTitle>
      </CardHeader>
      <CardContent className="text-sm sm:text-base">
        <ul className="space-y-2">
          {strategies.map((strategy, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-500 font-bold text-lg">•</span>
              <span>{strategy}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

