import { Shield, Mail, Twitter, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const links = {
    product: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "AI Agents", href: "#ai-agents" },
      { label: "Try Demo", href: "#chatbot" },
      { label: "Use Cases", href: "#use-cases" }
    ],
    community: [
      { label: "Become a Verifier", href: "#community" },
      { label: "Training Program", href: "#" },
      { label: "Leaderboard", href: "#" },
      { label: "Success Stories", href: "#" }
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "API Access", href: "#" },
      { label: "Research Papers", href: "#" },
      { label: "Media Kit", href: "#" }
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Partnerships", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" }
    ]
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">SatyaShield</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Community-powered AI platform defending India against misinformation through intelligent detection, verification, and rapid response.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "mailto:contact@satyashield.org" }
              ].map((social, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 capitalize">{category}</h3>
              <ul className="space-y-3">
                {items.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>
              © 2025 SatyaShield. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
