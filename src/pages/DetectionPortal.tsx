import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MediaUpload } from "@/components/MediaUpload";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, Image, MessageSquare, Zap } from "lucide-react";

const DetectionPortal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <Badge className="mb-4 gradient-accent text-white border-0 shadow-accent-glow">
              <Zap className="h-3 w-3 mr-1 inline" />
              Powered by AI + Community Intelligence
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Detection Portal
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload media or chat with our AI to verify authenticity. 
              Results powered by 5 specialized AI agents and 1000+ community verifiers.
            </p>
          </div>

          {/* Detection Methods */}
          <Card className="border-border shadow-strong bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Choose Detection Method</CardTitle>
                  <CardDescription className="text-base">
                    Select how you want to verify content authenticity
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="media" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="media" className="text-base">
                    <Image className="h-4 w-4 mr-2" />
                    Media Analysis
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="text-base">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat Verification
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="media" className="mt-0">
                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-6 border border-border">
                      <h3 className="font-semibold text-lg mb-2 text-foreground">📸 Visual Deepfake Detection</h3>
                      <p className="text-muted-foreground mb-4">
                        Upload images or videos. Our AI analyzes:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                        <li>• Facial manipulation markers (deepfake indicators)</li>
                        <li>• Metadata inconsistencies and EXIF data</li>
                        <li>• Lighting & shadow abnormalities</li>
                        <li>• Audio-visual synchronization (for videos)</li>
                      </ul>
                    </div>
                    <MediaUpload />
                  </div>
                </TabsContent>

                <TabsContent value="chat" className="mt-0">
                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-6 border border-border">
                      <h3 className="font-semibold text-lg mb-2 text-foreground">💬 AI-Powered Text Analysis</h3>
                      <p className="text-muted-foreground mb-4">
                        Paste text or describe content. Our multilingual AI checks:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                        <li>• Emotional manipulation patterns (fear, rage-baiting)</li>
                        <li>• Cross-reference with verified news sources</li>
                        <li>• Source credibility assessment</li>
                        <li>• Cultural context understanding (6 Indian languages)</li>
                      </ul>
                    </div>
                    <Chatbot />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 bg-card/50 border-border hover:border-primary/50 transition-all">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">5-10 Min Response</h3>
                <p className="text-sm text-muted-foreground">
                  AI pre-screening + community verification for fast, accurate results
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border hover:border-accent/50 transition-all">
              <div className="text-center">
                <div className="text-3xl mb-2">🌐</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">6 Languages Supported</h3>
                <p className="text-sm text-muted-foreground">
                  Hindi, Tamil, Bengali, Marathi, Telugu, Gujarati
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border hover:border-secondary/50 transition-all">
              <div className="text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Privacy Protected</h3>
                <p className="text-sm text-muted-foreground">
                  Your submissions are encrypted and stored securely
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionPortal;
