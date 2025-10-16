import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// General AI chat for mental health support
export async function chatWithAI(message: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `You are a compassionate mental health support assistant. 
    Provide supportive, empathetic, and helpful responses to users seeking mental health guidance.
    Always be kind, understanding, and encourage professional help when needed.
    
    User message: ${message}
    
    Provide a thoughtful, supportive response:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return "I'm here to support you. If you're experiencing difficulties, please consider reaching out to a mental health professional who can provide personalized care.";
  }
}

// Analyze mood and provide insights
export async function analyzeMood(moodData: { mood: string; notes: string }): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `As a mental health AI assistant, analyze this mood entry and provide supportive insights:
    
    Mood: ${moodData.mood}
    Notes: ${moodData.notes}
    
    Provide brief, encouraging insights and suggestions:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Mood Analysis Error:', error);
    return "Thank you for sharing how you're feeling. Remember that all emotions are valid.";
  }
}

// Get journal feedback
export async function getJournalFeedback(journalEntry: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `As a supportive mental health assistant, provide thoughtful feedback on this journal entry:
    
    "${journalEntry}"
    
    Offer encouraging insights and positive reflections:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Journal Feedback Error:', error);
    return "Thank you for journaling. Reflecting on your thoughts is a valuable step in self-care.";
  }
}

// Get meditation guidance
export async function getMeditationGuidance(stressLevel: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `Suggest a brief meditation or mindfulness exercise for someone experiencing ${stressLevel} stress levels. 
    Keep it practical and easy to follow:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Meditation Guidance Error:', error);
    return "Try taking slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 4. Repeat for a few minutes.";
  }
}

// Detect crisis situations
export async function detectCrisis(message: string): Promise<boolean> {
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'want to die', 
    'hurt myself', 'self harm', 'no reason to live'
  ];
  
  const lowercaseMessage = message.toLowerCase();
  return crisisKeywords.some(keyword => lowercaseMessage.includes(keyword));
}

// Get personalized insights
export async function getPersonalizedInsights(userData: { 
  recentMoods: string[], 
  journalCount: number,
  sessionCount: number 
}): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `Based on this user's mental health journey data:
    - Recent moods: ${userData.recentMoods.join(', ')}
    - Journal entries: ${userData.journalCount}
    - Therapy sessions: ${userData.sessionCount}
    
    Provide encouraging insights about their progress:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Insights Error:', error);
    return "You're making great progress on your mental health journey. Keep taking care of yourself!";
  }
}

// Generate journal prompts
export async function generateJournalPrompts(mood?: string): Promise<string[]> {
  const defaultPrompts = [
    "What made you smile today?",
    "What are you grateful for right now?",
    "How are you feeling in this moment?",
    "What's one thing you did well today?",
    "What would make tomorrow better?"
  ];
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `Generate 3 thoughtful journal prompts for someone feeling ${mood || 'reflective'}. 
    Return only the prompts, one per line:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().split('\n').filter(p => p.trim()).slice(0, 3);
  } catch (error) {
    console.error('Prompt Generation Error:', error);
    return defaultPrompts.slice(0, 3);
  }
}

// Get wellness tips
export async function getWellnessTips(category: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `Provide 3 practical wellness tips for ${category}. Keep them actionable and supportive:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Wellness Tips Error:', error);
    return "Take time for self-care today. Small steps make a big difference in your mental wellness journey.";
  }
}
