import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Target, TrendingUp } from "lucide-react";

const CommunitySection = () => {
  const benefits = [
    {
      icon: Award,
      title: "Recognition & Rewards",
      description: "Earn certificates, badges, and recognition for your contributions to fighting misinformation"
    },
    {
      icon: Target,
      title: "Make Real Impact",
      description: "Your verifications directly prevent fake news from spreading and protect communities"
    },
    {
      icon: TrendingUp,
      title: "Skill Development",
      description: "Learn fact-checking techniques, digital literacy, and critical thinking skills"
    },
    {
      icon: Users,
      title: "Join a Movement",
      description: "Connect with journalists, students, and citizens united against misinformation"
    }
  ];

  const stats = [
    { value: "5,000+", label: "Active Verifiers", desc: "Growing network across India" },
    { value: "28", label: "States Covered", desc: "Multilingual reach" },
    { value: "5-10 min", label: "Avg Verification", desc: "Rapid community consensus" },
    { value: "95%", label: "Consensus Rate", desc: "High-quality verifications" }
  ];

  const requirements = [
    "Fluent in at least one Indian regional language",
    "Basic digital literacy and internet access",
    "Commitment to accuracy and objectivity",
    "Available for 2-3 hours per week minimum"
  ];

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-accent/10 text-accent border-accent/20">
            Join the Movement
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Become a Community Verifier
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help protect India from misinformation. Join our network of volunteers making a real difference
          </p>
        </div>

        {/* Stats grid - Enhanced */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="gradient-glass rounded-2xl p-6 text-center animate-slide-up space-y-2"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* How CVN Works - New Section */}
        <div className="mb-16 gradient-glass rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-8 text-center">How Community Verification Works</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h4 className="font-bold text-lg">AI Pre-Screening</h4>
              <p className="text-sm text-muted-foreground">
                AI agents flag suspicious content and route it based on language and region to appropriate verifiers
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h4 className="font-bold text-lg">Multi-Verifier Assignment</h4>
              <p className="text-sm text-muted-foreground">
                3 independent volunteers from relevant region receive content with standardized checklist: source credibility, fact cross-reference, visual inconsistencies
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h4 className="font-bold text-lg">Consensus & Quality</h4>
              <p className="text-sm text-muted-foreground">
                Votes tallied (Real/Fake/Needs Expert). High-reputation verifiers' votes carry more weight. Complex cases escalated to regional experts
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold mb-2">Quality Assurance System</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Performance tracked over time; low-quality verifiers flagged for retraining</p>
                  <p>• Regional experts (journalists, academics) serve as final arbiters for complex cases</p>
                  <p>• Training modules on fact-checking techniques required for all new verifiers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {benefits.map((benefit, idx) => (
            <Card 
              key={idx}
              className="p-6 hover:shadow-medium transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Requirements and CTA */}
        <div className="gradient-glass rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Requirements</h3>
              <ul className="space-y-3">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <div>
                <h3 className="text-3xl font-bold mb-3">
                  Ready to Make a Difference?
                </h3>
                <p className="text-muted-foreground">
                  Join thousands of volunteers protecting communities from misinformation
                </p>
              </div>
              <Button 
                size="lg"
                className="gradient-accent text-white hover:opacity-90 shadow-accent-glow w-full md:w-auto"
              >
                Apply to Become a Verifier
              </Button>
              <p className="text-sm text-muted-foreground">
                Training provided • Flexible schedule • Make real impact
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <Card className="mt-12 p-8 border-l-4 border-l-accent">
          <div className="space-y-4">
            <p className="text-lg italic">
              "Being a SatyaShield verifier has been incredibly rewarding. I've helped prevent several instances of misinformation in my community and gained valuable fact-checking skills."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20" />
              <div>
                <div className="font-semibold">Priya Sharma</div>
                <div className="text-sm text-muted-foreground">Community Verifier, Mumbai</div>
              </div>
              <Badge className="ml-auto bg-accent/10 text-accent border-accent/20">
                Top Contributor 2024
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CommunitySection;
