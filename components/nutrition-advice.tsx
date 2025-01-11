import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NutritionAdviceProps {
  advice: {
    generalTips: string[];
    mealPlan: {
      breakfast: string[];
      lunch: string[];
      dinner: string[];
      snacks: string[];
    };
  };
}

export function NutritionAdvice({ advice }: NutritionAdviceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Advice</CardTitle>
      </CardHeader>
      <CardContent className="text-sm sm:text-base">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">General Tips</h3>
            <ul className="list-disc pl-4 sm:pl-5 space-y-1">
              {advice.generalTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Meal Plan</h3>
            {Object.entries(advice.mealPlan).map(([meal, items]) => (
              <div key={meal} className="mb-2 sm:mb-3">
                <h4 className="font-medium capitalize">{meal}</h4>
                <ul className="list-disc pl-4 sm:pl-5">
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

