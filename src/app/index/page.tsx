import React from "react";
import "@/UI/Style/sidebar.css";
import Topbar from "@/UI/Components/Topbar";
import Page, { PagePropsImpl } from "@/UI/Components/Page";

const Main: React.FC<PagePropsImpl> = ({ pageId }) => {
    return (
        <Page id={pageId}>
            <main className="flex items-center justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom">
                <Topbar />
            </main>
        </Page>
    );
};

export default Main;
