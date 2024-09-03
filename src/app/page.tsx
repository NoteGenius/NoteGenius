"use client";
import { Card } from "@/Core/CardHandler";
import { ChatProvider } from "@/Core/ChatContext";
import Chat from "@/UI/Components/Chat";
import RecentHistoryDropdown from "@/UI/Components/RecentHistoryDropdown";
import Textbar from "@/UI/Components/Textbar";
import Topbar from "@/UI/Components/Topbar";

/** Main page code */
export default function Home() {
    const chat = new Card();
    chat.addChat("hi2", true);
    chat.addChat("hi", false);
    chat.addChat("hi", true);
    chat.addChat("hi", false);
    chat.addChat("hi", true);
    chat.addChat("hi", false);
    chat.addChat("hi", true);
    chat.addChat("hi", false);
    chat.addChat("hi", true);
    chat.addChat("hi", false);
    chat.addChat("hi", true);
    chat.addChat("hi", false);
    chat.addChat("hi", true);
    chat.addChat("hi", false);
    chat.addChat("hi", true);
    chat.addChat("hi", false);
    chat.addChat("hi", true);
    chat.addChat("hi", false);

    return (
        <main className="flex items-center justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom">
            <ChatProvider>
                <Topbar />
                <Chat card={chat} />
                <Textbar />
                <RecentHistoryDropdown />
            </ChatProvider>
        </main>
    );
}
