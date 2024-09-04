"use client";
import { Card } from "@/Core/CardHandler";
import { ChatProvider } from "@/Core/ChatContext";
import Background from "@/UI/Components/Background";
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
        <main className="flex items-center justify-center h-screen relative">
            <ChatProvider>
                <Background />
                <Chat card={chat} />
                <Textbar />
                <RecentHistoryDropdown />
                <Topbar />
            </ChatProvider>
        </main>
    );
}
