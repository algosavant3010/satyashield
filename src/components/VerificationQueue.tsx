import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, XCircle, AlertCircle, Clock, ExternalLink } from "lucide-react";

interface VerificationRequest {
  id: string;
  content_type: string;
  content_text: string | null;
  content_url: string | null;
  ai_analysis: any;
  status: string;
  created_at: string;
  language: string;
}

export const VerificationQueue = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<'real' | 'fake' | 'suspicious'>('suspicious');
  const [confidence, setConfidence] = useState(70);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('verification_requests')
        .select('*')
        .eq('status', 'analyzed')
        .order('created_at', { ascending: true })
        .limit(10);

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load verification requests');
    } finally {
      setLoading(false);
    }
  };

  const submitVerification = async (requestId: string) => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Submit the verification vote
      const { error: voteError } = await supabase
        .from('verifications')
        .insert({
          request_id: requestId,
          verifier_id: user.id,
          verdict,
          confidence,
          notes: notes || null
        });

      if (voteError) throw voteError;

      // Count total votes for this request
      const { count } = await supabase
        .from('verifications')
        .select('*', { count: 'exact', head: true })
        .eq('request_id', requestId);

      // If we have 3 or more votes, calculate consensus and update status
      if (count && count >= 3) {
        const { data: votes } = await supabase
          .from('verifications')
          .select('verdict, confidence')
          .eq('request_id', requestId);

        if (votes && votes.length >= 3) {
          // Calculate consensus (simple majority)
          const verdictCounts = votes.reduce((acc: any, v) => {
            acc[v.verdict] = (acc[v.verdict] || 0) + 1;
            return acc;
          }, {});

          const finalVerdict = Object.keys(verdictCounts).reduce((a, b) =>
            verdictCounts[a] > verdictCounts[b] ? a : b
          );

          // Update the request with final verdict
          await supabase
            .from('verification_requests')
            .update({
              status: 'verified',
              final_verdict: finalVerdict,
              verifier_votes: votes
            })
            .eq('id', requestId);
        }
      }

      toast.success('Verification submitted successfully! +10 points');
      setSelectedRequest(null);
      setNotes("");
      fetchPendingRequests();
    } catch (error) {
      console.error('Error submitting verification:', error);
      toast.error('Failed to submit verification');
    } finally {
      setSubmitting(false);
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'real': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'fake': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Loading verification queue...</div>
        </CardContent>
      </Card>
    );
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No pending verifications at the moment.</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon for new content to verify!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="border-border bg-card/50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {request.content_type === 'text' ? '💬' : '📸'} Verification Request
                  <Badge variant="secondary" className="ml-2">
                    {request.language}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Submitted {new Date(request.created_at).toLocaleString()}
                </CardDescription>
              </div>
              {request.ai_analysis && (
                <div className="flex items-center gap-2">
                  {getVerdictIcon(request.ai_analysis.verdict)}
                  <span className="text-sm font-medium">
                    AI: {request.ai_analysis.verdict} ({request.ai_analysis.confidence}%)
                  </span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Content */}
            <div className="bg-muted/50 rounded-lg p-4">
              {request.content_text && (
                <p className="text-sm whitespace-pre-wrap">{request.content_text}</p>
              )}
              {request.content_url && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <ExternalLink className="h-4 w-4" />
                  <a href={request.content_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    View Media
                  </a>
                </div>
              )}
            </div>

            {/* AI Analysis */}
            {request.ai_analysis && (
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                <p className="text-sm font-medium mb-2 text-foreground">AI Analysis:</p>
                <p className="text-sm text-muted-foreground mb-2">{request.ai_analysis.analysis}</p>
                {request.ai_analysis.indicators && request.ai_analysis.indicators.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-foreground mb-1">Red Flags:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {request.ai_analysis.indicators.map((indicator: string, idx: number) => (
                        <li key={idx}>• {indicator}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Verification Form */}
            {selectedRequest === request.id ? (
              <div className="space-y-4 border-t border-border pt-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Your Verdict</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['real', 'fake', 'suspicious'].map((v) => (
                      <Button
                        key={v}
                        variant={verdict === v ? 'default' : 'outline'}
                        onClick={() => setVerdict(v as any)}
                        className="capitalize"
                      >
                        {v === 'real' && '✅'} {v === 'fake' && '❌'} {v === 'suspicious' && '⚠️'} {v}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Confidence: {confidence}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={confidence}
                    onChange={(e) => setConfidence(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Notes (Optional)
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Explain your reasoning..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => submitVerification(request.id)}
                    disabled={submitting}
                    className="flex-1"
                  >
                    {submitting ? 'Submitting...' : 'Submit Verification'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRequest(null)}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setSelectedRequest(request.id)}
                className="w-full"
                variant="outline"
              >
                Verify This Content
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
