import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DetectionPortal from "./pages/DetectionPortal";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import VerifierDashboard from "./pages/VerifierDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpSuccess from "./pages/SignUpSuccess";
import AuthError from "./pages/AuthError";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/detect" element={<DetectionPortal />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/auth/sign-up-success" element={<SignUpSuccess />} />
          <Route path="/auth/error" element={<AuthError />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requireRole="admin">
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/verifier-dashboard" 
            element={
              <ProtectedRoute requireRole="verifier">
                <VerifierDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
