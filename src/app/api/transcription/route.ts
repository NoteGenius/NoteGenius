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

        return NextResponse.json({ transcript: transcript });
    } catch (error) {
        console.error(error);
    }
}