import React, { useEffect, useRef } from 'react';
import { Card } from '@/Core/CardHandler'; // Adjust the path as necessary

interface ChatProps {
    card: Card;
}

const Chat: React.FC<ChatProps> = ({ card }) => {
    const chatWindowRef = useRef<HTMLDivElement>(null);

    // Scroll to the bottom when the component mounts or when chats change
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [card.chats]);

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div
                ref={chatWindowRef}
                className="w-3/4 h-[calc(100vh-10rem)] bg-gray-100 rounded-lg shadow-lg overflow-y-scroll p-4"
            >
                {card.chats.map((chat, index) => {
                    const [messageInfo, messageText] = Array.from(chat.entries())[0];
                    const isUserSent = messageInfo.userSent;

                    return (
                        <div
                            key={index}
                            className={`flex ${isUserSent ? 'justify-end' : 'justify-start'} mb-4`}
                        >
                            <div
                                className={`max-w-xs p-2 rounded-lg ${
                                    isUserSent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                                }`}
                            >
                                {messageText}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Chat;
