import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, ArrowRight } from "lucide-react";

const SignUpSuccess = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Shield className="h-10 w-10 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            SatyaShield
          </span>
        </div>

        <Card className="border-border shadow-strong bg-card/50 backdrop-blur-sm text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
              <Mail className="h-10 w-10 text-accent" />
            </div>
            <CardTitle className="text-2xl">Check Your Email!</CardTitle>
            <CardDescription className="text-base">
              We've sent you a confirmation email. Click the link inside to activate your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <h4 className="font-semibold text-sm mb-2 text-foreground">📧 What's next?</h4>
              <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                <li>1. Check your inbox (and spam folder)</li>
                <li>2. Click the confirmation link</li>
                <li>3. Start verifying content immediately</li>
              </ol>
            </div>

            <Link to="/auth/login">
              <Button className="w-full gradient-accent text-white py-6 shadow-accent-glow">
                Go to Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <p className="text-xs text-muted-foreground">
              Didn't receive the email? Check your spam folder or{" "}
              <Link to="/auth/sign-up" className="text-primary hover:underline">
                try signing up again
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpSuccess;
