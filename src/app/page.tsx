"use client";
import Background from "@/UI/Components/Background";
import Chat from "@/UI/Components/Chat";
import RecentHistoryDropdown from "@/UI/Components/RecentHistoryDropdown";
import Textbar from "@/UI/Components/Textbar";
import Topbar from "@/UI/Components/Topbar";
import { useEffect, useState } from "react";

/**
 * This component pieces together the different components of the main page and renders them
 */
export default function Home() {
    const [isClient, setIsClient] = useState(false); // Check if the component is mounted on the client side

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <main className="flex items-center justify-center h-screen relative">
            <Background />
            <Chat />
            <Textbar />
            <RecentHistoryDropdown />
            <Topbar />
        </main>
    );
}
