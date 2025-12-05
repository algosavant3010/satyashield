import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { Shield, Menu, LogOut } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin, isVerifier, loading: isLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Detect", href: "/detect" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-[0_0_30px_hsla(270,100%,70%,0.5)] transition-all">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">
              SatyaShield
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </Link>
            ))}
            {!isLoading && isAdmin && (
              <Link
                to="/dashboard"
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                Admin
              </Link>
            )}
            {!isLoading && (isVerifier || isAdmin) && (
              <Link
                to="/verifier-dashboard"
                className="px-4 py-2 text-primary hover:text-primary/80 transition-colors rounded-lg hover:bg-primary/10"
              >
                Verifier Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="border-border hover:border-primary/50 hover:bg-primary/5"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/sign-up">
                  <Button className="gradient-primary text-primary-foreground shadow-glow hover:shadow-[0_0_40px_hsla(270,100%,70%,0.4)]">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-background border-border">
              <div className="flex flex-col h-full pt-8">
                <div className="flex-1 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-lg text-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {!isLoading && isAdmin && (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-lg text-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {!isLoading && (isVerifier || isAdmin) && (
                    <Link
                      to="/verifier-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-lg text-primary hover:text-primary/80 transition-colors rounded-lg hover:bg-primary/10"
                    >
                      Verifier Dashboard
                    </Link>
                  )}
                </div>
                
                <div className="pt-8 border-t border-border space-y-3">
                  {user ? (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth/sign-up" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full gradient-primary text-primary-foreground">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
