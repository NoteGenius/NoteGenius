import { NextResponse } from "next/server";
import {Innertube} from 'youtubei.js/web';

/**
 * Utility function to extract the video ID from a YouTube URL
 */
function extractVideoID(url: string): string | null {
    const videoIDRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIDRegex);
    return match ? match[1] : null;
}

/**
 * API POST request to fetch YouTube transcript on the server side
 *
 * @param request - The request object
 * @returns the transcript of the video
 */
export async function POST(request: Request) {
    try {
        const { url } = await request.json();
        const videoID = extractVideoID(url);

        if (!videoID) {
            throw new Error("Invalid YouTube URL");
        }

        // Fetch transcript from YouTube
        const youtube = await Innertube.create({
            lang: 'en',
            location: 'US',
            retrieve_player: false,
        });
        const info = await youtube.getInfo(videoID);
        const transcriptData = await info.getTranscript();
        const transcript = transcriptData.transcript.content?.body?.initial_segments.map((segment) => segment.snippet.text)

        return NextResponse.json({ transcript });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: error },
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