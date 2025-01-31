// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Ubuntu } from 'next/font/google';
// import NavLink from "./NavLink";

// const ubuntu = Ubuntu({
//   subsets: ['latin', 'latin-ext'], // Customize the character set as needed
//   weight: ['400', '700'], // Specify font weights
// });

// const Header = ({navItems}) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   return (
//     <nav className="w-full bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-14">
//         <div className="flex flex-col items-center py-4 gap-y-10 ">
//           {/* Logo */}
//           <div className="flex justify-between w-full">
//             <div className="flex-shrink-0">
//               <a href="/" className="flex items-center gap-x-10">
//                 {/* <div className="w-12 h-12 border-2 border-teal-600 flex items-center justify-center">
//                   <span className="text-[#008080] font-bold text-xl">H&M</span>
//                 </div> */}
//                 <img src="/handmlogo.png" alt="logo"
//                 width={80}
//                 height={80}
//                  />
//                 <span  className={`${ubuntu.className} text-[#008080] text-2xl font-bold`}>
//                   HANDLES & MORE
//                 </span>
//               </a>
//             </div>

//             {/* Search Bar */}
//             <div className=" flex-1 max-w-lg mx-8 justify-center items-center flex">
//               <div className="relative px-2 flex flex-1">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full border-b-2 border-[#008080] py-1 pr-10 focus:outline-none focus:border-teal-600 px-2"
//                   placeholder="Search..."
//                 />
//                 <div className="absolute right-0 top-0 px-2">
//                   {/* <Search className="h-6 w-6 text-gray-400" /> */}
//                   <img src="/searchIcon.png" alt="search-icon" 
//                   className="h-6 w-6 cursor-pointer"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Items */}
//           <NavLink navItems={navItems} />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;


"use client"

import { useState, useEffect } from "react"
import { Ubuntu } from "next/font/google"
import NavLink from "./NavLink"
import { Search, Menu, X, ArrowLeft } from "lucide-react"

const ubuntu = Ubuntu({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
})

const Header = ({ navItems }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isSearchOpen) setIsSearchOpen(false)
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }

    return () => {
      document.body.style.overflow = "visible"
    }
  }, [isMobileMenuOpen])

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
        <div className="flex flex-col items-center py-4 gap-y-10">
          {/* Logo and Mobile Header */}
          <div className="flex justify-between items-center w-full">
            {!isSearchOpen && (
              <div className="flex-shrink-0">
                <a href="/" className="flex items-center gap-x-2 lg:gap-x-10">
                  <img src="/handmlogo.png" alt="logo" width={80} height={80} className="w-10 h-10 lg:w-20 lg:h-20" />
                  <span className={`${ubuntu.className} text-[#008080] text-lg lg:text-2xl font-bold`}>
                    HANDLES & MORE
                  </span>
                </a>
              </div>
            )}

            {/* Mobile Search Bar */}
            {isSearchOpen ? (
              <div className="flex-grow flex items-center lg:hidden">
                <button onClick={toggleSearch} className="mr-2" aria-label="Back">
                  <ArrowLeft className="h-6 w-6 text-[#008080]" />
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-b-2 border-[#008080] py-1 pr-10 focus:outline-none focus:border-teal-600 px-2"
                  placeholder="Search..."
                  autoFocus
                />
              </div>
            ) : (
              <div className="flex items-center lg:hidden">
                <button onClick={toggleSearch} className="p-2" aria-label="Search">
                  <Search className="h-6 w-6 text-[#008080]" />
                </button>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 ml-2"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-[#008080]" />
                  ) : (
                    <Menu className="h-6 w-6 text-[#008080]" />
                  )}
                </button>
              </div>
            )}

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8 justify-center items-center">
              <div className="relative px-2 flex flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-b-2 border-[#008080] py-1 pr-10 focus:outline-none focus:border-teal-600 px-2"
                  placeholder="Search..."
                />
                <div className="absolute right-0 top-0 px-2">
                  <img src="/searchIcon.png" alt="search-icon" className="h-6 w-6 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block w-full">
            <NavLink navItems={navItems} />
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-50 lg:hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <a href="/" className="flex items-center gap-x-2">
                  <img src="/handmlogo.png" alt="logo" width={40} height={40} className="w-10 h-10" />
                  <span className={`${ubuntu.className} text-[#008080] text-lg font-bold`}>HANDLES & MORE</span>
                </a>
                <button onClick={toggleMobileMenu} className="p-2" aria-label="Close menu">
                  <X className="h-6 w-6 text-[#008080]" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100vh-68px)]">
                <NavLink navItems={navItems} isMobile={true} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header

