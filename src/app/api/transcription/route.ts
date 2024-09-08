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

        return new Response(JSON.stringify({ transcript }), {
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins, or restrict to specific domain in production
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch transcript" },
            { status: 500 },
        );
    }
}
