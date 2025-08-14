import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3_BUCKET } from "./aws.js";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function uploadToS3(key: string, body: Buffer, contentType = "video/mp4") {
  await s3.send(new PutObjectCommand({ Bucket: S3_BUCKET, Key: key, Body: body, ContentType: contentType }));
  return `s3://${S3_BUCKET}/${key}`;
}

export async function presign(key: string, expires = 3600) {
  const cmd = new GetObjectCommand({ Bucket: S3_BUCKET, Key: key });
  return getSignedUrl(s3, cmd, { expiresIn: expires });
}
