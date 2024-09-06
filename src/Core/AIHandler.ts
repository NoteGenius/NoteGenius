import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

class AIHandler {
    private static instance: AIHandler;
    private _aiModel: GenerativeModel;
    private _lightAIModel: GenerativeModel;

    private static readonly RATE_LIMITS = {
        RPM: 2, // 2 requests per minute
        TPM: 32000, // 32,000 tokens per minute
        RPD: 50, // 50 requests per day
    };

    private constructor() {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

        this._aiModel = new GoogleGenerativeAI(apiKey).getGenerativeModel({
            model: "gemini-1.5-pro",
        });
        this._lightAIModel = new GoogleGenerativeAI(apiKey).getGenerativeModel({
            model: "gemini-1.5-flash",
        });
    }

    public static getInstance(): AIHandler {
        if (!AIHandler.instance) {
            AIHandler.instance = new AIHandler();
        }

        return AIHandler.instance;
    }

    public async generateText(prompt: string): Promise<string> {
        const tokenLength = prompt.split(" ").length; // Simple token estimation

        try {
            const response = await this._aiModel.generateContent([prompt]);
            return response.response.text();
        } catch (error: any) {
            if (error.message.includes("Resource has been exhausted")) {
                console.warn(
                    "Quota exceeded for the current model. Switching to lighter model.",
                );
                try {
                    // Retry with the lighter model
                    const response = await this._lightAIModel.generateContent([
                        prompt,
                    ]);
                    return response.response.text();
                } catch (err: any) {
                    console.error(
                        "Failed to generate text with the lighter model as well.",
                        err,
                    );
                    throw err; // Re-throw if the lighter model also fails
                }
            } else {
                console.error(
                    "An error occurred during text generation.",
                    error,
                );
                throw error; // Re-throw if it's a different error
            }
        }
    }

    /** Generates a 4-5 word title for all the chats when they have their first message sent */
    public async generateCardTitle(messages: String[]): Promise<string> {
        const prompt =
            'Generate a title in 4-5 words max for a chat with the messages (return simply "undefined" if the card has no messages or you are unable to find a suitable title): ' +
            messages.join("  |||  ");
        return await this.generateText(prompt);
    }
}

export default AIHandler;
