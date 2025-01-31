// "use client";
// import { useSearchParams,useRouter } from 'next/navigation';
// import { X } from 'lucide-react';
// import React from 'react'

// function FilterPills() {
//      const router = useRouter();
//       const searchParams = useSearchParams();
      
//       // Get current filters from URL
//       const currentFinish = searchParams.get('finish');
//       const currentBrand = searchParams.get('brand');
    
//       const handleRemoveFilter = (filterType) => {
//         const params = new URLSearchParams(searchParams.toString());
//         params.delete(filterType);
//         router.push(`?${params.toString()}`);
//       };
//   return (
//      <div className="px-4 flex flex-wrap gap-2 lg:translate-y-2">
//             {currentFinish && (
//               <div className="bg-gray-100 px-3 py-1 rounded-sm text-md flex items-center gap-2 border-2 border-[#008080]">
//                 <span className="text-sm">{decodeURIComponent(currentFinish)}</span>
//                 <button 
//                   onClick={() => handleRemoveFilter('finish')}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                 <X />
//                 </button>
//               </div>
//             )}
//             {currentBrand && (
//               <div className="bg-gray-100 px-3 py-1 rounded-sm text-md flex items-center gap-2 border-2 border-[#008080]">
//                 <span className="text-sm">{decodeURIComponent(currentBrand)}</span>
//                 <button 
//                   onClick={() => handleRemoveFilter('brand')}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                 <X />
//                 </button>
//               </div>
//             )}
//           </div>
//   )
// }

// export default FilterPills

"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import React from 'react';

function FilterPills() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current filters from URL
  const currentFinish = searchParams.get('finish');
  const currentBrand = searchParams.get('brand');

  const formatFilterText = (text) => {
    return decodeURIComponent(text)
      .replace(/[\/-]/g, ' ') // Replace slashes and hyphens with spaces
      .replace(/\s+/g, ' ')   // Replace multiple spaces with single space
      .trim();
  };

  const handleRemoveFilter = (filterType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(filterType);
    router.push(`?${params.toString()}`);
  };

  const handleClearAll = () => {
    router.push('?'); // Clear all query parameters
  };

  const hasFilters = currentFinish || currentBrand;

  return (
    <div className="px-4 flex flex-wrap gap-2 lg:translate-y-2 items-center">
      {currentFinish && (
        <div className="bg-gray-100 px-3 py-1 rounded-sm text-md flex items-center gap-2 border-2 border-[#008080]">
          <span className="text-sm capitalize">
            {formatFilterText(currentFinish)}
          </span>
          <button 
            onClick={() => handleRemoveFilter('finish')}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      )}
      {currentBrand && (
        <div className="bg-gray-100 px-3 py-1 rounded-sm text-md flex items-center gap-2 border-2 border-[#008080]">
          <span className="text-sm capitalize">
            {formatFilterText(currentBrand)}
          </span>
          <button 
            onClick={() => handleRemoveFilter('brand')}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      )}
      
      {hasFilters && (
        <button
          onClick={handleClearAll}
          className="ml-2 text-sm text-[#008080] hover:text-[#006666] flex items-center gap-1"
        >
          <span>Clear All</span>
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default FilterPills;