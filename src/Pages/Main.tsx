import React, { useState } from "react";
import "@/UI/Style/sidebar.css";
import Topbar from "@/UI/Components/Topbar";

const Main: React.FC = () => {

    return (
        <main className="flex items-center justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom">
            <Topbar />
        </main>
    )
};

export default Main;