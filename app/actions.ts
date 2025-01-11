'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const GEMINI_API_KEY = "AIzaSyBRVG5XquVDTSIKYBm4iP0F2cENGrWkyao";

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in the environment variables');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface AdvancedAnalysisResult {
  summary: string;
  technicalAnalysis: string;
  performanceMetrics: {
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
  };
  recommendations: string[];
  trainingPlan: {
    weeklySchedule: {
      [key: string]: string[];
    };
    longTermGoals: string[];
  };
  nutritionAdvice: {
    generalTips: string[];
    mealPlan: {
      breakfast: string[];
      lunch: string[];
      dinner: string[];
      snacks: string[];
    };
  };
  injuryPreventionTips: string[];
  mentalPreparationStrategies: string[];
  recoveryTechniques: string[];
}

export async function analyzeAdvancedFeedback(formData: FormData): Promise<{
  success: boolean;
  analysis?: AdvancedAnalysisResult;
  error?: string;
}> {
  try {
    const sport = formData.get('sport');
    const skillLevel = formData.get('skillLevel');
    const frequency = formData.get('frequency');
    const feedback = formData.get('feedback');
    const goals = formData.get('goals');
    const age = formData.get('age');
    const fitnessLevel = formData.get('fitnessLevel');
    
    console.log('Received form data:', { sport, skillLevel, frequency, goals, age, fitnessLevel });

    const prompt = `As an advanced sports analysis AI, provide a comprehensive analysis for an athlete in ${sport} with the following information:

    Age: ${age}
    Skill Level: ${skillLevel}
    Training Frequency: ${frequency}
    Fitness Level: ${fitnessLevel}
    Feedback: ${feedback}
    Goals: ${goals}

    Provide a structured analysis including:
    1. Brief summary
    2. Detailed technical analysis
    3. Performance metrics (strength, power output, technique, consistency, improvement potential, endurance, speed, agility, flexibility, balance, mental toughness, tactical awareness) as numbers between 0-100
    4. Specific recommendations
    5. Detailed weekly training plan and long-term goals
    6. Comprehensive nutrition advice with meal plan
    7. Injury prevention tips
    8. Mental preparation strategies
    9. Recovery techniques

    Format the response in JSON with the following structure:
    {
      "summary": "...",
      "technicalAnalysis": "...",
      "performanceMetrics": {
        "strength": number,
        "powerOutput": number,
        "technique": number,
        "consistency": number,
        "improvement": number,
        "endurance": number,
        "speed": number,
        "agility": number,
        "flexibility": number,
        "balance": number,
        "mentalToughness": number,
        "tacticalAwareness": number
      },
      "recommendations": ["...", "..."],
      "trainingPlan": {
        "weeklySchedule": {
          "monday": ["...", "..."],
          "tuesday": ["...", "..."],
          "wednesday": ["...", "..."],
          "thursday": ["...", "..."],
          "friday": ["...", "..."],
          "saturday": ["...", "..."],
          "sunday": ["...", "..."]
        },
        "longTermGoals": ["...", "..."]
      },
      "nutritionAdvice": {
        "generalTips": ["...", "..."],
        "mealPlan": {
          "breakfast": ["...", "..."],
          "lunch": ["...", "..."],
          "dinner": ["...", "..."],
          "snacks": ["...", "..."]
        }
      },
      "injuryPreventionTips": ["...", "..."],
      "mentalPreparationStrategies": ["...", "..."],
      "recoveryTechniques": ["...", "..."]
    }`

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    let analysis: AdvancedAnalysisResult;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in the response');
      }
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.error('Raw Response:', text);
      throw new Error('Failed to parse AI response');
    }

    return { success: true, analysis };
  } catch (error) {
    let errorMessage = 'An unknown error occurred while analyzing your feedback.';
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
}
