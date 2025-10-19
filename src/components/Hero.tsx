import { Button } from "@/components/ui/button";
import { Shield, ChevronRight } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-glow/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-slide-up">
          {/* Shield icon with glow effect */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl animate-pulse-slow" />
              <Shield className="w-24 h-24 text-accent relative" strokeWidth={1.5} />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            SatyaShield
            <span className="block text-gradient mt-2">
              Truth Prevails Over Misinformation
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            SatyaShield combines advanced AI detection with community verification to stop misinformation before it spreads across India's 410 million WhatsApp users
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { value: "47", label: "Deepfakes Detected", suffix: "+" },
              { value: "18", label: "Minutes Avg Response", suffix: " min" },
              { value: "5M", label: "Shares Prevented", suffix: "+" },
              { value: "68%", label: "Users Rely on WhatsApp", suffix: "" },
            ].map((stat, idx) => (
              <div key={idx} className="gradient-glass rounded-2xl p-6 backdrop-blur-lg">
                <div className="text-3xl md:text-4xl font-bold text-accent">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-white/70 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="gradient-accent text-white border-0 hover:opacity-90 shadow-accent-glow text-lg px-8 py-6"
              onClick={() => scrollToSection('chatbot')}
            >
              Try AI Verification
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm text-lg px-8 py-6"
              onClick={() => scrollToSection('how-it-works')}
            >
              Learn How It Works
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 flex flex-wrap justify-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Community Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Multi-Language Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Real-time Detection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
