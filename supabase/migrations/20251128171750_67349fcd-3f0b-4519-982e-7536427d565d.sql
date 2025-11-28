-- Create storage bucket for verification media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'verification-media',
  'verification-media',
  false,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime']
);

-- RLS policies for verification-media bucket
CREATE POLICY "Authenticated users can upload media"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'verification-media' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own media"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'verification-media' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins and verifiers can view all media"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'verification-media' AND
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'verifier'::app_role))
);

CREATE POLICY "Users can delete their own media"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'verification-media' AND
  auth.uid()::text = (storage.foldername(name))[1]
);