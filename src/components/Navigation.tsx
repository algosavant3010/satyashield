import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { Shield, Menu, X, LogOut } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin, isVerifier } = useUserRole();
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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-medium" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              SatyaShield
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Home
              </Button>
            </Link>
            <Link to="/detect">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Detect
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Pricing
              </Button>
            </Link>
            
            {user && (isAdmin || isVerifier) && (
              <>
                {isAdmin && (
                  <Link to="/dashboard">
                    <Button variant="ghost" className="text-foreground hover:text-primary">
                      Admin
                    </Button>
                  </Link>
                )}
                {isVerifier && (
                  <Link to="/verifier-dashboard">
                    <Button variant="ghost" className="text-foreground hover:text-primary">
                      Verifier
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <Button 
                onClick={handleSignOut}
                variant="outline"
                className="border-border hover:border-primary hover:text-primary"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Log In
                  </Button>
                </Link>
                <Link to="/auth/sign-up">
                  <Button className="gradient-accent text-white hover:opacity-90 shadow-accent-glow">
                    Sign Up Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-strong">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-foreground">
                Home
              </Button>
            </Link>
            <Link to="/detect" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-foreground">
                Detect
              </Button>
            </Link>
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-foreground">
                Pricing
              </Button>
            </Link>
            
            {user && (isAdmin || isVerifier) && (
              <>
                {isAdmin && (
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-foreground">
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                {isVerifier && (
                  <Link to="/verifier-dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-foreground">
                      Verifier Dashboard
                    </Button>
                  </Link>
                )}
              </>
            )}

            <div className="pt-3 border-t border-border">
              {user ? (
                <Button 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <>
                  <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full mb-2">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/auth/sign-up" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full gradient-accent text-white">
                      Sign Up Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
