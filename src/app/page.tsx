"use client";
import { CardHandler } from "@/Core/CardHandler";
import Background from "@/UI/Components/Background";
import Chat from "@/UI/Components/Chat";
import RecentHistoryDropdown from "@/UI/Components/RecentHistoryDropdown";
import Textbar from "@/UI/Components/Textbar";
import Topbar from "@/UI/Components/Topbar";
import { useEffect, useState } from "react";

/** Main page code */
export default function Home() {

    const [isClient, setIsClient] = useState(false);

    // saving the cards when closing
    useEffect(() => {
        window.addEventListener("beforeunload", () =>
            CardHandler.getInstance().saveCards(),
        );
        return () => {
            window.removeEventListener("beforeunload", () =>
                CardHandler.getInstance().saveCards(),
            );
        };
    }, []);

    // checks to see if using client
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; 
    }

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
