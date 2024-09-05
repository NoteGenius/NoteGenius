"use client";
import { CardHandler } from "@/Core/CardHandler";
import Chat from "@/UI/Components/Chat";
import RecentHistoryDropdown from "@/UI/Components/RecentHistoryDropdown";
import Textbar from "@/UI/Components/Textbar";
import Topbar from "@/UI/Components/Topbar";
import { useEffect } from "react";

/** Main page code */
export default function Home() {
    // saving the cards when closing
    useEffect(() => {
        if (typeof window === "undefined") return; // returning if there is no window open
        window.addEventListener("beforeunload", () =>
            CardHandler.getInstance().saveCards(),
        );
        return () => {
            window.removeEventListener("beforeunload", () =>
                CardHandler.getInstance().saveCards(),
            );
        };
    }, []);

    return (
        <main className="flex items-center justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom">
            <Chat />
            <Textbar />
            <RecentHistoryDropdown />
            <Topbar />
        </main>
    );
}
