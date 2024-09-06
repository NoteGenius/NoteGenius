import React, { useCallback, useEffect, useRef, useState } from "react";
import { CardHandler } from "@/Core/CardHandler";
import {
    SubmitChatMessageEvent,
    SwitchCurrentChatEvent,
    TextbarResizeEvent,
} from "@/Core/ChatEvents";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Adds GitHub-flavored markdown (lists, tables)
import "@/UI/Style/markdown.css";

const Chat: React.FC = () => {
    const isMounted = useRef(false);
    const chatWindowRef = useRef<HTMLDivElement>(null);

    const cardHandler = CardHandler.getInstance();
    const [forceRender, setForceRender] = useState(false);

    const [textbarHeight, setTextbarHeight] = useState(40); // Default height of the text bar
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop =
                chatWindowRef.current.scrollHeight;
        }
    };

    // Callback for when messages are sent by user
    const onChatMessageSent = useCallback(
        (e: SubmitChatMessageEvent) => {
            cardHandler.currentCard.addChat(e.message, e.userSent);
            setForceRender((prev) => !prev);
        },
        [cardHandler.currentCard],
    );

    // Adjust chat height based on the textbar resize
    const onTextbarResize = useCallback((e: TextbarResizeEvent) => {
        setTextbarHeight(e.height);
        scrollToBottom();
    }, []);

    const onWindowResize = useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    const onSwitchCurrentChat = useCallback(() => {
        setForceRender((prev) => !prev);
    }, []);

    // Scroll to the bottom when the component mounts or when chats change
    useEffect(() => {
        scrollToBottom();

        // forcing re-render when any of these values change
    }, [textbarHeight, windowSize, forceRender]);

    // Add and remove event listeners for chat message and textbar resize
    useEffect(() => {
        if (!isMounted.current) {
            SubmitChatMessageEvent.Listen(onChatMessageSent);
            TextbarResizeEvent.Listen(onTextbarResize);
            SwitchCurrentChatEvent.Listen(onSwitchCurrentChat);

            isMounted.current = true;
        }

        window.addEventListener("resize", onWindowResize);

        return () => {
            SubmitChatMessageEvent.RemoveListener(onChatMessageSent);
            TextbarResizeEvent.RemoveListener(onTextbarResize);
            SwitchCurrentChatEvent.RemoveListener(onSwitchCurrentChat);

            window.removeEventListener("resize", onWindowResize);
        };
    }, [
        onChatMessageSent,
        onSwitchCurrentChat,
        onTextbarResize,
        onWindowResize,
    ]);

    return (
        <div className="fixed inset-0 md:top-[100px] top-0 flex justify-center sm:justify-center">
            <div
                ref={chatWindowRef}
                className="w-full md:w-3/5 sm-h-auto bg-transparent rounded-lg overflow-y-scroll p-4 scrollbar-custom"
                style={
                    window.innerWidth >= 768
                        ? { height: `calc(90vh - ${textbarHeight + 60}px)` }
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
