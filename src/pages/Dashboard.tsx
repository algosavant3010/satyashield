import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Clock, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { isAdmin, isVerifier } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    fake: 0,
    pending: 0,
  });
  const [recentRequests, setRecentRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!isAdmin && !isVerifier) {
      navigate("/");
      return;
    }
    fetchData();
  }, [user, isAdmin, isVerifier, navigate]);

  const fetchData = async () => {
    // Fetch stats
    const { data: requests } = await supabase
      .from("verification_requests")
      .select("status");

    if (requests) {
      const total = requests.length;
      const verified = requests.filter((r) => r.status === "verified").length;
      const fake = requests.filter((r) => r.status === "fake").length;
      const pending = requests.filter((r) => r.status === "pending").length;
      setStats({ total, verified, fake, pending });
    }

    // Fetch recent requests
    const { data: recent } = await supabase
      .from("verification_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (recent) {
      setRecentRequests(recent);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
    });
    navigate("/");
  };

  const statCards = [
    {
      title: "Total Requests",
      value: stats.total,
      icon: Shield,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Verified Content",
      value: stats.verified,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Fake Detected",
      value: stats.fake,
      icon: AlertTriangle,
      color: "text-danger",
      bgColor: "bg-danger/10",
    },
    {
      title: "Pending Review",
      value: stats.pending,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-success bg-success/10";
      case "fake":
        return "text-danger bg-danger/10";
      case "pending":
        return "text-warning bg-warning/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SatyaShield</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, idx) => (
            <Card key={idx} className="hover:shadow-medium transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Verification Requests
            </CardTitle>
            <CardDescription>
              Latest content submitted for verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No verification requests yet
                </p>
              ) : (
                recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">
                          {request.content_type}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {request.content_text || request.content_url}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(request.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
