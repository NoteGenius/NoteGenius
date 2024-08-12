"use client";
import Topbar from "@/UI/Components/Topbar";

// client hook

/** Main page code */
export default function Home() {
    return (
        <main className="flex items-center justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom">
            <Topbar />
        </main>
    );
}
