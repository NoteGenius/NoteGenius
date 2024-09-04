import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/Core/CardHandler";
import { SubmitChatMessageEvent, TextbarResizeEvent } from "@/Core/ChatEvents";

interface ChatProps {
    card: Card;
}

const Chat: React.FC<ChatProps> = ({ card }) => {
    const isMounted = useRef(false);
    const chatWindowRef = useRef<HTMLDivElement>(null);
    const [messageCount, setMessageCount] = useState(card.chats.size); // tracks number of messages for re-render
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
            card.addChat(e.message, e.userSent);
            setMessageCount(card.chats.size); // Update message count to force re-render
        },
        [card],
    );

    // Adjust chat height based on the textbar resize
    const onTextbarResize = useCallback((e: TextbarResizeEvent) => {
        setTextbarHeight(e.height);
        scrollToBottom();
    }, []);

    const onWindowResize = useCallback(() => {
        console.log(window.innerWidth);
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    // Scroll to the bottom when the component mounts or when chats change
    useEffect(() => {
        scrollToBottom();

        // forcing re-render when any of these values change
    }, [messageCount, textbarHeight, windowSize]);

    // Add and remove event listeners for chat message and textbar resize
    useEffect(() => {
        if (!isMounted.current) {
            SubmitChatMessageEvent.Listen(onChatMessageSent);
            TextbarResizeEvent.Listen(onTextbarResize);

            isMounted.current = true;
        }

        window.addEventListener("resize", onWindowResize);

        return () => {
            SubmitChatMessageEvent.RemoveListener(onChatMessageSent);
            TextbarResizeEvent.RemoveListener(onTextbarResize);

            window.removeEventListener("resize", onWindowResize);
        };
    }, [onChatMessageSent, onTextbarResize, onWindowResize]);

    return (
        <div className="fixed inset-0 md:top-[100px] top-0 flex justify-center sm:justify-center">
            {" "}
            {/* On mobile, move the chat to the top */}
            <div
                ref={chatWindowRef}
                className="w-full md:w-3/4 sm-h-auto bg-transparent rounded-lg overflow-y-scroll p-4 scrollbar-custom"
                style={
                    window.innerWidth >= 768
                        ? { height: `calc(90vh - ${textbarHeight + 60}px)` }
                        : { height: `calc(100vh - ${textbarHeight + 50}px)` }
                }
            >
                {Array.from(card.chats.entries()).map(
                    ([messageInfo, messageText], index) => {
                        const isUserSent = messageInfo.userSent;

                        return (
                            <div
                                key={index}
                                className={`flex ${isUserSent ? "justify-end" : "justify-start"} mb-4`}
                            >
                                <div
                                    className={`p-2 rounded-lg ${
                                        isUserSent
                                            ? "bg-gray-100 text-black"
                                            : "bg-green-700 text-white"
                                    } max-w-[100%] sm:max-w-[60%] lg:max-w-[50%] break-words overflow-hidden`}
                                >
                                    {messageText}
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
