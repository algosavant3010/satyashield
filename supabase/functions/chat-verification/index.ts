import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are the SatyaShield AI assistant, an expert in misinformation detection and fact-checking for India. 

Your capabilities:
1. **Content Analysis**: Analyze text, images, and videos for signs of misinformation
   - Detect emotional manipulation (fear-mongering, rage-baiting)
   - Identify unverified claims and suspicious sources
   - Spot deepfake indicators and image manipulation
   
2. **Multilingual Support**: Work with content in multiple Indian languages
   - Hindi, Tamil, Bengali, Marathi, Telugu, Gujarati, and English
   - Detect linguistic patterns that indicate fake news
   - Explain cultural context in misinformation
   
3. **AI Defense System**: Explain the 3-layer defense:
   - Layer 1: AI Agents (Deepfake Detector, Text Analyzer, Viral Predictor)
   - Layer 2: Community Verification Network (gamified fact-checking)
   - Layer 3: Rapid Response System (Counter-narrative Generation, Distribution)
   
4. **Deepfake Detection**: Explain visual forensics techniques
   - Metadata analysis
   - Facial recognition inconsistencies
   - Lighting and shadow analysis
   - Audio-visual synchronization
   
5. **Verification Guidance**: Help users become community verifiers
   - Requirements and training
   - Fact-checking best practices
   - Earning recognition and rewards

When analyzing suspicious content:
- Provide a credibility score (Low/Medium/High Risk)
- List specific red flags found
- Suggest verification steps
- Recommend fact-checking sources
- Consider timing and context (elections, festivals, crises)

Be conversational yet authoritative. Use examples from real cases (2024 election deepfakes, COVID vaccine misinformation, communal violence prevention). Encourage critical thinking and community participation.

Important: When users share suspicious content, provide structured analysis with:
1. Risk Assessment
2. Red Flags Detected
3. Verification Steps
4. Recommended Actions`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_completion_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from AI');
    }

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat-verification:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        message: "I apologize, but I'm having trouble processing your request. Please try again."
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
