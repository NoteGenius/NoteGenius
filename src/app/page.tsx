"use client";
import HomePage from "@/pages/homepage";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function Home() {
    return (
        <div>
            <HomePage />

            {/* Google Analytics */}
            <GoogleAnalytics
                trackPageViews
                strategy="lazyOnload"
                gaMeasurementId="G-L69D1WD0W5"
            />
        </div>
    );
}
