import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from 'lucide-react'

interface RecoveryTechniquesProps {
  techniques: string[];
}

export function RecoveryTechniques({ techniques }: RecoveryTechniquesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Zap className="h-6 w-6" />
        <CardTitle>Recovery Techniques</CardTitle>
      </CardHeader>
      <CardContent className="text-sm sm:text-base">
        <ul className="space-y-2">
          {techniques.map((technique, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-yellow-500 font-bold text-lg">•</span>
              <span>{technique}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

