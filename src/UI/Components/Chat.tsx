import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/Core/CardHandler"; // Adjust the path as necessary
import { SubmitChatMessageEvent } from "@/Core/ChatEvents";

interface ChatProps {
    card: Card;
}

const Chat: React.FC<ChatProps> = ({ card }) => {
    const isMountedRef = useRef(false);
    const chatWindowRef = useRef<HTMLDivElement>(null);
    const [messageCount, setMessageCount] = useState(card.chats.size); // Track the number of messages

    // callback for when messages are sent by user
    const onChatMessageSent = useCallback(
        (e: SubmitChatMessageEvent) => {
            card.addChat(e.message, e.userSent);
            setMessageCount(card.chats.size); // Update message count to force re-render
        },
        [card],
    );

    // Scroll to the bottom when the component mounts or when chats change
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop =
                chatWindowRef.current.scrollHeight;
        }
    }, [messageCount]);

    // Add and remove event listeners that only are added once
    useEffect(() => {
        if (!isMountedRef.current) {
            console.log("Here");
            SubmitChatMessageEvent.Listen(onChatMessageSent);
            isMountedRef.current = true;
        }

        return () => {
            SubmitChatMessageEvent.RemoveListener(onChatMessageSent);
        };
    }, [onChatMessageSent]);

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div
                ref={chatWindowRef}
                className="w-[70vw] h-[calc(100vh-15rem)] bg-transparent rounded-lg shadow-lg overflow-y-scroll p-4 scrollbar-custom"
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
                                    className={`max-w-xs p-2 rounded-lg ${
                                        isUserSent
                                            ? "bg-gray-100 text-black"
                                            : "bg-green-600 text-white"
                                    }`}
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
