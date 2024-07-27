"use client"; // client hook
import { PageControlProvider } from "@/Core/PageContext";
import Main from "@/Pages/Main";
import { useRef } from "react";

export default function Home() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <Main />
    );
}
