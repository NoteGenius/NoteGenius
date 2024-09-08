import AIHandler from "@/Core/AIHandler";
import { Card, CardHandler } from "@/Core/CardHandler";
import {
    ChatEvent,
    OpenSourcesPanelEvent,
    RecentHistoryEvent,
    TextbarResizeEvent,
} from "@/Core/ChatEvents";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FiMessageSquare, FiPaperclip, FiSend } from "react-icons/fi";

const Textbar: React.FC = () => {
    const [input, setInput] = useState("");
    const aiHandler = AIHandler.GetInstance();
    const cardHandler = CardHandler.GetInstance();

    // Handles input change
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);

        // Dynamically adjust textarea height with a limit
        const textareaLineHeight = 24; // Approximate line height for textarea
        const maxHeight = textareaLineHeight * 5; // Max height for 5 lines

        e.target.style.height = "inherit";
        const newHeight = Math.min(e.target.scrollHeight, maxHeight);
        e.target.style.height = `${newHeight}px`;

        // Dispatch the TextbarResizeEvent with the new height so the chat component can adjust
        new TextbarResizeEvent(newHeight).Dispatch();
    };

    /**
     * Handle when a new chat is submitted
     * executed by "enter" key press or send button click
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // return if there is no internet connection
        if (!navigator.onLine) {
            console.error(
                "No internet connection. Please check your connection and try again.",
            );
            return;
        }

        if (input.trim()) {
            const currentCard = cardHandler.currentCard;

            // if the bot is typing, don't allow user to send another message
            if (currentCard.botIsTyping) return;

            // Adding user chat to the current chat card
            currentCard.AddChat(input.trim(), true);
            new ChatEvent().Dispatch();

            // generating response and adding that to the current chat card
            aiHandler
                .GenerateResponse(
                    input.trim(),
                    Array.from(cardHandler.currentCard.chats.values()),
                    Array.from(cardHandler.currentCard.sources.values()),
                )
                .then((response) => {
                    currentCard.AddChat(response, false);
                    new ChatEvent().Dispatch();
                });

            // clear input after sending
            setInput("");
        }
    };

    /**
     * Handle when the "enter" key is pressed
     * -> executes handleSubmit
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // Trigger the form submission
            const form = e.currentTarget.form;
            if (form) {
                form.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true }),
                );
            }
        }
    };

    /**
     * Opens the add source panel
     */
    const handleAddSource = () => {
        new OpenSourcesPanelEvent().Dispatch();
    };

    /**
     * Handle when the new chat button is clicked
     */
    const handleNewChat = () => {
        cardHandler.currentCard = new Card();
        new RecentHistoryEvent().Dispatch();
    };

    return (
        <div className="fixed bottom-5 w-3/4 bg-transparent rounded-2xl border-[#a6a6a6] border-2">
            <form className="flex items-center p-3" onSubmit={handleSubmit}>
                <button
                    className="text-green-600 hover:text-green-800"
                    onClick={handleAddSource}
                    title="Add Source"
                >
                    <FiPaperclip size={24} />
                </button>
                <textarea
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    rows={1}
                    className="flex-grow border-none p-2 rounded-lg bg-transparent text-white outline-none resize-none overflow-hidden"
                    style={{ height: "auto", minHeight: "2.5rem" }}
                />
                <button
                    type="submit"
                    className="ml-2 p-2 text-green-600 hover:text-green-800 transition-colors duration-300"
                    title="Send Message"
                >
                    <FiSend size={24} />
                </button>
                <button
                    className="ml-2 text-green-600 hover:text-green-800"
                    onClick={handleNewChat}
                    title="New Chat"
                >
                    <FiMessageSquare size={24} />
                </button>
            </form>
        </div>
    );
};

export default Textbar;
