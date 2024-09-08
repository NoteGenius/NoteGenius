import AIHandler from "@/Core/AIHandler";
import { CardHandler } from "@/Core/CardHandler";
import { OpenSourcesPanelEvent } from "@/Core/ChatEvents";
import { useEffect, useRef, useState } from "react";
import { FaICursor } from "react-icons/fa";
import { FiFileText, FiTrash2, FiX, FiYoutube } from "react-icons/fi";

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

import mammoth from 'mammoth';

const Sources = () => {
    const isMounted = useRef(false); // Check if the component is mounted
    const [forceRender, setForceRender] = useState(false); // Force rerender when true
    const cardHandler = CardHandler.GetInstance();

    const [isOpen, setIsOpen] = useState(false); // Check if the sources panel is open

    const [selectedSource, setSelectedSource] = useState("file"); // Default is file attachment
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Selected files for upload

    /**
     * Handles opening the sources panel.
     */
    const onOpenPanel = () => {
        setIsOpen(true);
    };

    /** 
     * Adds source to current card
     */
    const addSource = async (source: string) => {
        await cardHandler.currentCard.AddSource(source);
        setForceRender(true);
    }

    const deleteSource = (source: string) => {
        cardHandler.currentCard.RemoveSource(source); // Assuming a RemoveSource method exists
        setForceRender((prev) => !prev); // Force re-render after deleting the source
    };

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
            try {
                const transcript = await AIHandler.GetInstance().FetchYoutubeTranscript(url);
                addSource(transcript.toString());
            } catch (e) { }
        }
    }

    /** 
     * Handles file upload
     */
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]); // Add files to the state
    }

    /**
     * Extracts text from PDF and DOCX files and adds it to the current card as a source 
     * 
     * @param e - file upload event
     */
    const handleSubmitFiles = async (_: React.MouseEvent<HTMLButtonElement>) => {
        if (selectedFiles.length === 0) return;

        for (const file of selectedFiles) {

            if (!file) return;

            let extractedText = ''; // stores the extracted text

            if (file.type === 'application/pdf') { // handling pdf files
                const fileBuffer = await file.arrayBuffer();
                const pdf = await pdfjs.getDocument({ data: fileBuffer }).promise;

                // Extract text from each page of the PDF
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();

                    const pageText = textContent.items.map((item: any) => item.str).join(' ');
                    extractedText += pageText + ' ';
                }
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { // handling docx files
                const arrayBuffer = await file.arrayBuffer();
                const docText = await mammoth.extractRawText({ arrayBuffer });
                extractedText = docText.value;
            } else { // unsupported file type
                alert('Unsupported file type. Please upload a PDF or Word document.');
                return;
            }

            // Add the extracted text to the current card as a source
            console.log(extractedText);
            addSource(extractedText);
        }

        setSelectedFiles([]);
    };


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
                            <>
                                <div className="w-5/6 md:w-[60vh]">
                                    <label className="block mb-2">Attach a file (Word or PDF):</label>
                                    <input
                                        type="file"
                                        accept=".doc,.docx,.pdf"
                                        className="w-full bg-transparent border-2 border-green-600 p-4 rounded-lg"
                                        onChange={handleFileUpload}
                                    />
                                </div>
                                
                                {/* List of selected files */}
                                {selectedFiles.length > 0 && (
                                    <div className="w-full bg-transparent text-white border-2 border-green-600 p-4 rounded-lg">
                                        <h3>Selected Files:</h3>
                                        <ul>
                                            {selectedFiles.map((file, index) => (
                                                <li key={index}>{file.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Submit Button */}
                                {selectedFiles.length > 0 && (
                                    <button
                                        className="mt-4 bg-green-600 text-white p-2 rounded-lg"
                                        onClick={handleSubmitFiles} // Submit all attached files
                                    >
                                        Submit Files
                                    </button>
                                )}
                            </>
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

                        {/* Display Current Sources */}
                        {cardHandler.currentCard.sources.size > 0 && (
                            <div className="mt-6 w-full border-2 border-green-600 rounded-xl p-2">
                                <h3 className="text-xl mb-4">Current Sources:</h3>
                                <ul>
                                    {Array.from(cardHandler.currentCard.sources.entries()).map(([summary, _], index) => (
                                        <li key={index} className="flex justify-between items-center mb-2 p-2 bg-transparent rounded-lg hover:bg-green-500 hover:bg-opacity-25 transition-all">
                                            <span>{summary}</span>
                                            <button
                                                className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                                                onClick={() => deleteSource(summary)}
                                            >
                                                <FiTrash2 className="text-xl" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sources;
