import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DefenseSystem from "@/components/DefenseSystem";
import AIAgents from "@/components/AIAgents";
import Chatbot from "@/components/Chatbot";
import UseCases from "@/components/UseCases";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import { MediaUpload } from "@/components/MediaUpload";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16">
        <Hero />
        <DefenseSystem />
        <AIAgents />
        <MediaUpload />
        <Chatbot />
        <UseCases />
        <CommunitySection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
