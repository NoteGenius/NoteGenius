"use client"; // client hook
import { useState } from "react";
import './sidebar.css';

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24">
      
      {/* Title of NoteGenius*/}
      // <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-green-500 after:via-green-600 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-green-700 before:dark:opacity-10 after:dark:to-green-900 after:to-green-600 after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      //   <div className="relative text-white text-4xl font-bold dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
      //     NoteGenius
      //   </div>
      // </div>

//       {/* add some space between the name of the site and the other content */}
//       <div className="h-40" />

//       {/* Description of NoteGenius */}

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Explore starter templates for Next.js.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }

export default function Home() {
    const [isOpen, setIsOpen] = useState(false); // state for the sidebar

    return (
        <main className="flex items-center justify-center h-screen bg-gradient-to-t from-gray-custom-light to-gray-custom">



              {/* transitioning hamburger button (for mobile devices*/}
              <nav className={`navbar ${isOpen ? 'open' : ''} md:hidden fixed top-0 right-0 m-4`}>
                <button onClick={() => setIsOpen(!isOpen)}>
                  <img src="/hamburgerbutton.png" alt="Menu" className="w-8 h-8 mt-1.5 mr-4" />
                </button>
              </nav>





              {/* Sidebar that is reactive uses sidebar.css*/}
              <div className={`sidebar ${isOpen ? 'open' : ''} md:hidden`}>
                <div className="fixed top-0 left-0 w-full h-full bg-[#1B1B1B] p-4 overflow-auto ">


                  {/* FasFabar for leaving the sidebar */}
                  <nav className="md:hidden fixed right-0 top-0 m-4" style={{ marginLeft: 'auto' }}>
                    <button onClick={() => setIsOpen(!isOpen)}>
                      <img src="/hamburgerbutton.png" alt="Menu" className="w-8 h-8 mt-1.5 mr-4" />
                    </button>
                  </nav>
                  <div className="flex flex-col items-center">

                    {/* Title of NoteGenius*/}
                    <div className="mt-12 mb-20 relative flex place-items-center before:absolute before:h-[20px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[20px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-green-500 after:via-green-600 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-green-700 before:dark:opacity-100 after:dark:to-green-900 after:to-green-600 after:dark:opacity-100 before:lg:h-[20px] z-[-1]">
                      <div className="relative text-white text-4xl font-bold dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                        NoteGenius
                      </div>
                    </div>

                    {/* Navigation components inside sidebar */}
                    <ul className="space-y-4 text-xl underline ">
                      <li><a href="/support" className="text-white flex">
                        <img src="/support.png" alt="Support" className="h-8 w-8 mr-2 -mt-0.5" />
                        Support
                      </a></li>
                      <li><a href="/subscribe" className="text-white flex -ml-1.5ww">
                        <img src="/subscribe.webp" alt="Subscribe" className="h-10 w-10 mr-2 -mt-1.5 -ml-1.5" />
                        Subscribe
                      </a></li>
                      <li><a href="/settings" className="text-white flex">
                        <img src="/settings.png" alt="Settings" className="h-8 w-8 mr-2 -mt-0.5" />
                        Settings
                      </a></li>
                    </ul>
                  </div>
                </div>
              </div>




              {/* Desktop top bar when not on mobile device */}
              <div className = "hidden md:flex">
                <div className="fixed top-0 left-0 right-0 bg-[#1B1B1B] p-4">
                  <div className="flex items-center py-3 ml-5">

                    {/* Text of NoteGenius with green background */}
                    <div className="relative flex place-items-center before:absolute before:h-[20px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[20px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-green-500 after:via-green-600 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-green-700 before:dark:opacity-100 after:dark:to-green-900 after:to-green-600 after:dark:opacity-100 before:lg:h-[20px] z-[-1]">
                      <div className="relative text-white text-4xl font-bold dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                        NoteGenius
                      </div>
                    </div>

                    {/* Navigation components inside top bar */}
                    <nav className="hidden md:flex" style={{ marginLeft: 'auto' }}>
                      <ul className="flex space-x-4 text-xl underline">
                        <li><a href="/support" className="text-white px-4 flex">
                          <img src="/support.png" alt="Support" className="h-8 w-8 mr-2 -mt-0.5" />
                          Support
                        </a></li>
                        <li><a href="/subscribe" className="text-white px-4 flex">
                          <img src="/subscribe.webp" alt="Subscribe" className="h-10 w-10 mr-2 -mt-1.5" />
                          Subscribe
                        </a></li>
                        <li><a href="/settings" className="text-white px-4 flex">
                          <img src="/settings.png" alt="Settings" className="h-8 w-8 mr-2 -mt-0.5" />
                          Settings
                        </a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
        </main>
    );
}