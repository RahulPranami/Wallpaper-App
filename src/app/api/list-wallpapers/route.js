import r2Client from "@/lib/r2Client";
import { ListObjectsV2Command } from "@aws-sdk/client-s3"; // ES Modules import

export async function GET() {
  try {
    const options = {
      Bucket: process.env.R2_BUCKET_NAME,
      MaxKeys: 8,
    };
    const data = await r2Client.send(new ListObjectsV2Command(options));

    return new Response(JSON.stringify(data.Contents), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to list bucket contents" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
