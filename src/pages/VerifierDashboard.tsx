import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, ListChecks, Trophy } from "lucide-react";
import { VerificationQueue } from "@/components/VerificationQueue";
import { VerifierLeaderboard } from "@/components/VerifierLeaderboard";

const VerifierDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-slide-up">
            <Badge className="mb-4 gradient-accent text-white border-0">
              <Shield className="h-3 w-3 mr-1 inline" />
              Community Verification Network
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Verifier Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Help combat misinformation by reviewing flagged content. Earn points, build your reputation, and make a difference.
            </p>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="queue" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="queue" className="text-base">
                <ListChecks className="h-4 w-4 mr-2" />
                Verification Queue
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="text-base">
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard & Stats
              </TabsTrigger>
            </TabsList>

            <TabsContent value="queue">
              <VerificationQueue />
            </TabsContent>

            <TabsContent value="leaderboard">
              <VerifierLeaderboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VerifierDashboard;
