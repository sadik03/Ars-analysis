'use client'

import { useState } from 'react'
import { Dumbbell } from 'lucide-react'
import { analyzeAdvancedFeedback } from './actions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { PerformanceChart } from '../components/performance-chart'
import { Recommendations } from '../components/recommendations'
import { TrainingPlan } from '../components/training-plan'
import { NutritionAdvice } from '../components/nutrition-advice'
import { InjuryPrevention } from '../components/injury-prevention'
import { MentalPreparation } from '../components/mental-preparation'
import { RecoveryTechniques } from '../components/recovery-techniques'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdvancedFeedbackPage() {
  const [sport, setSport] = useState<string>('')
  const [skillLevel, setSkillLevel] = useState<string>('')
  const [frequency, setFrequency] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [fitnessLevel, setFitnessLevel] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setAnalysis(null);
    console.log('Submitting form data:', Object.fromEntries(formData));
    const result = await analyzeAdvancedFeedback(formData);
    console.log('Received result:', result);
    if (result.success && result.analysis) {
      setAnalysis(result.analysis);
    } else {
      setError(result.error || 'An error occurred during analysis. Please try again.');
    }
    setLoading(false);
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Dumbbell className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Sports Analysis</h1>
          <p className="mt-2 text-gray-600">
            Get comprehensive feedback and personalized training recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="lg:sticky lg:top-4 lg:self-start">
            <CardHeader>
              <CardTitle>Submit Your Feedback</CardTitle>
              <CardDescription>
                Provide detailed information about your sports experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sport">Sport</Label>
                    <Select name="sport" value={sport} onValueChange={setSport} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basketball">Basketball</SelectItem>
                        <SelectItem value="football">Football</SelectItem>
                        <SelectItem value="soccer">Soccer</SelectItem>
                        <SelectItem value="tennis">Tennis</SelectItem>
                        <SelectItem value="swimming">Swimming</SelectItem>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skillLevel">Skill Level</Label>
                    <Select name="skillLevel" value={skillLevel} onValueChange={setSkillLevel} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Training Frequency</Label>
                    <Select name="frequency" value={frequency} onValueChange={setFrequency} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 times/week</SelectItem>
                        <SelectItem value="3-4">3-4 times/week</SelectItem>
                        <SelectItem value="5+">5+ times/week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      type="number"
                      id="age"
                      name="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fitnessLevel">Fitness Level</Label>
                    <Select name="fitnessLevel" value={fitnessLevel} onValueChange={setFitnessLevel} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fitness level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="elite">Elite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Your Goals</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    placeholder="What are your specific goals? (e.g., improve endurance, increase strength)"
                    className="h-24"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Detailed Feedback</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    placeholder="Describe your current performance, challenges, and areas you want to improve..."
                    className="h-32"
                    required
                  />
                </div>

                <Button type="submit" className="w-full py-2 px-4 text-sm sm:text-base" disabled={loading}>
                  {loading ? 'Analyzing...' : 'Submit for Advanced Analysis'}
                </Button>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 sm:p-4 mt-4 text-sm">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {analysis && (
            <div className="space-y-6">
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="plan">Plan</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  <TabsTrigger value="extras">Extras</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary">
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm">
                        <p>{analysis.summary}</p>
                        <h4 className="mt-4 font-semibold">Technical Analysis</h4>
                        <p>{analysis.technicalAnalysis}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="metrics">
                  <PerformanceChart metrics={analysis.performanceMetrics} />
                </TabsContent>

                <TabsContent value="plan">
                  <div className="space-y-6">
                    <Recommendations recommendations={analysis.recommendations} />
                    <TrainingPlan plan={analysis.trainingPlan} />
                  </div>
                </TabsContent>

                <TabsContent value="nutrition">
                  <NutritionAdvice advice={analysis.nutritionAdvice} />
                </TabsContent>

                <TabsContent value="extras">
                  <div className="space-y-6">
                    <InjuryPrevention tips={analysis.injuryPreventionTips} />
                    <MentalPreparation strategies={analysis.mentalPreparationStrategies} />
                    <RecoveryTechniques techniques={analysis.recoveryTechniques} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

