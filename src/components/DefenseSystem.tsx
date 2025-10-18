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

        {/* System flow visualization */}
        <div className="mt-16 p-8 gradient-glass rounded-3xl">
          <h3 className="text-2xl font-bold text-center mb-8">How It Flows</h3>
          <div className="grid md:grid-cols-5 gap-4 items-center">
            {[
              "Content Detected",
              "AI Analysis",
              "Community Vote",
              "Fact-Check Created",
              "Distribution"
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-2">
                  {idx + 1}
                </div>
                <div className="text-sm font-medium">{step}</div>
                {idx < 4 && (
                  <div className="hidden md:block absolute w-full h-0.5 bg-primary/20 top-6 left-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefenseSystem;
