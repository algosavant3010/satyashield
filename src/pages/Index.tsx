import Hero from "@/components/Hero";
import DefenseSystem from "@/components/DefenseSystem";
import AIAgents from "@/components/AIAgents";
import Chatbot from "@/components/Chatbot";
import UseCases from "@/components/UseCases";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DefenseSystem />
      <AIAgents />
      <Chatbot />
      <UseCases />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Index;
