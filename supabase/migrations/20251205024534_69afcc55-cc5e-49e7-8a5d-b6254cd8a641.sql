-- Make the verification-media bucket public for viewing
UPDATE storage.buckets 
SET public = true 
WHERE id = 'verification-media';

-- Add policy for authenticated users to upload files
CREATE POLICY "Users can upload verification media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'verification-media' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add policy for authenticated users to view their own files
CREATE POLICY "Users can view their verification media"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'verification-media');

-- Add policy for service role to manage files
CREATE POLICY "Service role can manage verification media"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'verification-media')
WITH CHECK (bucket_id = 'verification-media');