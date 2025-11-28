import { Eye, MessageSquare, TrendingUp, FileText, Send } from "lucide-react";
import { Card } from "@/components/ui/card";

const AIAgents = () => {
  const agents = [
    {
      icon: Eye,
      name: "Visual Deepfake Detector",
      description: "Forensic analysis using convolutional neural networks (CNNs) trained on Indian political figures and cultural contexts",
      technology: "Advanced CNN Architecture + Metadata Forensics",
      capabilities: [
        "AI manipulation marker detection in images/videos",
        "Metadata inconsistency analysis (timestamps, geo-tags)",
        "Trained on 50,000+ Indian political figure samples",
        "Pixel-level artifact detection and noise pattern analysis",
        "Cross-reference with verified media databases"
      ],
      realImpact: "Detected 47 deepfakes during 2024 elections with 18-min avg response time, preventing 5M+ shares",
      accuracy: "94%",
      speed: "< 30 sec",
      color: "primary"
    },
    {
      icon: MessageSquare,
      name: "Multilingual Text Analyzer",
      description: "Advanced NLP models fine-tuned for 6 Indian languages with cultural context understanding",
      technology: "Transformer-based NLP + Cultural Intelligence Engine",
      capabilities: [
        "Sentiment analysis detecting fear-mongering and rage-baiting",
        "Cross-referencing with PIB and verified news databases",
        "Pattern recognition for manipulation templates",
        "Regional idiom and cultural context comprehension",
        "Emotional manipulation detection across Hindi, Tamil, Bengali, Marathi, Telugu, Gujarati"
      ],
      realImpact: "Understands cultural nuances that English-only systems miss, crucial for India's linguistic diversity",
      accuracy: "91%",
      speed: "< 15 sec",
      color: "accent"
    },
    {
      icon: TrendingUp,
      name: "Viral Trend Predictor",
      description: "Machine learning models analyzing forward patterns, engagement velocity, and network topology",
      technology: "Predictive ML + Network Topology Analysis",
      capabilities: [
        "Predicts content virality 12-24 hours before peak spread",
        "Monitors early adoption patterns across platforms",
        "Forward pattern velocity analysis",
        "Network effect modeling and cascade prediction",
        "Proactive intervention enabling (vs reactive damage control)"
      ],
      realImpact: "Strategic advantage: Stop misinformation before it goes viral, not after millions have seen it",
      accuracy: "87%",
      speed: "Real-time",
      color: "secondary"
    },
    {
      icon: FileText,
      name: "Counter-Narrative Generator",
      description: "AI-powered content creation using templates and generative models for culturally appropriate fact-checks",
      technology: "Generative AI + Cultural Localization Engine",
      capabilities: [
        "Creates visual fact-checks in same language as misinformation",
        "Culturally appropriate imagery and messaging",
        "Evidence links: screenshots, timestamps, verified sources",
        "Simple explanations for low-literacy audiences",
        "Multi-format generation (images, videos, text, audio)"
      ],
      realImpact: "Example: River pollution video debunked with original 2018 Ganesh Visarjan footage + metadata proof",
      accuracy: "96%",
      speed: "< 45 sec",
      color: "primary"
    },
    {
      icon: Send,
      name: "Multi-Channel Distribution Agent",
      description: "Precision targeting system reaching users who interacted with original fake content across multiple channels",
      technology: "Cross-Platform Targeting + Amplification Network",
      capabilities: [
        "WhatsApp broadcast to targeted user lists",
        "SMS campaigns for feature phone users",
        "IVR voice calls for low-literacy populations",
        "Partnership network: local influencers, media, community leaders",
        "Impact tracking: monitors correction spread vs original content"
      ],
      realImpact: "Voice-based corrections crucial for rural India where 40% have low digital literacy",
      accuracy: "99%",
      speed: "< 2 min",
      color: "accent"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      primary: {
        text: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/20",
        gradient: "from-primary/5 to-primary/10"
      },
      accent: {
        text: "text-accent",
        bg: "bg-accent/10",
        border: "border-accent/20",
        gradient: "from-accent/5 to-accent/10"
      },
      secondary: {
        text: "text-secondary",
        bg: "bg-secondary/10",
        border: "border-secondary/20",
        gradient: "from-secondary/5 to-secondary/10"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            AI Agent Network
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Five specialized AI agents working in harmony to detect, analyze, and counter misinformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, idx) => {
            const colors = getColorClasses(agent.color);
            return (
              <Card 
                key={idx}
                className="p-6 hover:shadow-strong transition-all duration-300 border-2 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="space-y-4">
                  {/* Icon and title */}
                  <div className="space-y-3">
                    <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                      <agent.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-bold">
                      {agent.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Technology Badge */}
                  <div className={`px-3 py-1.5 rounded-lg ${colors.bg} border ${colors.border} text-xs font-mono`}>
                    {agent.technology}
                  </div>

                  {/* Capabilities */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Key Capabilities
                    </div>
                    <ul className="space-y-1.5">
                      {agent.capabilities.map((capability, capIdx) => (
                        <li key={capIdx} className="text-sm flex items-start gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} mt-1.5 flex-shrink-0`} />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Real Impact */}
                  <div className={`p-3 rounded-lg border-l-4 ${colors.border.replace('/20', '')} bg-muted/50`}>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Real Impact
                    </div>
                    <p className="text-xs leading-relaxed">
                      {agent.realImpact}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className={`grid grid-cols-2 gap-4 pt-4 border-t ${colors.border}`}>
                    <div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                      <div className={`text-lg font-bold ${colors.text}`}>{agent.accuracy}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Speed</div>
                      <div className={`text-lg font-bold ${colors.text}`}>{agent.speed}</div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Technical Specifications */}
        <div className="mt-16 space-y-8">
          <div className="gradient-glass rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Agent Network Architecture</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="text-4xl font-bold text-primary">&lt; 60 sec</div>
                <div className="text-sm font-semibold">Total Analysis Time</div>
                <div className="text-xs text-muted-foreground">All 5 agents working in parallel</div>
              </div>
              <div className="space-y-3">
                <div className="text-4xl font-bold text-accent">24/7</div>
                <div className="text-sm font-semibold">Continuous Monitoring</div>
                <div className="text-xs text-muted-foreground">Real-time detection across platforms</div>
              </div>
              <div className="space-y-3">
                <div className="text-4xl font-bold text-secondary">93%</div>
                <div className="text-sm font-semibold">Overall Accuracy</div>
                <div className="text-xs text-muted-foreground">Combined agent consensus</div>
              </div>
            </div>
          </div>

          <div className="gradient-glass rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Continuous Learning & Improvement</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
              Our AI agents continuously evolve through community feedback loops, learning from every verification to enhance detection accuracy, reduce false positives, and adapt to emerging manipulation techniques
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-sm">
              <div className="p-4 bg-background/50 rounded-xl">
                <div className="font-semibold mb-2">Training Data Growth</div>
                <div className="text-muted-foreground">50,000+ verified samples added monthly from community verifications</div>
              </div>
              <div className="p-4 bg-background/50 rounded-xl">
                <div className="font-semibold mb-2">Adaptive Detection</div>
                <div className="text-muted-foreground">Models retrained weekly to counter new deepfake and manipulation techniques</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgents;
