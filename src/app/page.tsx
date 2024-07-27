"use client";
import HomePage from "@/pages/homepage";
import { GoogleAnalytics, event } from "nextjs-google-analytics";
import { useEffect } from "react";

const handleNewUser = () => {
    event('first_open', {
      category: 'User',
      action: 'New User',
      value: 1,
    });
  };

export default function Home() {
  
  useEffect(() => {
    // Check if the user is new
    const isNewUser = !localStorage.getItem('isNewUser');

    // event handling
    if (isNewUser !== false) {
      localStorage.setItem('isNewUser', 'false');
    
      handleNewUser();
      
      // save that they are a new user
      localStorage.setItem('isNewUser', 'true');
    }
  }, []);


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
