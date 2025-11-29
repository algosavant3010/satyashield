import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  TrendingUp, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Target,
  Brain,
  Network
} from "lucide-react";

const Index = () => {
  const stats = [
    { value: "47", label: "Deepfakes Detected", icon: Eye },
    { value: "5M+", label: "Shares Prevented", icon: Shield },
    { value: "18min", label: "Avg Response Time", icon: Clock },
    { value: "1000+", label: "Active Verifiers", icon: Users },
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "5 specialized AI agents analyzing visual deepfakes, multilingual text, and viral patterns in real-time",
      gradient: "from-primary via-primary-glow to-primary"
    },
    {
      icon: Globe,
      title: "Multilingual Analysis",
      description: "Native support for 6 Indian languages - Hindi, Tamil, Bengali, Marathi, Telugu, Gujarati",
      gradient: "from-secondary via-secondary-glow to-secondary"
    },
    {
      icon: Users,
      title: "Community Verification",
      description: "1000+ trained verifiers providing human oversight with gamified quality assurance",
      gradient: "from-accent to-green-500"
    },
    {
      icon: Zap,
      title: "Real-Time Heatmap",
      description: "Geographic visualization of misinformation spread across India with predictive analytics",
      gradient: "from-warning to-yellow-500"
    }
  ];

  const useCases = [
    {
      title: "Public Health Protection",
      problem: "COVID vaccine misinfo spreading in rural areas",
      solution: "Detected & countered within 18 minutes",
      impact: "Prevented 2M+ false message forwards",
      icon: Shield
    },
    {
      title: "Election Integrity",
      problem: "47 deepfakes of political figures detected",
      solution: "Multi-language fact-checks distributed",
      impact: "Reached 5M+ voters before virality",
      icon: AlertTriangle
    },
    {
      title: "Financial Fraud Prevention",
      problem: "Fake bank notices causing panic",
      solution: "Source verification in under 5 minutes",
      impact: "Protected 500K+ potential victims",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="max-w-7xl mx-auto text-center animate-slide-up">
          <Badge className="mb-6 gradient-accent text-white border-0 shadow-accent-glow px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 mr-2 inline" />
            India's First AI-Powered Misinformation Defense
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Illuminate the Truth,
            </span>
            <br />
            <span className="text-foreground">Extinguish the Fake</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Combat India's multilingual misinformation crisis with AI agents + community intelligence. 
            <span className="text-foreground font-semibold"> Detect, verify, and counter fake content</span> in 6 regional languages.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/detect">
              <Button size="lg" className="gradient-accent text-white px-8 py-6 text-lg shadow-accent-glow hover:shadow-2xl hover:scale-105 transition-all">
                Analyze Content Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-border hover:border-primary hover:bg-primary/5">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all hover:shadow-glow group">
                <stat.icon className="h-8 w-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Target className="h-3 w-3 mr-1 inline" />
              3-Layer Defense System
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              How SatyaShield Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionary combination of AI intelligence and human verification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card 
                key={idx} 
                className="p-8 bg-card border-border hover:border-primary/50 transition-all hover:shadow-glow group cursor-pointer"
              >
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform shadow-strong`}>
                  <feature.icon className="h-full w-full text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <CheckCircle className="h-3 w-3 mr-1 inline" />
              Real-World Impact
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Proven Results Across India
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how SatyaShield protects communities from misinformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <Card key={idx} className="p-8 bg-card border-border hover:border-accent/50 transition-all hover:shadow-glow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-accent/10">
                    <useCase.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{useCase.title}</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-destructive font-semibold mb-1">⚠️ Problem:</p>
                    <p className="text-muted-foreground">{useCase.problem}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-primary font-semibold mb-1">✓ Solution:</p>
                    <p className="text-muted-foreground">{useCase.solution}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-accent font-bold text-lg">{useCase.impact}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why SatyaShield Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Why SatyaShield is the Best Solution
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-card border-border">
              <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                <Network className="h-8 w-8 text-primary" />
                Traditional Fact-Checkers
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-destructive mt-1">✗</span>
                  <span className="text-muted-foreground">24+ hours response time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive mt-1">✗</span>
                  <span className="text-muted-foreground">English-only or limited languages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive mt-1">✗</span>
                  <span className="text-muted-foreground">Centralized, slow scaling</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive mt-1">✗</span>
                  <span className="text-muted-foreground">Reactive, not predictive</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-glow">
              <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                SatyaShield Advantage
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span className="text-foreground font-medium">5-10 minutes verification with AI + community</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span className="text-foreground font-medium">6 Indian languages natively supported</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span className="text-foreground font-medium">Distributed network of 1000+ verifiers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span className="text-foreground font-medium">Predicts viral misinformation 12-24 hours early</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span className="text-foreground font-medium">Real-time geographic heatmap tracking</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to Join the Fight Against Misinformation?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start with our free tier and scale as you grow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/sign-up">
                <Button size="lg" className="gradient-accent text-white px-8 py-6 text-lg shadow-accent-glow hover:shadow-2xl">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/detect">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2">
                  Try Detection Now
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">SatyaShield</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Illuminate the Truth, Extinguish the Fake
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 SatyaShield. All rights reserved. | Built for India's multilingual digital safety
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
