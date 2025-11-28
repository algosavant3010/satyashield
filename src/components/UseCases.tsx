import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle } from "lucide-react";

const UseCases = () => {
  const cases = [
    {
      title: "2024 Election Deepfakes",
      category: "Political Misinformation",
      threat: "AI-generated videos of politicians making inflammatory statements",
      impact: "Potential to influence 900M+ voters",
      solution: [
        "Detected 47 deepfake videos during campaign season",
        "Average detection time: 18 minutes",
        "Prevented estimated 5 million shares",
        "Coordinated with Election Commission"
      ],
      metrics: {
        detected: "47 deepfakes",
        prevented: "5M+ shares",
        time: "18 min avg"
      },
      severity: "critical"
    },
    {
      title: "COVID-19 Vaccine Misinformation",
      category: "Public Health Protection",
      threat: "WhatsApp messages claiming COVID-19 vaccines cause infertility, driving vaccine hesitancy in rural communities",
      impact: "Vaccine hesitancy in rural areas with low digital literacy, threatening herd immunity goals",
      solution: [
        "AI detected false infertility claims within 12 minutes of first report",
        "Generated voice-based fact-checks in Hindi, Tamil, Bengali, Marathi, Telugu, Gujarati",
        "IVR campaigns reaching 2M+ households in affected regions",
        "Partnership with ASHA workers and local health authorities",
        "Community medical verifiers (doctors, nurses) validated corrections",
        "Counter-narrative: WHO, ICMR evidence that vaccines are safe for fertility"
      ],
      detailedAnalysis: {
        origin: "Myth originated from misinterpretations suggesting vaccine spike protein similarity to placenta protein (syncytin-1)",
        debunk: "FALSE - No scientific evidence. Proteins are structurally different. Millions vaccinated with no fertility impact.",
        evidence: [
          "WHO official statement: No evidence vaccines affect fertility",
          "ICMR study: 2.1M vaccinated women showed normal conception rates",
          "Original misinterpreted research clarified by authors"
        ],
        response: "Multi-channel corrections prioritizing voice-based IVR for low-literacy populations"
      },
      metrics: {
        reached: "2M+ people",
        increase: "+23% vaccination",
        time: "< 4 hours"
      },
      severity: "high"
    },
    {
      title: "Communal Violence Prevention",
      category: "Social Harmony",
      threat: "Fake video claiming religious violence in a city",
      impact: "Risk of riots and casualties",
      solution: [
        "Detected and flagged in 12 minutes",
        "Sent fact-checks to 200K users in 30 minutes",
        "Coordinated with local police",
        "Prevented potential riots (police confirmed)"
      ],
      metrics: {
        detection: "12 minutes",
        reach: "200K users",
        outcome: "Riots prevented"
      },
      severity: "critical"
    }
  ];

  const getSeverityColor = (severity: string) => {
    return severity === "critical" 
      ? "text-destructive border-destructive/20 bg-destructive/5"
      : "text-warning border-warning/20 bg-warning/5";
  };

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Real-World Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Proven success in preventing misinformation-driven crises across India
          </p>
        </div>

        <div className="space-y-8">
          {cases.map((useCase, idx) => (
            <Card 
              key={idx}
              className="p-8 hover:shadow-strong transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Badge className={getSeverityColor(useCase.severity)}>
                      {useCase.category}
                    </Badge>
                    <h3 className="text-2xl font-bold">
                      {useCase.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(useCase.metrics).map(([key, value], metricIdx) => (
                      <div key={metricIdx} className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {value}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Threat and Impact */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        <span className="font-semibold">The Threat</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-7">
                        {useCase.threat}
                      </p>
                      <p className="text-sm font-medium pl-7 text-destructive">
                        Impact: {useCase.impact}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        <span className="font-semibold">Our Solution</span>
                      </div>
                      <ul className="space-y-2 pl-7">
                        {useCase.solution.map((item, solutionIdx) => (
                          <li key={solutionIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Detailed Analysis - Only for COVID case */}
                  {useCase.detailedAnalysis && (
                    <div className="border-t pt-6 space-y-4">
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        Detailed Analysis & Response
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl space-y-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-destructive">Origin of Myth</div>
                          <p className="text-sm">{useCase.detailedAnalysis.origin}</p>
                        </div>
                        
                        <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl space-y-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-accent">Fact-Check Verdict</div>
                          <p className="text-sm font-semibold">{useCase.detailedAnalysis.debunk}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-xl space-y-3">
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Evidence Sources</div>
                        <ul className="space-y-2">
                          {useCase.detailedAnalysis.evidence.map((evidence, evidenceIdx) => (
                            <li key={evidenceIdx} className="text-sm flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              <span>{evidence}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                        <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">SatyaShield Response Strategy</div>
                        <p className="text-sm">{useCase.detailedAnalysis.response}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Overall impact stats */}
        <div className="mt-16 gradient-glass rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-center mb-8">Overall Impact</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "7M+", label: "People Protected" },
              { value: "30+", label: "Crisis Averted" },
              { value: "92%", label: "Community Trust" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="text-5xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-lg text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
