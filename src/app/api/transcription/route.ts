import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

/**
 * API request to fetch YouTube transcript on the server side
 *
 * @param request - The request object
 * @returns the transcript of the video
 */
export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        // Fetch transcript from YouTube
        const transcript = await YoutubeTranscript.fetchTranscript(url);

        return NextResponse.json({ transcript });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch transcript" },
            { status: 500 },
        );
    }
}

/**
 * Handle CORS preflight requests
 *
 * @returns appropriate headers for OPTIONS preflight
 */
export async function OPTIONS() {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST and OPTIONS methods
        'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
      },
    });
  }