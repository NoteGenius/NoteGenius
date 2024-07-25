"use client"; // client hook
import Topbar from "@/UI/Components/topbar";
import { useRef } from "react";

export default function Home() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom">
      {/* Component for the Top bar of the main page */}
      <Topbar />

      {/* Typing bar */}

      <div
        style={{ width: "70vw" }}
        className="mx-auto flex bottom-2 absolute justify-center items-center p-4"
      >
        <button className="rounded-lg px-4 mr-4 bg-white">
          <img src="/plus.png" alt="Add" className="h-8 w-8" />
        </button>
        <textarea
          ref={textareaRef}
          onInput={() => {
            if (textareaRef.current) {
              textareaRef.current.style.height = "auto";
              textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
          }}
          style={{ resize: "none" }}
          className="w-full rounded-lg px-4 py-2 bg-white text-black font-sans"
          placeholder="Type here..."
        />
      </div>
    </main>
  );
}
