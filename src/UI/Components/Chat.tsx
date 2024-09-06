import React, { useCallback, useEffect, useRef, useState } from "react";
import { CardHandler } from "@/Core/CardHandler";
import { ChatEvent, TextbarResizeEvent } from "@/Core/ChatEvents";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Adds GitHub-flavored markdown (lists, tables)
import "@/UI/Style/markdown.css";

const Chat: React.FC = () => {
    const isMounted = useRef(false); // Check if the component is mounted
    const chatWindowRef = useRef<HTMLDivElement>(null); // Reference to the chat window html component

    const cardHandler = CardHandler.GetInstance();
    const [forceRender, setForceRender] = useState(false); // Force rerender when true

    const [textbarHeight, setTextbarHeight] = useState(40); // Default height of the text bar
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    /**
     * Scroll to the bottom of the chat window
     * ran every rerender
     */
    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop =
                chatWindowRef.current.scrollHeight;
        }
    };

    /**
     * Adjust chat height based on the textbar resize
     */
    const onTextbarResize = useCallback((e: TextbarResizeEvent) => {
        setTextbarHeight(e.height);
        scrollToBottom();
    }, []);

    /**
     * Adjust chat height based on the window resize
     */
    const onWindowResize = useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    /**
     * Force rerender when a chat message is sent
     */
    const onChatEvent = useCallback(() => {
        setForceRender((prev) => !prev);
    }, []);

    /**
     * Scrolls to bottom on rerender
     *
     * Force rerender when dependencies change
     */
    useEffect(() => {
        scrollToBottom();
        // forcing re-render when any of these values change
    }, [textbarHeight, windowSize, forceRender]);

    /**
     * Handles event listeners
     */
    useEffect(() => {
        if (!isMounted.current) {
            TextbarResizeEvent.Listen(onTextbarResize);
            ChatEvent.Listen(onChatEvent);

            isMounted.current = true;
        }

        window.addEventListener("resize", onWindowResize);

        return () => {
            TextbarResizeEvent.RemoveListener(onTextbarResize);
            ChatEvent.RemoveListener(onChatEvent);

            window.removeEventListener("resize", onWindowResize);
        };
    }, [onChatEvent, onTextbarResize, onWindowResize]);

    return (
        <div className="fixed inset-0 md:top-[100px] top-0 flex justify-center sm:justify-center">
            <div
                ref={chatWindowRef}
                className="w-full md:w-3/5 sm-h-auto bg-transparent rounded-lg overflow-y-scroll p-4 scrollbar-custom"
                style={
                    window.innerWidth >= 768
                        ? { height: `calc(100vh - ${textbarHeight + 150}px)` }
                        : { height: `calc(100vh - ${textbarHeight + 50}px)` }
                }
            >
                {Array.from(cardHandler.currentCard.chats.entries()).map(
                    ([messageInfo, messageText], index) => {
                        const isUserSent = messageInfo.userSent;

                        return (
                            <div
                                key={index}
                                className={`flex ${isUserSent ? "justify-end" : "justify-start"} mb-4`}
                            >
                                <div
                                    className={`p-4 rounded-lg ${
                                        isUserSent
                                            ? "bg-gray-100 text-black drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                            : "bg-green-700 text-white drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]"
                                    } max-w-[100%] sm:max-w-[60%] lg:max-w-[85%] break-words overflow-hidden prose custom-markdown`}
                                >
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {messageText.toString()}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        );
                    },
                )}
            </div>
        </div>
    );
};

export default Chat;
