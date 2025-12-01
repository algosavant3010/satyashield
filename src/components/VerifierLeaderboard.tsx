import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Target, Flame } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

interface VerifierStat {
  id: string;
  user_id: string;
  total_reviews: number;
  correct_votes: number;
  accuracy_percentage: number;
  total_points: number;
  rank: number;
  current_streak: number;
  longest_streak: number;
  badges: Json;
  profiles?: {
    full_name: string;
  };
}

export const VerifierLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<VerifierStat[]>([]);
  const [userStats, setUserStats] = useState<VerifierStat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
    fetchUserStats();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('verifier_stats')
        .select('*')
        .order('total_points', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      // Fetch profile names separately
      if (data && data.length > 0) {
        const userIds = data.map(v => v.user_id);
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds);
        
        // Merge profile data
        const enrichedData = data.map(stat => ({
          ...stat,
          profiles: profiles?.find(p => p.id === stat.user_id)
        }));
        
        setLeaderboard(enrichedData);
      } else {
        setLeaderboard([]);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('verifier_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        // Fetch profile name
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        setUserStats({ ...data, profiles: profile });
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Loading leaderboard...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Stats Card */}
      {userStats && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Your Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{userStats.total_points}</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">{userStats.total_reviews}</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">{userStats.accuracy_percentage}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 flex items-center justify-center gap-1">
                  <Flame className="h-6 w-6" />
                  {userStats.current_streak}
                </div>
                <div className="text-sm text-muted-foreground">Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top Verifiers
          </CardTitle>
          <CardDescription>
            Champions of truth - earn points by accurately verifying content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((verifier, index) => (
              <div
                key={verifier.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  index < 3
                    ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20'
                    : 'bg-card/50 border-border'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold w-12 text-center">
                    {getRankEmoji(index + 1)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {verifier.profiles?.full_name || 'Anonymous Verifier'}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>{verifier.total_reviews} reviews</span>
                      <span>•</span>
                      <span className="text-green-500">{verifier.accuracy_percentage}% accuracy</span>
                      {verifier.current_streak > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-orange-500">
                            <Flame className="h-3 w-3" />
                            {verifier.current_streak} streak
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-lg">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {verifier.total_points}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {leaderboard.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No verifiers yet. Be the first to start earning points!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gamification Info */}
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-lg">🎮 How to Earn Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-500">✅</span>
            <div>
              <strong>Correct Vote:</strong> Earn points based on your confidence (up to 10 points for 100% confidence)
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500">❌</span>
            <div>
              <strong>Incorrect Vote:</strong> -5 points (learn from mistakes!)
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-500">🔥</span>
            <div>
              <strong>Build Streaks:</strong> Consecutive correct votes boost your reputation
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-500">🏆</span>
            <div>
              <strong>Earn Badges:</strong> Unlock achievements for milestones (coming soon!)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
