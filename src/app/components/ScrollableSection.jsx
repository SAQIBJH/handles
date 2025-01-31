'use client'

export function ScrollableSection({ children, className = '' }) {
  return (
    <div className={`relative ${className} w-full`}>
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto w-full pr-4 box-content pl-2 [&::-webkit-scrollbar]:w-0 scroll-smooth">
        {children}
      </div>
      {/* Custom scrollbar track and thumb */}
      <div className="absolute right-0 translate-x-7 top-10 bottom-0 w-[3px] bg-[#088080] max-h-32 box-content">
        <div className="absolute top-1/2 left-1/2 -translate-x-1.5 -translate-y-1/2 w-3 h-3 bg-[#fff] rotate-45 border-4 border-[#088080]" />
      </div>
    </div>
  )
}

