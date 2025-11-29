import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  TrendingUp, 
  Clock, 
  Eye, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Trophy,
  Target,
  Flame,
  Users,
  Activity
} from "lucide-react";

interface VerificationRequest {
  id: string;
  content_text: string;
  content_url: string;
  content_type: string;
  status: string;
  final_verdict: string;
  created_at: string;
  language: string;
  ai_analysis: any;
}

interface HeatmapData {
  region: string;
  count: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  trending: boolean;
}

const VerifierDashboard = () => {
  const { user } = useAuth();
  const { isVerifier } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [stats, setStats] = useState({
    totalReviewed: 0,
    accuracy: 0,
    points: 0,
    rank: 0
  });
  
  // Simulated heatmap data for Indian regions
  const [heatmapData] = useState<HeatmapData[]>([
    { region: "Maharashtra", count: 47, riskLevel: "high", trending: true },
    { region: "Delhi NCR", count: 38, riskLevel: "high", trending: true },
    { region: "Karnataka", count: 32, riskLevel: "medium", trending: false },
    { region: "Tamil Nadu", count: 28, riskLevel: "medium", trending: true },
    { region: "West Bengal", count: 25, riskLevel: "medium", trending: false },
    { region: "Gujarat", count: 22, riskLevel: "low", trending: false },
    { region: "Uttar Pradesh", count: 52, riskLevel: "critical", trending: true },
    { region: "Telangana", count: 19, riskLevel: "low", trending: false },
    { region: "Rajasthan", count: 16, riskLevel: "low", trending: false },
    { region: "Kerala", count: 14, riskLevel: "low", trending: false },
  ]);

  useEffect(() => {
    if (!user || !isVerifier) {
      navigate("/auth/login");
      return;
    }
    fetchData();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('verification-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'verification_requests'
        },
        (payload) => {
          toast({
            title: "New Verification Request",
            description: "A new content submission needs review",
          });
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isVerifier, navigate]);

  const fetchData = async () => {
    // Fetch pending verification requests
    const { data: requestsData } = await supabase
      .from("verification_requests")
      .select("*")
      .eq("status", "analyzed")
      .order("created_at", { ascending: false })
      .limit(10);

    if (requestsData) {
      setRequests(requestsData);
    }

    // Simulate verifier stats (in production, fetch from user_stats table)
    setStats({
      totalReviewed: 156,
      accuracy: 94,
      points: 1250,
      rank: 12
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical": return "text-destructive border-destructive/50 bg-destructive/10";
      case "high": return "text-warning border-warning/50 bg-warning/10";
      case "medium": return "text-secondary border-secondary/50 bg-secondary/10";
      case "low": return "text-accent border-accent/50 bg-accent/10";
      default: return "text-muted-foreground border-border bg-muted";
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict?.toLowerCase()) {
      case "real": return <CheckCircle className="h-5 w-5 text-accent" />;
      case "fake": return <XCircle className="h-5 w-5 text-destructive" />;
      default: return <AlertTriangle className="h-5 w-5 text-warning" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-foreground">Verifier Dashboard</h1>
                <p className="text-lg text-muted-foreground">
                  Review content, earn points, and fight misinformation
                </p>
              </div>
              
              {/* Gamification Stats */}
              <div className="flex items-center gap-3">
                <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Rank</p>
                      <p className="text-xl font-bold text-foreground">#{stats.rank}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/20 border-accent/20">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Points</p>
                      <p className="text-xl font-bold text-foreground">{stats.points}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <Tabs defaultValue="heatmap" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="heatmap">
                <MapPin className="h-4 w-4 mr-2" />
                Real-Time Heatmap
              </TabsTrigger>
              <TabsTrigger value="queue">
                <Eye className="h-4 w-4 mr-2" />
                Verification Queue
              </TabsTrigger>
              <TabsTrigger value="stats">
                <Activity className="h-4 w-4 mr-2" />
                My Stats
              </TabsTrigger>
            </TabsList>

            {/* Real-Time Heatmap */}
            <TabsContent value="heatmap" className="space-y-6">
              <Card className="border-border shadow-strong">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Flame className="h-5 w-5 text-destructive" />
                        Misinformation Hotspots
                      </CardTitle>
                      <CardDescription>
                        Live geographic distribution across India - Updates every 5 minutes
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="animate-pulse">
                      <Activity className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Heatmap Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {heatmapData
                      .sort((a, b) => b.count - a.count)
                      .map((data, idx) => (
                      <Card 
                        key={idx}
                        className={`p-4 transition-all hover:scale-105 cursor-pointer border-2 ${getRiskColor(data.riskLevel)}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <h3 className="font-semibold text-sm">{data.region}</h3>
                          </div>
                          {data.trending && (
                            <TrendingUp className="h-4 w-4 text-destructive animate-pulse" />
                          )}
                        </div>
                        <p className="text-2xl font-bold mb-1">{data.count}</p>
                        <p className="text-xs opacity-80 mb-2">Active Reports</p>
                        <Badge variant="outline" className="text-xs">
                          {data.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </Card>
                    ))}
                  </div>

                  {/* Risk Legend */}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-3 text-foreground">Risk Level Guide:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent"></div>
                        <span className="text-muted-foreground">Low (0-20)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-secondary"></div>
                        <span className="text-muted-foreground">Medium (21-35)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-warning"></div>
                        <span className="text-muted-foreground">High (36-50)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-destructive"></div>
                        <span className="text-muted-foreground">Critical (50+)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trending Alerts */}
              <Card className="border-warning/50 bg-warning/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-warning" />
                    Viral Prediction Alerts
                  </CardTitle>
                  <CardDescription>
                    Content likely to go viral in next 12-24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1 text-foreground">
                          Deepfake video of political figure spreading in Uttar Pradesh
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Early detection • Predicted reach: 2M+ in 18 hours • Hindi language
                        </p>
                      </div>
                      <Badge variant="destructive">High Priority</Badge>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1 text-foreground">
                          False health claim gaining traction in Maharashtra
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Monitored for 6 hours • Predicted reach: 800K+ • Marathi language
                        </p>
                      </div>
                      <Badge className="bg-secondary text-white">Medium Priority</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Verification Queue */}
            <TabsContent value="queue" className="space-y-6">
              <Card className="border-border shadow-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Pending Reviews ({requests.length})
                  </CardTitle>
                  <CardDescription>
                    Content awaiting community verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.length === 0 ? (
                      <div className="text-center py-12">
                        <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                        <p className="text-lg font-semibold text-foreground mb-2">All caught up!</p>
                        <p className="text-muted-foreground">
                          No pending verifications. Great work! 🎉
                        </p>
                      </div>
                    ) : (
                      requests.map((request) => (
                        <Card key={request.id} className="p-4 bg-card border-border hover:border-primary/50 transition-all">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {request.content_type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {request.language}
                                </Badge>
                                {getVerdictIcon(request.final_verdict)}
                              </div>
                              
                              <p className="text-sm text-foreground mb-2 line-clamp-2">
                                {request.content_text || "Media content"}
                              </p>
                              
                              {request.content_url && (
                                <p className="text-xs text-muted-foreground mb-2 truncate">
                                  📎 {request.content_url}
                                </p>
                              )}
                              
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(request.created_at).toLocaleTimeString()}
                                </span>
                                {request.ai_analysis?.confidence && (
                                  <span>
                                    AI Confidence: {Math.round(request.ai_analysis.confidence)}%
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <Button size="sm" className="gradient-accent text-white">
                                Review
                              </Button>
                              <Button size="sm" variant="outline">
                                Skip
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Stats */}
            <TabsContent value="stats" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/20">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Reviewed</p>
                      <p className="text-3xl font-bold text-foreground">{stats.totalReviewed}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +12 this week
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/20 border-accent/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-accent/20">
                      <Target className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                      <p className="text-3xl font-bold text-foreground">{stats.accuracy}%</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Above 90% avg
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary-glow/10 border-secondary/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-secondary/20">
                      <Trophy className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Leaderboard Rank</p>
                      <p className="text-3xl font-bold text-foreground">#{stats.rank}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Top 1% of verifiers
                  </p>
                </Card>
              </div>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Achievements & Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <div className="text-4xl mb-2">🏆</div>
                      <p className="font-semibold text-sm mb-1 text-foreground">Century Club</p>
                      <p className="text-xs text-muted-foreground">100+ reviews</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="text-4xl mb-2">⚡</div>
                      <p className="font-semibold text-sm mb-1 text-foreground">Speed Demon</p>
                      <p className="text-xs text-muted-foreground">&lt;3min avg</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                      <div className="text-4xl mb-2">🎯</div>
                      <p className="font-semibold text-sm mb-1 text-foreground">Accuracy Pro</p>
                      <p className="text-xs text-muted-foreground">90%+ accurate</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted border border-border opacity-50">
                      <div className="text-4xl mb-2">🔒</div>
                      <p className="font-semibold text-sm mb-1 text-muted-foreground">Master Verifier</p>
                      <p className="text-xs text-muted-foreground">500 reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VerifierDashboard;
