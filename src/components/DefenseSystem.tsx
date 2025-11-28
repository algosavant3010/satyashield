import { Brain, Users, Zap, Shield } from "lucide-react";

const DefenseSystem = () => {
  const layers = [
    {
      icon: Brain,
      title: "Layer 1: AI Detection",
      subtitle: "Instant Analysis",
      description: "Three specialized AI agents scan content in under 30 seconds",
      features: [
        "Visual Deepfake Detector - Forensic analysis of images/videos",
        "Multilingual Text Analyzer - NLP for 6+ Indian languages",
        "Viral Trend Predictor - Tracks spread across platforms"
      ],
      color: "text-primary",
      bgGradient: "from-primary/10 to-primary-glow/10"
    },
    {
      icon: Users,
      title: "Layer 2: Community Verification",
      subtitle: "Human Intelligence",
      description: "Gamified network of regional volunteers verify flagged content",
      features: [
        "3 regional verifiers review each case",
        "Local experts validate region-specific claims",
        "Consensus reached in 5-10 minutes"
      ],
      color: "text-accent",
      bgGradient: "from-accent/10 to-accent/20"
    },
    {
      icon: Zap,
      title: "Layer 3: Rapid Response",
      subtitle: "Counter-Narrative Distribution",
      description: "AI-generated fact-checks distributed through multiple channels",
      features: [
        "Visual fact-checks in regional languages",
        "WhatsApp, SMS, and IVR distribution",
        "Partnership with local media and influencers"
      ],
      color: "text-secondary",
      bgGradient: "from-secondary/10 to-secondary-glow/10"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            3-Layer Defense System
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A hybrid approach combining AI speed with community wisdom for maximum accuracy
          </p>
        </div>

        <div className="space-y-8">
          {layers.map((layer, idx) => (
            <div 
              key={idx}
              className="gradient-glass rounded-3xl p-8 md:p-12 hover:shadow-strong transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
                {/* Icon section */}
                <div className={`bg-gradient-to-br ${layer.bgGradient} rounded-2xl p-6 w-fit`}>
                  <layer.icon className={`w-12 h-12 ${layer.color}`} />
                </div>

                {/* Content section */}
                <div className="space-y-6">
                  <div>
                    <div className={`text-sm font-semibold ${layer.color} uppercase tracking-wider mb-2`}>
                      {layer.subtitle}
                    </div>
                    <h3 className="text-3xl font-bold mb-3">
                      {layer.title}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {layer.description}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3">
                    {layer.features.map((feature, featureIdx) => (
                      <div 
                        key={featureIdx}
                        className="flex items-start gap-3 p-4 bg-background/50 rounded-xl"
                      >
                        <div className={`w-2 h-2 rounded-full ${layer.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System flow visualization - Enhanced */}
        <div className="mt-16 p-8 md:p-12 gradient-glass rounded-3xl">
          <h3 className="text-2xl font-bold text-center mb-4">Complete Verification Flow</h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            From detection to distribution: Our 3-layer system processes suspicious content in under 15 minutes
          </p>
          
          <div className="space-y-8">
            {/* Timeline */}
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />
              
              <div className="grid md:grid-cols-5 gap-6 relative">
                {[
                  { 
                    step: "Content Detected",
                    time: "0 min",
                    desc: "User reports or AI monitors detect suspicious content",
                    color: "bg-primary"
                  },
                  { 
                    step: "AI Analysis",
                    time: "0-1 min",
                    desc: "5 AI agents scan for deepfakes, manipulation, patterns",
                    color: "bg-primary"
                  },
                  { 
                    step: "Community Vote",
                    time: "5-10 min",
                    desc: "3 regional verifiers review and reach consensus",
                    color: "bg-accent"
                  },
                  { 
                    step: "Fact-Check Created",
                    time: "11-13 min",
                    desc: "AI generates localized counter-narratives with evidence",
                    color: "bg-secondary"
                  },
                  { 
                    step: "Distribution",
                    time: "13-15 min",
                    desc: "Multi-channel reach to users who saw original content",
                    color: "bg-secondary"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="text-center space-y-3 relative">
                    <div className={`w-16 h-16 rounded-2xl ${item.color}/20 text-foreground flex items-center justify-center text-2xl font-bold mx-auto border-4 border-background shadow-medium`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-bold mb-1">{item.step}</div>
                      <div className="text-xs text-primary font-mono font-semibold mb-2">{item.time}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gradient">&lt; 15 min</div>
                <div className="text-sm text-muted-foreground">Average Total Time</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gradient">93% Accuracy</div>
                <div className="text-sm text-muted-foreground">Consensus Rate</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gradient">24/7 Active</div>
                <div className="text-sm text-muted-foreground">Continuous Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefenseSystem;
