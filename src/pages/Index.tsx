import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  Network,
  Play,
  ChevronRight,
  Star,
  Quote,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Cpu,
  Lock,
  BarChart3,
  Languages,
  Fingerprint,
  Activity
} from "lucide-react";

// Scroll animation hook
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const Index = () => {
  const [email, setEmail] = useState("");

  const stats = [
    { value: "47+", label: "Deepfakes Detected", icon: Eye },
    { value: "5M+", label: "Shares Prevented", icon: Shield },
    { value: "18min", label: "Avg Response Time", icon: Clock },
    { value: "1000+", label: "Active Verifiers", icon: Users },
  ];

  const features = [
    {
      icon: Brain,
      title: "Neural Deepfake Detection",
      description: "Advanced CNN-based visual forensics analyzing facial inconsistencies, lighting artifacts, and temporal anomalies in real-time.",
    },
    {
      icon: Languages,
      title: "6-Language NLP Engine",
      description: "Native support for Hindi, Tamil, Bengali, Marathi, Telugu, and Gujarati with cultural context understanding.",
    },
    {
      icon: TrendingUp,
      title: "Viral Prediction AI",
      description: "Machine learning models predict misinformation virality 12-24 hours before it spreads.",
    },
    {
      icon: Users,
      title: "Community Intelligence",
      description: "1000+ trained verifiers providing human oversight with gamified quality assurance.",
    },
    {
      icon: Activity,
      title: "Real-Time Heatmap",
      description: "Geographic visualization tracking misinformation spread patterns across India.",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "End-to-end encryption with SOC 2 compliance for organizational deployments.",
    },
  ];

  const specs = [
    { label: "Detection Accuracy", value: "98.7%", icon: Target },
    { label: "Languages Supported", value: "6", icon: Globe },
    { label: "Avg. Response Time", value: "18 min", icon: Zap },
    { label: "Active Verifiers", value: "1,000+", icon: Users },
    { label: "API Uptime", value: "99.9%", icon: BarChart3 },
    { label: "Daily Scans", value: "50K+", icon: Cpu },
  ];

  const testimonials = [
    {
      quote: "SatyaShield caught 23 deepfakes during our election coverage that would have taken us days to verify manually.",
      author: "Priya Sharma",
      role: "News Editor, Digital Times India",
      avatar: "PS"
    },
    {
      quote: "The multilingual analysis is incredible. It understands regional nuances that other tools completely miss.",
      author: "Rajesh Kumar",
      role: "Fact-Check Lead, Truth Foundation",
      avatar: "RK"
    },
    {
      quote: "We've prevented an estimated 2M+ false forwards in rural areas using SatyaShield's WhatsApp integration.",
      author: "Dr. Anita Desai",
      role: "Public Health Director",
      avatar: "AD"
    },
  ];

  const useCases = [
    {
      title: "Public Health Protection",
      description: "Combat vaccine misinformation and health hoaxes spreading in rural communities.",
      stats: "2M+ false forwards prevented",
      image: "🏥"
    },
    {
      title: "Election Integrity",
      description: "Detect political deepfakes and manufactured content before they go viral.",
      stats: "47 deepfakes caught",
      image: "🗳️"
    },
    {
      title: "Financial Fraud Prevention",
      description: "Identify fake bank notices, UPI scams, and investment frauds instantly.",
      stats: "500K+ users protected",
      image: "💰"
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section - Full Bleed */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] animate-pulse-slow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center">
          <div className="animate-slide-up">
            <Badge className="mb-8 gradient-accent text-foreground border-0 px-6 py-2.5 text-sm font-medium shadow-cyan-glow">
              <Sparkles className="h-4 w-4 mr-2" />
              India's First AI-Powered Misinformation Defense
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[1.1] animate-slide-up delay-100">
            <span className="text-gradient">Illuminate</span> the Truth,
            <br />
            <span className="text-foreground">Extinguish the Fake</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200">
            Combat India's multilingual misinformation crisis with 5 specialized AI agents + 
            community intelligence. Detect, verify, and counter fake content in 6 regional languages.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up delay-300">
            <Link to="/detect">
              <Button size="lg" className="gradient-primary text-primary-foreground px-10 py-7 text-lg font-semibold shadow-glow hover:shadow-[0_0_80px_hsla(270,100%,70%,0.5)] hover:scale-105 transition-all duration-300 group">
                Start Analyzing Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-10 py-7 text-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 group">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto animate-slide-up delay-400">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6 gradient-glass hover:border-primary/30 transition-all duration-300 hover-lift group">
                <stat.icon className="h-8 w-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-2.5 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <ProductOverview />

      {/* Specs Section */}
      <SpecsSection specs={specs} />

      {/* Features Deep Dive */}
      <FeaturesDeepDive features={features} />

      {/* Use Cases Showcase */}
      <UseCasesShowcase useCases={useCases} />

      {/* Benefits Grid */}
      <BenefitsGrid />

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Newsletter */}
      <NewsletterSection email={email} setEmail={setEmail} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Product Overview Component
const ProductOverview = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      <div className={`max-w-7xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              <Target className="h-3 w-3 mr-2" />
              3-Layer Defense System
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              AI Agents + Human Verification = <span className="text-gradient">Unbeatable Defense</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              SatyaShield combines 5 specialized AI agents with a network of 1000+ trained community verifiers. 
              Our hybrid approach catches misinformation that pure AI or human-only systems miss.
            </p>
            
            <div className="space-y-4">
              {[
                "Visual deepfake detection with 98.7% accuracy",
                "Multilingual analysis in 6 Indian languages",
                "Viral prediction 12-24 hours ahead",
                "Community verification in under 18 minutes"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full gradient-accent flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-foreground" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 gradient-glass rounded-3xl p-8 border-gradient">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Brain, label: "Deepfake AI", status: "Active" },
                  { icon: Languages, label: "NLP Engine", status: "6 Languages" },
                  { icon: TrendingUp, label: "Viral Predictor", status: "Monitoring" },
                  { icon: Users, label: "Verifiers", status: "1,247 Online" },
                ].map((item, idx) => (
                  <Card key={idx} className="p-4 bg-background/50 border-border/50 hover:border-primary/30 transition-all">
                    <item.icon className="h-8 w-8 text-primary mb-2" />
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.status}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Specs Section
const SpecsSection = ({ specs }: { specs: any[] }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section ref={ref} className="py-24 px-4 bg-card/30">
      <div className={`max-w-7xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="text-gradient">Specifications</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade performance metrics
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specs.map((spec, idx) => (
            <Card key={idx} className="p-6 text-center gradient-glass hover:border-primary/30 transition-all hover-lift">
              <spec.icon className="h-8 w-8 text-secondary mx-auto mb-3" />
              <div className="text-3xl font-display font-bold text-foreground mb-1">{spec.value}</div>
              <div className="text-sm text-muted-foreground">{spec.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Deep Dive
const FeaturesDeepDive = ({ features }: { features: any[] }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section ref={ref} className="py-32 px-4 relative">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      <div className={`max-w-7xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20 px-4 py-1.5">
            <Cpu className="h-3 w-3 mr-2" />
            Advanced Capabilities
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Powered by <span className="text-gradient">5 AI Agents</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each agent specializes in a critical aspect of misinformation detection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card 
              key={idx} 
              className="p-8 gradient-glass border-gradient hover:border-primary/40 transition-all duration-500 hover-lift group"
            >
              <div className="h-14 w-14 rounded-2xl gradient-primary p-3 mb-6 shadow-glow group-hover:scale-110 transition-transform">
                <feature.icon className="h-full w-full text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
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
  );
};

// Use Cases Showcase
const UseCasesShowcase = ({ useCases }: { useCases: any[] }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section ref={ref} className="py-32 px-4 bg-card/30">
      <div className={`max-w-7xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 px-4 py-1.5">
            <CheckCircle className="h-3 w-3 mr-2" />
            Real-World Impact
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Protecting India, <span className="text-gradient">One Truth at a Time</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, idx) => (
            <Card key={idx} className="overflow-hidden gradient-glass border-gradient hover-lift group">
              <div className="h-48 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                <span className="text-8xl">{useCase.image}</span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {useCase.description}
                </p>
                <div className="flex items-center gap-2 text-secondary font-semibold">
                  <TrendingUp className="h-5 w-5" />
                  {useCase.stats}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefits Grid
const BenefitsGrid = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const benefits = [
    { icon: Zap, title: "Lightning Fast", description: "18-minute average verification vs 24+ hours" },
    { icon: Globe, title: "Multilingual", description: "6 Indian languages natively supported" },
    { icon: Shield, title: "99.9% Uptime", description: "Enterprise-grade reliability" },
    { icon: Lock, title: "Secure", description: "End-to-end encryption, SOC 2 compliant" },
    { icon: BarChart3, title: "Analytics", description: "Real-time dashboards and reporting" },
    { icon: Fingerprint, title: "Accurate", description: "98.7% deepfake detection accuracy" },
    { icon: Network, title: "Scalable", description: "From 100 to 10M+ requests" },
    { icon: Users, title: "Community", description: "1000+ trained verifiers" },
  ];

  return (
    <section ref={ref} className="py-32 px-4 relative">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      <div className={`max-w-7xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Why Choose <span className="text-gradient">SatyaShield</span>?
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <Card key={idx} className="p-6 text-center gradient-glass hover:border-primary/30 transition-all hover-lift group">
              <div className="h-12 w-12 rounded-xl gradient-accent mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <benefit.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-display font-bold mb-2 text-foreground">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = ({ testimonials }: { testimonials: any[] }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section ref={ref} className="py-32 px-4 bg-card/30">
      <div className={`max-w-7xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
            <Star className="h-3 w-3 mr-2" />
            Trusted by Leaders
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            What Our Users Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="p-8 gradient-glass border-gradient hover-lift">
              <Quote className="h-10 w-10 text-primary/30 mb-4" />
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center font-bold text-primary-foreground">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
const NewsletterSection = ({ email, setEmail }: { email: string; setEmail: (v: string) => void }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      
      <div className={`max-w-4xl mx-auto text-center relative z-10 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <Card className="p-12 md:p-16 gradient-glass border-gradient shadow-glow">
          <Mail className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Stay Ahead of Misinformation
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get weekly insights on emerging misinformation trends and how to combat them.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input 
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 px-6 bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button size="lg" className="gradient-primary text-primary-foreground h-14 px-8 shadow-glow hover:shadow-[0_0_60px_hsla(270,100%,70%,0.4)]">
              Subscribe
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </Card>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="py-16 px-4 border-t border-border bg-card/30">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-5 gap-12 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold">SatyaShield</span>
          </div>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Illuminate the Truth, Extinguish the Fake. India's first AI-powered misinformation defense platform.
          </p>
          <div className="flex gap-4">
            {[Twitter, Linkedin, Github, Instagram].map((Icon, idx) => (
              <a key={idx} href="#" className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        
        {/* Links */}
        {[
          { title: "Product", links: ["Features", "Pricing", "API Docs", "Integrations"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
          { title: "Legal", links: ["Privacy", "Terms", "Security", "Compliance"] },
        ].map((column, idx) => (
          <div key={idx}>
            <h4 className="font-display font-bold mb-4 text-foreground">{column.title}</h4>
            <ul className="space-y-3">
              {column.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © 2024 SatyaShield. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Built for India's multilingual digital safety 🇮🇳
        </p>
      </div>
    </div>
  </footer>
);

export default Index;
