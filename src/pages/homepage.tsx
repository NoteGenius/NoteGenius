import "@/app/bubble.css";

function HomePage() {
  return (
    <main className="flex flex-col items-center space-y-14 justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom">
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
      <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2">
        <div className="h-6 bg-green-600 rounded-full dark:bg-green-500 w-2/3"></div>
      </div>

      {/* Cool Bubble */}
      <div className="bubble"></div>
    </main>
  );
}

export default HomePage;
