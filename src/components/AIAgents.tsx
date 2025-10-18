import { Eye, MessageSquare, TrendingUp, FileText, Send } from "lucide-react";
import { Card } from "@/components/ui/card";

const AIAgents = () => {
  const agents = [
    {
      icon: Eye,
      name: "Visual Deepfake Detector",
      description: "Advanced forensic analysis of images and videos to detect AI manipulation",
      capabilities: [
        "Metadata examination",
        "Pixel-level analysis",
        "AI artifact detection",
        "Cross-reference verification"
      ],
      accuracy: "94%",
      speed: "< 30 sec",
      color: "primary"
    },
    {
      icon: MessageSquare,
      name: "Multilingual Text Analyzer",
      description: "NLP-powered analysis across Hindi, Tamil, Bengali, Marathi, Telugu, Gujarati",
      capabilities: [
        "Sentiment analysis",
        "Emotional manipulation detection",
        "Fact cross-referencing",
        "Source credibility check"
      ],
      accuracy: "91%",
      speed: "< 15 sec",
      color: "accent"
    },
    {
      icon: TrendingUp,
      name: "Viral Trend Predictor",
      description: "Predictive analytics to identify potential viral misinformation 12-24 hours early",
      capabilities: [
        "Social media monitoring",
        "Spread pattern analysis",
        "Network effect modeling",
        "Early warning alerts"
      ],
      accuracy: "87%",
      speed: "Real-time",
      color: "secondary"
    },
    {
      icon: FileText,
      name: "Counter-Narrative Generator",
      description: "AI-powered fact-check creation in regional languages with visual assets",
      capabilities: [
        "Simplified explanations",
        "Visual fact-check design",
        "Multi-format generation",
        "Language localization"
      ],
      accuracy: "96%",
      speed: "< 45 sec",
      color: "primary"
    },
    {
      icon: Send,
      name: "Distribution Agent",
      description: "Multi-channel distribution system targeting users who saw original content",
      capabilities: [
        "WhatsApp integration",
        "SMS campaigns",
        "IVR calls",
        "Social media posts"
      ],
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

                  {/* Capabilities */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Key Capabilities
                    </div>
                    <ul className="space-y-1">
                      {agent.capabilities.map((capability, capIdx) => (
                        <li key={capIdx} className="text-sm flex items-start gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} mt-1.5 flex-shrink-0`} />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
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

        {/* Additional info */}
        <div className="mt-16 gradient-glass rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Continuous Learning</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI agents improve through community feedback, learning from every verification to enhance detection accuracy and reduce false positives
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIAgents;
