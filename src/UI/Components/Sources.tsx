import AIHandler from "@/Core/AIHandler";
import { CardHandler } from "@/Core/CardHandler";
import { OpenSourcesPanelEvent } from "@/Core/ChatEvents";
import { useEffect, useRef, useState } from "react";
import { FaICursor } from "react-icons/fa";
import { FiFileText, FiX, FiYoutube } from "react-icons/fi";

const Sources = () => {
    const isMounted = useRef(false); // Check if the component is mounted
    const [forceRender, setForceRender] = useState(false); // Force rerender when true
    const [isOpen, setIsOpen] = useState(false); // Check if the sources panel is open

    const [selectedSource, setSelectedSource] = useState("file"); // Default is file attachment
    const cardHandler = CardHandler.GetInstance();

    /**
     * Handles opening the sources panel.
     */
    const onOpenPanel = () => {
        setIsOpen(true);
    };
    
    /** 
     * Adds source to current card
     */
    const addSource = (source: string) => {
        cardHandler.currentCard.AddSource(source);
        setForceRender((prev) => !prev);
    }

    useEffect(() => {
    }, [forceRender]);

    // Event listeners
    useEffect(() => {
        if (!isMounted.current) {
            OpenSourcesPanelEvent.Listen(onOpenPanel);

            isMounted.current = true;
        }

        return () => {
            OpenSourcesPanelEvent.RemoveListener(onOpenPanel);
        };
    }, []);
    
    /** 
     * handles submission of the pasted sources
     */
    const handleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            addSource(e.currentTarget.value);
            e.currentTarget.value = ""
        }
    }

    /**
     * fetches youtube transcript (if video exists) and adds it to the current card
     */
    const fetchYoutubeTranscript = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const url = e.currentTarget.value;
            e.currentTarget.value = "";
            try{
                const transcript = await AIHandler.GetInstance().FetchYoutubeTranscript(url);
                addSource(transcript.toString());
            } catch (e) { }
        }
    }


    if (!isOpen) return null; // If the sources panel is not open, don't render anything

    return (
        <>
            {/* Full-screen overlay */}
            <div className="fixed inset-0 w-full h-full bg-black opacity-60 z-50"></div>

            {/* Centered panel */}
            <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="w-3/4 md:w-fit h-fit bg-black text-white rounded-xl shadow-lg p-6">
                    {/* Title and Close Button */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex-grow text-center">
                            <h1 className="text-3xl font-bold">Add Sources</h1>
                        </div>
                        <button
                            className="top-0 right-0 text-4xl text-white hover:text-red-500 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                    </div>


                    {/* Buttons */}
                    <div className="flex justify-around mb-6 py-4">
                        <button
                            className={`flex items-center justify-center w-16 h-16 border-2 rounded-full transition-colors text-3xl ${selectedSource === "file"
                                ? "border-green-800 text-green-800"
                                : "border-green-600 text-green-500 hover:border-green-800 hover:text-green-800"
                                }`}
                            onClick={() => setSelectedSource("file")}
                        >
                            <FiFileText />
                        </button>
                        <button
                            className={`flex items-center justify-center w-16 h-16 border-2 rounded-full transition-colors text-3xl ${selectedSource === "youtube"
                                ? "border-green-800 text-green-800"
                                : "border-green-600 text-green-500 hover:border-green-800 hover:text-green-800"
                                }`}
                            onClick={() => setSelectedSource("youtube")}
                        >
                            <FiYoutube />
                        </button>
                        <button
                            className={`flex items-center justify-center w-16 h-16 border-2 rounded-full transition-colors text-3xl ${selectedSource === "text"
                                ? "border-green-800 text-green-800"
                                : "border-green-600 text-green-500 hover:border-green-800 hover:text-green-800"
                                }`}
                            onClick={() => setSelectedSource("text")}
                        >
                            <FaICursor />
                        </button>
                    </div>

                    {/* Conditionally Rendered Input Sections */}
                    <div className="flex flex-col justify-center items-center">
                        {selectedSource === "file" && (
                            <div className="w-5/6 md:w-[60vh]">
                                <label className="block mb-2">Attach a file (Word or PDF):</label>
                                <input
                                    type="file"
                                    accept=".doc,.docx,.pdf"
                                    className="w-full bg-transparent border-2 border-green-600 p-4 rounded-lg"
                                />
                            </div>
                        )}
                        {selectedSource === "youtube" && (
                            <input
                                type="text"
                                placeholder="Paste YouTube link here..."
                                className="w-5/6 md:w-[60vh] bg-transparent text-white border-2 border-green-600 p-4 rounded-lg"
                                onKeyDown={fetchYoutubeTranscript}
                            />
                        )}
                        {selectedSource === "text" && (
                            <textarea
                                className="w-5/6 md:w-[60vh] h-40 bg-transparent text-white rounded-lg p-4 resize-none border-2 border-green-600"
                                onKeyDown={handleSubmit}
                                placeholder="Paste your sources here..."
                            ></textarea>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sources;
