"use client"
import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"

const NavLink = ({ navItems, isMobile = false }) => {
  const [openMenus, setOpenMenus] = useState({})
  const [hoverMenu, setHoverMenu] = useState(null)
  const dropdownRefs = useRef({})
  const isClickOpenRef = useRef({})

  const pathname = usePathname()

  const pathSegments = pathname?.split("/") || []
  const isDoorHandlesActive = pathSegments[1] === "handles" && pathSegments[2] === "door-handles"
  const currentSection = pathSegments[1]?.replace(/-/g, " ")?.toUpperCase()
  const isBrandsSection = currentSection === "BRANDS" || currentSection === "CATALOGUES"

  useEffect(() => {
    if (isMobile) return // Skip for mobile layout

    const handleClickOutside = (event) => {
      Object.entries(dropdownRefs.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setOpenMenus((prev) => ({ ...prev, [key]: false }))
          isClickOpenRef.current[key] = false
        }
      })
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile])

  const handleMouseEnter = (title) => {
    if (!isMobile && navItems.find((item) => item.title === title)?.submenu?.length > 0) {
      setHoverMenu(title)
    }
  }

  const handleMouseLeave = (e, title) => {
    if (isMobile) return

    const dropdownRef = dropdownRefs.current[title]
    if (!dropdownRef) return

    const rect = dropdownRef.getBoundingClientRect()
    const isInDropdown =
      e.clientY >= rect.top && e.clientY <= rect.bottom && e.clientX >= rect.left && e.clientX <= rect.right

    if (!isInDropdown) {
      setHoverMenu(null)
    }
  }

  const handleDropdownMouseLeave = () => {
    if (!isMobile) {
      setHoverMenu(null)
    }
  }

  const handleClick = (title) => {
    if (navItems && navItems?.find((item) => item.title === title)?.submenu?.length > 0) {
      setOpenMenus((prev) => ({
        ...prev,
        [title]: !prev[title],
      }))
      isClickOpenRef.current[title] = !isClickOpenRef.current[title]
    }
  }

  const isMenuOpen = (title) => {
    return openMenus[title] || (!isMobile && hoverMenu === title)
  }

  const isItemActive = (item) => {
    if (item.title === "DOOR HANDLES") {
      return isDoorHandlesActive
    }
    if (item.title === "HANDLES") {
      return currentSection === "HANDLES" && !isDoorHandlesActive
    }
    if (item.title === "BRANDS") {
      return isBrandsSection
    }
    return item.title === currentSection
  }

  if (!navItems) return null

  return (
    <div className={`${isMobile ? "flex flex-col space-y-4" : "flex justify-around items-center w-full px-8"}`}>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`relative ${isMobile ? "w-full" : ""}`}
          ref={(el) => (dropdownRefs.current[item.title] = el)}
          onMouseEnter={() => handleMouseEnter(item.title)}
          onMouseLeave={(e) => handleMouseLeave(e, item.title)}
        >
          <div
            className={`flex items-center gap-1 cursor-pointer ${isMobile ? "justify-between" : ""}`}
            onClick={() => handleClick(item.title)}
          >

            <a
              href={item.submenu && item.submenu.length > 0 ? "#" : item.url || "#"}
              onClick={(e) => {
                if (item.submenu && item.submenu.length > 0) {
                  e.preventDefault();
                }
              }}
              className={`text-sm tracking-widest font-normal flex justify-between items-center gap-1 ${isMobile ? "w-full py-2" : ""
                } ${isItemActive(item)
                  ? "bg-[#008080] text-white underline py-1.5 px-3 ease-in-out"
                  : "text-[#008080] hover:text-teal-600 hover:underline"
                }`}
            >
              <span>{item.title}</span>
              {item.submenu && item.submenu.length > 0 && (
                <div className="flex items-center">
                  {isMobile ? (
                    <ChevronRight
                      className={`h-4 w-4 ${isItemActive(item) ? "text-white" : "text-[#008080]"
                        } transition-transform duration-200 ${isMenuOpen(item.title) ? "rotate-90" : ""
                        }`}
                    />
                  ) : (
                    <ChevronDown
                      className={`h-4 w-4 ${isItemActive(item) ? "text-white" : "text-[#008080]"
                        } transition-transform duration-200 ${isMenuOpen(item.title) ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </div>
              )}
            </a>
          </div>

          {item.submenu && item.submenu.length > 0 && isMenuOpen(item.title) && (
            <div
              className={`${isMobile ? "mt-2 ml-4" : "absolute top-full -left-2 pt-2 w-36"} z-10`}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <div className={`${isMobile ? "" : "bg-white shadow-lg rounded-md overflow-hidden"} z-50`}>
                {item.submenu.map((subitem) => (
                  <a
                    key={subitem.id}
                    href={subitem.url}
                    className={`block px-4 py-2 text-sm text-[#008080] ${isMobile ? "hover:underline" : "hover:bg-teal-50 hover:text-teal-600"}
                      ${subitem.title === "Door Handles" && isDoorHandlesActive ? "bg-teal-50 text-teal-600" : ""}`}
                  >
                    {subitem.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default NavLink

