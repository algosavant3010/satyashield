import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Clock, LogOut, Search, Users, Activity, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
  const [trendData, setTrendData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
    // Fetch all requests for stats and trends
    const { data: requests } = await supabase
      .from("verification_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (requests) {
      const total = requests.length;
      const verified = requests.filter((r) => r.status === "verified").length;
      const fake = requests.filter((r) => r.status === "fake").length;
      const pending = requests.filter((r) => r.status === "pending").length;
      setStats({ total, verified, fake, pending });

      // Generate trend data (last 7 days)
      const trends = generateTrendData(requests);
      setTrendData(trends);

      // Set recent requests (top 20)
      setRecentRequests(requests.slice(0, 20));
    }
  };

  const generateTrendData = (requests: any[]) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const dayRequests = requests.filter(r => 
        r.created_at.startsWith(date)
      );
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        verified: dayRequests.filter(r => r.status === 'verified').length,
        fake: dayRequests.filter(r => r.status === 'fake').length,
        pending: dayRequests.filter(r => r.status === 'pending').length,
      };
    });
  };

  const filteredRequests = recentRequests.filter(req => {
    const matchesSearch = req.content_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.content_url?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Verification Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  7-Day Trend Analysis
                </CardTitle>
                <CardDescription>
                  Verification activity over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="verified" stroke="hsl(var(--success))" strokeWidth={2} />
                    <Line type="monotone" dataKey="fake" stroke="hsl(var(--danger))" strokeWidth={2} />
                    <Line type="monotone" dataKey="pending" stroke="hsl(var(--warning))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--success))' }} />
                    <span>Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--danger))' }} />
                    <span>Fake</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--warning))' }} />
                    <span>Pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Current verification status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Verified', value: stats.verified, color: 'hsl(var(--success))' },
                        { name: 'Fake', value: stats.fake, color: 'hsl(var(--danger))' },
                        { name: 'Pending', value: stats.pending, color: 'hsl(var(--warning))' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: 'Verified', value: stats.verified, color: 'hsl(var(--success))' },
                        { name: 'Fake', value: stats.fake, color: 'hsl(var(--danger))' },
                        { name: 'Pending', value: stats.pending, color: 'hsl(var(--warning))' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Verification Requests
                </CardTitle>
                <CardDescription>
                  Search and filter verification requests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="fake">Fake</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredRequests.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No verification requests found
                    </p>
                  ) : (
                    filteredRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="capitalize">
                              {request.content_type}
                            </Badge>
                            <Badge
                              className={`${getStatusColor(request.status)}`}
                            >
                              {request.status}
                            </Badge>
                            {request.language && (
                              <Badge variant="secondary">
                                {request.language}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {request.content_text || request.content_url}
                          </p>
                          {request.ai_analysis && (
                            <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                              AI Score: {request.ai_analysis.credibility_score || 'N/A'}
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {new Date(request.created_at).toLocaleString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Type Analysis</CardTitle>
                <CardDescription>Distribution of content types being verified</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { type: 'Text', count: recentRequests.filter(r => r.content_type === 'text').length },
                      { type: 'Image', count: recentRequests.filter(r => r.content_type === 'image').length },
                      { type: 'Video', count: recentRequests.filter(r => r.content_type === 'video').length },
                      { type: 'Audio', count: recentRequests.filter(r => r.content_type === 'audio').length },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
