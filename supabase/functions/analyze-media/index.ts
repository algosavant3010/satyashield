import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const contentType = formData.get('contentType') as string || 'image';

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('Processing file:', file.name, file.type, file.size);

    // Upload file to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('verification-media')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return new Response(JSON.stringify({ error: 'Failed to upload file' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('verification-media')
      .getPublicUrl(fileName);

    console.log('File uploaded:', publicUrl);

    // Convert file to base64 for AI analysis
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Process in chunks to avoid stack overflow with large files
    let binary = '';
    const chunkSize = 8192;
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }
    
    const base64 = btoa(binary);
    const dataUrl = `data:${file.type};base64,${base64}`;

    // Analyze with Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert deepfake and media manipulation detector. Analyze the provided ${contentType} for signs of AI manipulation, deepfakes, or digital alterations.

Provide your analysis in JSON format with these fields:
{
  "verdict": "real" | "fake" | "suspicious",
  "confidence": 0-100,
  "analysis": "detailed explanation",
  "indicators": ["list of specific manipulation indicators found"],
  "recommendations": "what users should know"
}`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this ${contentType} for deepfakes or digital manipulation. Look for: inconsistent lighting, unnatural facial movements, artifacts around edges, metadata inconsistencies, AI generation patterns, and other manipulation indicators.`
              },
              {
                type: 'image_url',
                image_url: { url: dataUrl }
              }
            ]
          }
        ],
        max_tokens: 1000
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI analysis error:', aiResponse.status, errorText);
      return new Response(JSON.stringify({ error: 'AI analysis failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content || '{}';
    
    console.log('AI response:', aiContent);

    // Parse AI response
    let analysis;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = aiContent.match(/```json\s*([\s\S]*?)\s*```/) || 
                       aiContent.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : aiContent;
      analysis = JSON.parse(jsonStr);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      analysis = {
        verdict: 'suspicious',
        confidence: 50,
        analysis: aiContent,
        indicators: [],
        recommendations: 'Unable to perform complete analysis'
      };
    }

    // Create verification request
    const { data: requestData, error: requestError } = await supabase
      .from('verification_requests')
      .insert({
        created_by: user.id,
        content_type: contentType,
        content_url: publicUrl,
        status: 'analyzed',
        ai_analysis: analysis,
        final_verdict: analysis.verdict,
        language: 'english'
      })
      .select()
      .single();

    if (requestError) {
      console.error('Database error:', requestError);
      return new Response(JSON.stringify({ error: 'Failed to save analysis' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      analysis,
      requestId: requestData.id,
      mediaUrl: publicUrl
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
