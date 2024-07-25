"use client"; // client hook
import Topbar from "@/UI/Components/topbar";
import { useRef } from "react";

export default function Home() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom">
      {/* Component for the Top bar of the main page */}
      <Topbar /> 
    </main>
  );
}
