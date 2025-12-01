-- Create verifier_stats table for tracking verifier performance
CREATE TABLE public.verifier_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  total_reviews INTEGER DEFAULT 0,
  correct_votes INTEGER DEFAULT 0,
  accuracy_percentage DECIMAL(5,2) DEFAULT 0.00,
  total_points INTEGER DEFAULT 0,
  rank INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  badges JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.verifier_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for verifier_stats
CREATE POLICY "Anyone can view verifier stats"
  ON public.verifier_stats
  FOR SELECT
  USING (true);

CREATE POLICY "Verifiers can update their own stats"
  ON public.verifier_stats
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert verifier stats"
  ON public.verifier_stats
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_verifier_stats_updated_at
  BEFORE UPDATE ON public.verifier_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to initialize verifier stats when a user becomes a verifier
CREATE OR REPLACE FUNCTION public.initialize_verifier_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only initialize if the role is 'verifier' or 'admin'
  IF NEW.role IN ('verifier', 'admin') THEN
    INSERT INTO public.verifier_stats (user_id)
    VALUES (NEW.user_id)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to auto-create verifier stats
CREATE TRIGGER on_verifier_role_assigned
  AFTER INSERT ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.initialize_verifier_stats();

-- Create verifications table to track individual votes
CREATE TABLE public.verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.verification_requests(id) ON DELETE CASCADE,
  verifier_id UUID NOT NULL,
  verdict TEXT NOT NULL CHECK (verdict IN ('real', 'fake', 'suspicious')),
  confidence INTEGER NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for verifications
CREATE POLICY "Verifiers can view all verifications"
  ON public.verifications
  FOR SELECT
  USING (has_role(auth.uid(), 'verifier') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Verifiers can create verifications"
  ON public.verifications
  FOR INSERT
  WITH CHECK (auth.uid() = verifier_id AND (has_role(auth.uid(), 'verifier') OR has_role(auth.uid(), 'admin')));

-- Function to update verifier stats after a verification
CREATE OR REPLACE FUNCTION public.update_verifier_stats_after_vote()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  request_verdict TEXT;
  is_correct BOOLEAN;
BEGIN
  -- Get the final verdict of the request
  SELECT final_verdict INTO request_verdict
  FROM public.verification_requests
  WHERE id = NEW.request_id;

  -- Only update stats if the request has a final verdict
  IF request_verdict IS NOT NULL THEN
    is_correct := (NEW.verdict = request_verdict);

    -- Update verifier stats
    UPDATE public.verifier_stats
    SET 
      total_reviews = total_reviews + 1,
      correct_votes = CASE WHEN is_correct THEN correct_votes + 1 ELSE correct_votes END,
      accuracy_percentage = ROUND(
        (CASE WHEN is_correct THEN correct_votes + 1 ELSE correct_votes END)::DECIMAL / 
        (total_reviews + 1)::DECIMAL * 100, 
        2
      ),
      total_points = total_points + CASE 
        WHEN is_correct THEN (NEW.confidence / 10) -- 10 points for 100% confidence
        ELSE -5 -- Penalty for incorrect vote
      END,
      current_streak = CASE 
        WHEN is_correct THEN current_streak + 1 
        ELSE 0 
      END,
      longest_streak = CASE 
        WHEN is_correct AND (current_streak + 1) > longest_streak 
        THEN current_streak + 1 
        ELSE longest_streak 
      END,
      updated_at = now()
    WHERE user_id = NEW.verifier_id;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger to update stats after verification
CREATE TRIGGER on_verification_created
  AFTER INSERT ON public.verifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_verifier_stats_after_vote();