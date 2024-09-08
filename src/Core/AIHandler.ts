import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

/**
 * AIHandler
 *
 * Handles interactions with Google's Gemini AI models, providing functionality for generating text,
 * chat responses, and card titles. A singleton class ensuring only one instance is used throughout the application.
 */
class AIHandler {
    private static instance: AIHandler; // The singleton instance of the AIHandler
    private _aiModel: GenerativeModel; // The main AI model (Gemini 1.5 Pro)
    private _lightAIModel: GenerativeModel; // The fallback AI model (Gemini 1.5 Flash)

    /**
     * Private constructor to initialize AI models using the API key from environment variables.
     * The main model is "gemini-1.5-pro" and the fallback model is "gemini-1.5-flash."
     */
    private constructor() {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

        this._aiModel = new GoogleGenerativeAI(apiKey).getGenerativeModel({
            model: "gemini-1.5-pro",
        });

        this._lightAIModel = new GoogleGenerativeAI(apiKey).getGenerativeModel({
            model: "gemini-1.5-flash",
        });
    }

    /**
     * Retrieves the singleton instance of the AIHandler.
     * If the instance does not exist, it creates a new one.
     *
     * @returns The singleton instance of AIHandler.
     */
    public static GetInstance(): AIHandler {
        if (!AIHandler.instance) {
            AIHandler.instance = new AIHandler();
        }

        return AIHandler.instance;
    }

    /**
     * Generates text based on the provided prompt using the main AI model.
     * If the quota is exhausted, it switches to the lighter model.
     *
     * @param prompt - The text prompt to generate the response.
     * @returns (Future) AI generated text.
     */
    public async GenerateText(prompt: string): Promise<string> {
        try {
            const response = await this._aiModel.generateContent([prompt]);
            return response.response.text();
        } catch (error: any) {
            if (error.message.includes("Resource has been exhausted")) {
                console.warn(
                    "Quota exceeded for the current model. Switching to lighter model.",
                );

                try {
                    const response = await this._lightAIModel.generateContent([
                        prompt,
                    ]);
                    return response.response.text();
                } catch (err: any) {
                    console.error(
                        "Failed to generate text with the lighter model.",
                        err,
                    );
                    throw err; // Re-throw if the lighter model also fails
                }
            } else {
                console.error(
                    "An error occurred during text generation.",
                    error,
                );
                throw error;
            }
        }
    }

    /**
     * Generates a chatbot response to the user's message.
     *
     * @param message - The user's input message.
     * @param messages - The previous messages in the chat.
     * @returns (Future) AI generated chatbot response.
     */
    public async GenerateResponse(
        message: string,
        messages: string[],
        sources: string[],
    ): Promise<string> {
        const prompt = `
            You are a chatbot named Notegenius. Your primary objective is to help users study and organize study notes. Be very concise in your responses and ensure all analysis is very high-level.
            For the current chat, here are the sources (if any) that the user has provided. If the user has provided a source with the information containing anything related to the message, only utilize the source for your response. Make sure to prioritize the source over past messages: ${sources.join(" ||| ")}.
            Please reply to the following message: ${message} 
            The conversation you are currently having includes these past messages: ${messages.join(" ||| ")}`;

        return await this.GenerateText(prompt);
    }

    /**
     * Generates a 4-5 word title for a chat based on its messages.
     * If no messages exist, it returns "undefined."
     *
     * @param messages - The list of messages in the chat.
     * @returns A promise resolving to the generated chat title.
     */
    public async GenerateCardTitle(messages: string[]): Promise<string> {
        const prompt = `
            Generate a title in 4-5 words max for a chat with these messages: ${messages.join(" ||| ")}.
            If there are no messages, return "undefined".`;

        return await this.GenerateText(prompt);
    }

    /**
     * Generates a 4-5 word summary for a source based on its content.
     *
     * @param source - The content of the source.
     * @returns A promise resolving to the generated source summary.
     */
    public async GenerateSourceSummary(source: string): Promise<string> {
        const prompt = `Generate a 7 word max summary for the source I have provided. Ensure that the summary is hyper-specfic, concise, and very clear. If the content is empty, simply response with "Empty source". This is the content of the source: ${source}.`;

        return await this.GenerateText(prompt);
    }

    /**
     * Fetches the transcript of a YouTube video using npm package
     */
    public async FetchYoutubeTranscript(url: string): Promise<string> {
        try {
            console.log(window.location.origin)
            const response = await fetch(`${window.location.origin}/api/transcription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            return data.transcript
                .map((segment: { text: string }) => segment.text)
                .join(" ");
        } catch (error) {
            alert("Failed to fetch the YouTube transcript. Please try again.");
            throw error;
        }
    }
}

export default AIHandler;
