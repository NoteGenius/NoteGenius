"use client"; // client hook
import { PageControlProvider, usePageManager } from "@/Core/PageContext";
import TestPage from "@/Pages/Test";

export default function Home() {

    const { navigateToPage } = usePageManager(initPages);

    return (
        <PageControlProvider 
            defaultPage="test"
            navigateToPage={navigateToPage}
        />
    );
}

const initPages = [
    <TestPage key="test"/>,
]
