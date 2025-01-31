// 'use client';

// import React, { useState } from 'react';

// export default function ThumbnailGallery({ thumbimage }) {
//   if (!thumbimage) return null;
  
//   const [selectedImage, setSelectedImage] = useState(
//     thumbimage[0]?.url ? `${process.env.NEXT_PUBLIC_API_URL}${thumbimage[0].url}` : null
//   );

//   const handleThumbnailClick = (thumbnailId) => {
//     console.log("thumbnailId", thumbnailId);
//     const imageUrl = thumbimage.find((thumbnail) => thumbnail.id === thumbnailId)?.url;
//     if (imageUrl) {
//       setSelectedImage(`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`);
//     }
//   };

//   return (
//     <div className="flex p-8 w-full gap-x-8">
//       {/* Left Side: Thumbnails */}
//       <div className="w-[10%] gap-y-8 flex flex-col">
//         {thumbimage && thumbimage.length > 0 && thumbimage.map((thumbnail) => (
//           <div
//             key={thumbnail.id}
//             className="relative cursor-pointer rounded-2xl transition-all duration-200 hover:scale-105"
//             onClick={() => handleThumbnailClick(thumbnail.id)}
//           >
//             <div
//               className={`absolute inset-0 rounded-2xl ${
//                 selectedImage === `${process.env.NEXT_PUBLIC_API_URL}${thumbnail.url}`
//                   ? "ring-4 ring-black ring-offset-2"
//                   : "hover:ring-2 hover:ring-gray-300"
//               }`}
//             />
//             <img
//               src={`${process.env.NEXT_PUBLIC_API_URL}${thumbnail?.url}`}
//               alt={thumbnail.title}
//               className="w-full h-[120px] rounded-2xl object-cover"
//               title="Click to view image"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Right Side: Large Image */}
//       <div className="w-5/6">
//         {selectedImage && (
//           <div className="relative rounded-lg overflow-hidden">
//             <div className={`absolute inset-0 rounded-lg ring-4 ring-blue-500 ring-offset-4`} />
//             <img
//               src={selectedImage}
//               alt="Selected Image"
//               className="w-full h-[550px] rounded-lg object-cover"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client"

import React, { useState } from "react"

export default function ThumbnailGallery({ thumbimage }) {
  const [selectedImage, setSelectedImage] = useState(
    thumbimage?.[0]?.url ? `${process.env.NEXT_PUBLIC_API_URL}${thumbimage[0].url}` : null,
  )

  if (!thumbimage) return null

  const handleThumbnailClick = (thumbnailId) => {
    const imageUrl = thumbimage.find((thumbnail) => thumbnail.id === thumbnailId)?.url
    if (imageUrl) {
      setSelectedImage(`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`)
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full p-4 md:p-8 gap-4 md:gap-8">
      {/* Thumbnails for larger screens */}
      <div className="hidden md:flex md:w-1/5 lg:w-[10%] flex-col gap-8">
        {thumbimage &&
          thumbimage.length > 0 &&
          thumbimage.map((thumbnail) => (
            <div
              key={thumbnail.id}
              className="relative cursor-pointer rounded-2xl transition-all duration-200 hover:scale-105"
              onClick={() => handleThumbnailClick(thumbnail.id)}
            >
              <div
                className={`absolute inset-0 rounded-2xl ${
                  selectedImage === `${process.env.NEXT_PUBLIC_API_URL}${thumbnail.url}`
                    ? "ring-4 ring-black ring-offset-2"
                    : "hover:ring-2 hover:ring-gray-300"
                }`}
              />
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${thumbnail?.url}`}
                alt={thumbnail.title}
                className="w-full h-[120px] rounded-2xl object-cover"
                title="Click to view image"
              />
            </div>
          ))}
      </div>

      {/* Main Image */}
      <div className="w-full md:w-4/5 lg:w-[90%]">
        {selectedImage && (
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 rounded-lg" />
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Selected Image"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      {/* Thumbnails for smaller screens */}
      <div className="md:hidden w-full overflow-x-auto p-2">
        <div className="flex gap-4">
          {thumbimage &&
            thumbimage.length > 0 &&
            thumbimage.map((thumbnail) => (
              <div
                key={thumbnail.id}
                className="relative cursor-pointer rounded-lg transition-all duration-200 hover:scale-105 flex-shrink-0"
                onClick={() => handleThumbnailClick(thumbnail.id)}
              >
                <div
                  className={`absolute inset-0 rounded-lg ${
                    selectedImage === `${process.env.NEXT_PUBLIC_API_URL}${thumbnail.url}`
                      ? "ring-2 ring-black ring-offset-2"
                      : "hover:ring-2 hover:ring-gray-300"
                  }`}
                />
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${thumbnail?.url}`}
                  alt={thumbnail.title}
                  className="w-20 h-20 rounded-lg object-cover"
                  title="Click to view image"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

