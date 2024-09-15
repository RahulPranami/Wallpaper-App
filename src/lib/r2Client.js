import { S3Client } from "@aws-sdk/client-s3";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },

  // Required for Cloudflare R2
  // The key s3ForcePathStyle is renamed to forcePathStyle.
  forcePathStyle: true,

  // Required for Cloudflare R2
  // The key signatureVersion is no longer supported in v3, and can be removed.
  // @deprecated SDK v3 only supports signature v4.
  signatureVersion: "v4",
});

export default r2Client;
