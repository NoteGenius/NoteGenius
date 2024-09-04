import React from "react";
import "@/UI/Style/bubble.css";
import "@/UI/Style/grid.css";

const Background = () => {
    return (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-custom-light to-gray-custom grid-pattern z-[-1]">
            {/* Static Green Blob 1 - Top Left */}
            <div className="blob top-[-20px] left-[-150px] hidden lg:block"></div>

            {/* Static Green Blob 2 - Middle Right */}
            <div className="blob top-[30%] right-[-100px] hidden lg:block"></div>
        </div>
    );
};

export default Background;
