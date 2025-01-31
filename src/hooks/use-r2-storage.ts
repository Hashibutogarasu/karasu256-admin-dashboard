import {
  S3Client,
} from "@aws-sdk/client-s3";

export function useR2Storage() {
  const S3 = new S3Client({
    endpoint: import.meta.env.VITE_CLOUDFLARE_API_URL,
    credentials: {
      accessKeyId: import.meta.env.VITE_CLOUDFLARE_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_CLOUDFLARE_SECRET_ACCESS_KEY,
    },
    region: "auto",
  });

  return S3;
}