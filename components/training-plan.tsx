import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from 'lucide-react'

interface TrainingPlanProps {
  plan: {
    weeklySchedule: {
      [key: string]: string[];
    };
    longTermGoals: string[];
  };
}

export function TrainingPlan({ plan }: TrainingPlanProps) {
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Calendar className="h-6 w-6" />
        <CardTitle>Training Plan</CardTitle>
      </CardHeader>
      <CardContent className="text-sm sm:text-base">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Weekly Schedule</h3>
            {daysOfWeek.map((day) => (
              <div key={day} className="mb-3 sm:mb-4">
                <h4 className="font-medium capitalize">{day}</h4>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1">
                  {plan.weeklySchedule[day].map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Long-Term Goals</h3>
            <ul className="list-disc pl-4 sm:pl-5 space-y-1">
              {plan.longTermGoals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

