import "@/UI/Style/bubble.css";
import "@/UI/Style/grid.css";

export default function SettingsPage() {
    return (
        <main className="flex flex-col items-center space-y-14 justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom grid-pattern">
            {/* NoteGenius png */}
            <div className="relative flex items-center justify-center">
                <img src="/logo.png" alt="NoteGenius" className="w-1/6" />
            </div>

            {/* Title of NoteGenius*/}
            <div className="relative flex items-center justify-center">
                <div className="relative text-white text-6xl font-bold dark:drop-shadow-[0_0_0.5rem_#ffffff70]">
                    NoteGenius
                </div>
            </div>

            {/* Adding half of avalible screen space */}
            <div className="h-1/4"></div>

            {/* Coming soon text */}
            <div className="text-white text-4xl font-bold dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                Under Construction
            </div>
            <div className="h-6 rounded-full dark:bg-[#2a302b] w-1/2">
                <div className="h-6 bg-gradient-to-l from-green-400 to-green-700 rounded-full dark:bg-green-500 w-2/3"></div>
            </div>

            {/* Cool Bubble */}
            <div className="bubble"></div>

            {/* space */}
            <div className="h-1/16"></div>
        </main>
    );
}
