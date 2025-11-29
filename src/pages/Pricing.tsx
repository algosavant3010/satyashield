import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Community",
      price: "Free",
      description: "Perfect for individuals and small-scale verification",
      icon: Zap,
      gradient: "from-muted to-muted",
      features: [
        "5 media verifications per month",
        "20 chat verifications per month",
        "Basic AI analysis",
        "Community verification access",
        "Email support",
        "Standard processing speed"
      ],
      limitations: [
        "No API access",
        "No bulk uploads",
        "No priority support"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      description: "For journalists, researchers, and content creators",
      icon: Sparkles,
      gradient: "from-primary via-primary-glow to-primary",
      features: [
        "100 media verifications per month",
        "Unlimited chat verifications",
        "Advanced AI analysis with confidence scores",
        "Priority community verification",
        "Real-time heatmap access",
        "API access (1000 calls/month)",
        "Bulk upload (up to 10 files)",
        "Priority email + chat support",
        "Custom reports and analytics",
        "Viral trend predictions"
      ],
      limitations: [],
      cta: "Start 14-Day Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations, media houses, and government bodies",
      icon: Crown,
      gradient: "from-accent to-green-500",
      features: [
        "Unlimited media verifications",
        "Unlimited chat verifications",
        "Enterprise-grade AI analysis",
        "Dedicated verification team",
        "Full heatmap access with custom regions",
        "Unlimited API access",
        "Unlimited bulk uploads",
        "White-label options",
        "Dedicated account manager",
        "24/7 phone + email support",
        "Custom integrations (WhatsApp, Slack, etc.)",
        "SLA guarantees",
        "Training for your team",
        "Custom AI model fine-tuning"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How does the verification process work?",
      answer: "Content is first analyzed by our 5 AI agents (deepfake detector, multilingual text analyzer, viral predictor, etc.), then reviewed by 3 independent community verifiers from your region. Results are typically ready in 5-10 minutes."
    },
    {
      question: "What languages are supported?",
      answer: "We natively support 6 Indian languages: Hindi, Tamil, Bengali, Marathi, Telugu, and Gujarati. Our AI models are specifically trained on regional contexts and idioms that English-only systems miss."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes! You can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the start of your next billing cycle. Unused credits don't roll over."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact us within 14 days of purchase for a full refund, no questions asked."
    },
    {
      question: "How accurate is your AI detection?",
      answer: "Our system achieves 95%+ accuracy on deepfake detection and 92%+ on text misinformation. The hybrid AI + human verification model prevents false positives that plague automated-only systems."
    },
    {
      question: "Do you offer discounts for NGOs or educational institutions?",
      answer: "Yes! We provide 50% discounts for registered non-profits, educational institutions, and fact-checking organizations. Contact sales@satyashield.com with your credentials."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-up">
            <Badge className="mb-4 gradient-accent text-white border-0 shadow-accent-glow">
              <Sparkles className="h-3 w-3 mr-1 inline" />
              Freemium Pricing Model
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free, scale as you grow. All plans include AI + community verification.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, idx) => (
              <Card 
                key={idx}
                className={`relative overflow-hidden transition-all hover:shadow-glow ${
                  plan.popular 
                    ? "border-primary shadow-glow scale-105" 
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-primary via-primary-glow to-primary text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`inline-flex mx-auto p-4 rounded-2xl bg-gradient-to-br ${plan.gradient} mb-4`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-3">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, i) => (
                      <div key={i} className="flex items-start gap-3 opacity-50">
                        <span className="text-muted-foreground text-sm">✗ {limitation}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={plan.name === "Community" ? "/auth/sign-up" : "/auth/sign-up"}>
                    <Button 
                      className={`w-full py-6 text-base ${
                        plan.popular 
                          ? "gradient-accent text-white shadow-accent-glow hover:shadow-2xl" 
                          : "bg-card hover:bg-muted text-foreground border border-border"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enterprise Features Highlight */}
          <Card className="mb-20 p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 text-foreground">Need Custom Solutions?</h2>
              <p className="text-lg text-muted-foreground">
                Enterprise plan includes dedicated support and custom integrations
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🔧</div>
                <h3 className="font-semibold mb-1 text-foreground">Custom API</h3>
                <p className="text-sm text-muted-foreground">Integrate with your existing systems</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎓</div>
                <h3 className="font-semibold mb-1 text-foreground">Team Training</h3>
                <p className="text-sm text-muted-foreground">On-site or remote workshops</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <h3 className="font-semibold mb-1 text-foreground">White-Label</h3>
                <p className="text-sm text-muted-foreground">Branded verification portal</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-semibold mb-1 text-foreground">SLA Guarantees</h3>
                <p className="text-sm text-muted-foreground">99.9% uptime commitment</p>
              </div>
            </div>
          </Card>

          {/* FAQs */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {faqs.map((faq, idx) => (
                <Card key={idx} className="p-6 bg-card border-border hover:border-primary/50 transition-all">
                  <h3 className="font-bold text-lg mb-3 text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <Card className="p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-glow max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Still have questions?
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Our team is here to help you choose the right plan
              </p>
              <Button size="lg" className="gradient-accent text-white px-8 py-6 text-lg shadow-accent-glow">
                Contact Sales
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
