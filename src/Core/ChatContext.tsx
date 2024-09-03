import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import { CardHandler } from '@/Core/CardHandler';

interface ChatContextType {
    cardHandler: CardHandler | null;
    isInitialized: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const cardHandlerRef = useRef<CardHandler | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (cardHandlerRef.current === null) 
            cardHandlerRef.current = new CardHandler();
        setIsInitialized(true); // Set initialization as complete
    }, []);

    return (
        <ChatContext.Provider value={{ cardHandler: cardHandlerRef.current, isInitialized }}>
            {isInitialized ? children : null} {/* Render children only when initialized */}
        </ChatContext.Provider>
    );
};

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
