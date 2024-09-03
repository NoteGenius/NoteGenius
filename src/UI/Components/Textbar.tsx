import AIHandler from "@/Core/AIHandler";
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
        e.target.style.height = `${Math.min(e.target.scrollHeight, maxHeight)}px`;
    };

    // Handles submission of input
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) {    
            _AIHandler.generateText(input.trim()).then((response) => {
                console.log(response);
            })
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
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        }
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
                <button className="ml-2 text-green-600 hover:text-green-800" title="New Chat">
                    <FiMessageSquare size={24} />
                </button>
            </form>

        </div>
    );
};

export default Textbar;
