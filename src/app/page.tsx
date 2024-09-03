"use client";
import { ChatProvider } from "@/Core/ChatContext";
import RecentHistoryDropdown from "@/UI/Components/RecentHistoryDropdown";
import Textbar from "@/UI/Components/Textbar";
import Topbar from "@/UI/Components/Topbar";
import { Chat } from "@mui/icons-material";

/** Main page code */
export default function Home() {

    return (
        <main className="flex items-center justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom">
            <ChatProvider>
                <Topbar />
                <Chat />
                <Textbar />
                <RecentHistoryDropdown />
            </ChatProvider>
        </main>
    );
}
