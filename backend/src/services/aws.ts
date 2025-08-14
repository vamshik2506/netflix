import { config } from "dotenv";
config();

export const AWS_REGION = process.env.AWS_REGION || "ap-south-1";
export const S3_BUCKET = process.env.S3_BUCKET || "";

if (!S3_BUCKET) {
  console.warn("[WARN] S3_BUCKET is not set. Uploads/streams will fail.");
}
