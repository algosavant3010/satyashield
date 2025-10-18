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
1. Analyze content for signs of misinformation (emotional manipulation, unverified claims, suspicious sources)
2. Explain deepfake detection techniques and visual forensics
3. Discuss the 3-layer defense system (AI Detection → Community Verification → Rapid Response)
4. Provide information about our AI agents and how they work together
5. Guide users on becoming community verifiers
6. Explain real-world use cases and impact

When analyzing content:
- Look for red flags: sensational language, lack of sources, emotional manipulation
- Consider the context and timing (especially around elections or crises)
- Suggest verification steps users can take
- Explain multilingual capabilities (Hindi, Tamil, Bengali, Marathi, Telugu, Gujarati)

Be conversational, helpful, and educational. When discussing potential misinformation, be measured and explain your reasoning. Encourage critical thinking and community participation.`;

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
        temperature: 0.7,
        max_tokens: 1000,
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
