import { useState } from "react";
import { Upload, Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AnalysisResult {
  verdict: "real" | "fake" | "suspicious";
  confidence: number;
  analysis: string;
  indicators: string[];
  recommendations: string;
}

export const MediaUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Please upload a valid image or video file');
      return;
    }

    // Validate file size (50MB)
    if (selectedFile.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB');
      return;
    }

    setFile(selectedFile);
    setResult(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please sign in to analyze media');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('contentType', file.type.startsWith('video') ? 'video' : 'image');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-media`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult(data.analysis);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to analyze media. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getVerdictIcon = () => {
    if (!result) return null;
    switch (result.verdict) {
      case 'real':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'fake':
        return <XCircle className="w-8 h-8 text-destructive" />;
      case 'suspicious':
        return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getVerdictColor = () => {
    if (!result) return '';
    switch (result.verdict) {
      case 'real':
        return 'text-green-500';
      case 'fake':
        return 'text-destructive';
      case 'suspicious':
        return 'text-yellow-500';
    }
  };

  return (
    <section className="py-24 px-4 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upload Media for Deepfake Detection
          </h2>
          <p className="text-xl text-muted-foreground">
            Upload images or videos to analyze for AI manipulation and deepfakes
          </p>
        </div>

        <Card className="p-8">
          {!preview ? (
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors">
              <input
                type="file"
                id="media-upload"
                className="hidden"
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                onChange={handleFileChange}
              />
              <label htmlFor="media-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-2">Click to upload media</p>
                <p className="text-sm text-muted-foreground">
                  Supports: JPG, PNG, WEBP, GIF, MP4, WEBM (Max 50MB)
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden bg-muted">
                {file?.type.startsWith('video') ? (
                  <video src={preview} controls className="w-full max-h-96 mx-auto" />
                ) : (
                  <img src={preview} alt="Preview" className="w-full max-h-96 object-contain mx-auto" />
                )}
              </div>

              {!result && (
                <div className="flex gap-4">
                  <Button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="flex-1"
                    size="lg"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze for Deepfakes'
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                      setResult(null);
                    }}
                    variant="outline"
                    size="lg"
                  >
                    Clear
                  </Button>
                </div>
              )}

              {result && (
                <Card className="p-6 space-y-4 bg-muted/50">
                  <div className="flex items-center gap-3">
                    {getVerdictIcon()}
                    <div>
                      <h3 className={`text-2xl font-bold capitalize ${getVerdictColor()}`}>
                        {result.verdict}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Confidence: {result.confidence}%
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Analysis:</h4>
                    <p className="text-muted-foreground">{result.analysis}</p>
                  </div>

                  {result.indicators.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Indicators Found:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {result.indicators.map((indicator, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            {indicator}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-semibold">Recommendations:</h4>
                    <p className="text-sm text-muted-foreground">{result.recommendations}</p>
                  </div>

                  <Button
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                      setResult(null);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Analyze Another File
                  </Button>
                </Card>
              )}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
