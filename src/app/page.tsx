"use client";
import Textbar from "@/UI/Components/Textbar";
import Topbar from "@/UI/Components/Topbar";

/** Main page code */
export default function Home() {
    return (
        <main className="flex items-center justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom">
            <Topbar />
            <Textbar />
        </main>
    );
}
