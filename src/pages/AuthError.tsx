import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, ArrowLeft } from "lucide-react";

const AuthError = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-warning/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Shield className="h-10 w-10 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            SatyaShield
          </span>
        </div>

        <Card className="border-destructive/20 shadow-strong bg-card/50 backdrop-blur-sm text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Authentication Error</CardTitle>
            <CardDescription className="text-base">
              Something went wrong with your authentication request.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <h4 className="font-semibold text-sm mb-2 text-foreground">⚠️ Common Issues:</h4>
              <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                <li>• Expired or invalid confirmation link</li>
                <li>• Email already confirmed</li>
                <li>• Network connection issues</li>
                <li>• Browser cookies disabled</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link to="/auth/login">
                <Button className="w-full gradient-accent text-white py-6 shadow-accent-glow">
                  Try Logging In
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </Link>

              <Link to="/auth/sign-up">
                <Button variant="outline" className="w-full py-6 border-2">
                  Create New Account
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              Still having issues?{" "}
              <Link to="/" className="text-primary hover:underline">
                Contact Support
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthError;
