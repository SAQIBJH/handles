// 'use client'

// export function ScrollableSection({ children, className = '' }) {
//   return (
//     <div className={`relative ${className} w-full`}>
//       <div className="flex flex-col gap-2 max-h-64 overflow-y-auto w-full pr-4 box-content pl-2 [&::-webkit-scrollbar]:w-0 scroll-smooth">
//         {children}
//       </div>
//       {/* Custom scrollbar track and thumb */}
//       <div className="absolute right-0 translate-x-7 top-10 bottom-0 w-[3px] bg-[#088080] max-h-32 box-content">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1.5 -translate-y-1/2 w-3 h-3 bg-[#fff] rotate-45 border-4 border-[#088080]" />
//       </div>
//     </div>
//   )
// }

"use client"

import { useRef, useState, useEffect } from "react"

export function ScrollableSection({ children, className = "" }) {
  const contentRef = useRef(null)
  const scrollTrackRef = useRef(null)
  const [scrollThumbPosition, setScrollThumbPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startThumbPosition, setStartThumbPosition] = useState(0)

  // Calculate the thumb position based on scroll
  const updateThumbPosition = () => {
    if (!contentRef.current || !scrollTrackRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current
    const trackHeight = scrollTrackRef.current.clientHeight
    const scrollPercentage = scrollTop / (scrollHeight - clientHeight)
    const thumbPosition = scrollPercentage * (trackHeight - 16) // 16px is diamond height

    setScrollThumbPosition(thumbPosition)
  }

  // Handle scroll event
  useEffect(() => {
    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener("scroll", updateThumbPosition)
      return () => contentElement.removeEventListener("scroll", updateThumbPosition)
    }
  }, [])

  // Handle mouse down on thumb
  const handleThumbMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setStartY(e.clientY)
    setStartThumbPosition(scrollThumbPosition)
  }

  // Handle mouse move and up for dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !contentRef.current || !scrollTrackRef.current) return

      const trackHeight = scrollTrackRef.current.clientHeight
      const deltaY = e.clientY - startY
      const newThumbPosition = Math.max(0, Math.min(startThumbPosition + deltaY, trackHeight - 16))

      const scrollPercentage = newThumbPosition / (trackHeight - 16)
      const scrollHeight = contentRef.current.scrollHeight
      const clientHeight = contentRef.current.clientHeight
      contentRef.current.scrollTop = scrollPercentage * (scrollHeight - clientHeight)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, startY, startThumbPosition])

  return (
    <div className={`relative ${className} w-full`}>
      <div
        ref={contentRef}
        className="flex flex-col gap-2 max-h-64 overflow-y-auto w-full pr-4 box-content pl-2 [&::-webkit-scrollbar]:w-0 scroll-smooth"
      >
        {children}
      </div>

      {/* Custom scrollbar track */}
      <div
        ref={scrollTrackRef}
        className="absolute right-0 translate-x-7 top-0 bottom-0 w-[3px] bg-[#088080] h-full box-content"
        onClick={(e) => {
          if (!contentRef.current || !scrollTrackRef.current) return

          const trackRect = scrollTrackRef.current.getBoundingClientRect()
          const clickPosition = e.clientY - trackRect.top
          const trackHeight = trackRect.height
          const scrollPercentage = clickPosition / trackHeight

          const scrollHeight = contentRef.current.scrollHeight
          const clientHeight = contentRef.current.clientHeight
          contentRef.current.scrollTop = scrollPercentage * (scrollHeight - clientHeight)
        }}
      >
        {/* Custom scrollbar thumb */}
        <div
          className="absolute left-1/2 -translate-x-1.5 w-3 h-3 bg-[#fff] rotate-45 border-4 border-[#088080] cursor-pointer"
          style={{ top: `${scrollThumbPosition}px` }}
          onMouseDown={handleThumbMouseDown}
        />
      </div>
    </div>
  )
}

export default ScrollableSection;