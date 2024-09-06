import AIHandler from "@/Core/AIHandler";
import { Card, CardHandler } from "@/Core/CardHandler";
import { SubmitChatMessageEvent, TextbarResizeEvent } from "@/Core/ChatEvents";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FiMessageSquare, FiSend } from "react-icons/fi";

const Textbar: React.FC = () => {
    const [input, setInput] = useState("");
    const _AIHandler = AIHandler.getInstance();

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

    // Handles submission of input
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // check if there is internet if not then return
        if (!navigator.onLine) {
            console.error(
                "No internet connection. Please check your connection and try again.",
            );
            return;
        }

        if (input.trim()) {
            new SubmitChatMessageEvent(input.trim(), true).Dispatch();
            _AIHandler
                .generateResponse(
                    input.trim(),
                    Array.from(
                        CardHandler.getInstance().currentCard.chats.values(),
                    ),
                )
                .then((response) => {
                    new SubmitChatMessageEvent(response, false).Dispatch();
                });
            setInput(""); // Clear input after sending
        }
    };

    // Handles keydown event to submit form on Enter key press
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

    const handleNewChat = () => {
        CardHandler.getInstance().currentCard = new Card();
    };

    return (
        <div className="fixed bottom-5 w-3/4 bg-transparent rounded-2xl border-[#a6a6a6] border-2">
            <form className="flex items-center p-3" onSubmit={handleSubmit}>
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
