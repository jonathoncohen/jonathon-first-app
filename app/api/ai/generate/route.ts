import { NextRequest, NextResponse } from 'next/server';

// Array of programming jokes (we'll use Claude AI later)
const programmingJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
  "Why do Java developers wear glasses? Because they don't C#!",
  "What's a programmer's favorite hangout place? The Foo Bar!",
  "Why did the developer go broke? Because he used up all his cache!",
  "What do you call a programmer from Finland? Nerdic!",
  "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25!",
  "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?'",
  "How do you comfort a JavaScript bug? You console it!",
  "Why did the Python programmer not respond? Because he was busy debugging indentation errors!",
  "What's the object-oriented way to become wealthy? Inheritance!",
  "Why did the programmer quit his job? Because he didn't get arrays!",
  "What do you call a programmer who doesn't comment their code? A developer in disguise!",
  "Why do programmers hate nature? It has too many bugs!",
  "What's a programmer's favorite music? Heavy metal... because of all the crashes!"
];

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    console.log('🤖 AI Generate Request:', prompt);
    
    // For now, we'll use random jokes
    // Later, we can integrate with Claude AI API
    const randomJoke = programmingJokes[Math.floor(Math.random() * programmingJokes.length)];
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      success: true,
      response: randomJoke,
      model: 'joke-generator-v1',
      timestamp: new Date().toISOString(),
      prompt: prompt
    });
  } catch (error) {
    console.error('❌ AI Generate Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ready',
    endpoint: '/api/ai/generate',
    methods: ['POST'],
    description: 'Generate AI responses (currently jokes)',
    example: {
      prompt: 'Tell me a funny programming joke'
    },
    availablePrompts: [
      'Tell me a funny programming joke',
      'Give me a developer joke',
      'Share a coding humor'
    ]
  });
}