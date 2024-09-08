import { NextResponse } from "next/server";
// import { YoutubeTranscript } from "youtube-transcript";
import {Innertube} from 'youtubei.js/web';

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
        const youtube = await Innertube.create({
            lang: 'en',
            location: 'US',
            retrieve_player: false,
        });
        const info = await youtube.getInfo(url);
        const transcriptData = await info.getTranscript();
        const transcript = transcriptData.transcript.content?.body?.initial_segments.map((segment) => segment.snippet.text)

        return NextResponse.json({ transcript });
    } catch (error) {
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