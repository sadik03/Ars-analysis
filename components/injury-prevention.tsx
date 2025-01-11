import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck } from 'lucide-react'

interface InjuryPreventionProps {
  tips: string[];
}

export function InjuryPrevention({ tips }: InjuryPreventionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <ShieldCheck className="h-6 w-6" />
        <CardTitle>Injury Prevention Tips</CardTitle>
      </CardHeader>
      <CardContent className="text-sm sm:text-base">
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-500 font-bold text-lg">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

