// import React from "react";

// const GridLayout = () => {
//   // Static data for now; replace with API call later
//   const images = [
//     { id: 1, imageUrl: "/image1.png", alt: "Image 1" }, // Full 1st column image
//     { id: 2, imageUrl: "/image2.png", alt: "Image 2" }, // Column 5-7 (row 1-5)
//     { id: 3, imageUrl: "/image3.png", alt: "Image 3" }, // Column 5-7 (row 6)
//     { id: 4, imageUrl: "/image4.png", alt: "Image 4" }, // Column 8-9 (full row)
//     { id: 5, imageUrl: "/image5.png", alt: "Image 5" }, // Column 10-12 (row 1-3)
//     { id: 6, imageUrl: "/image6.png", alt: "Image 6" }, // Column 10-12 (row 4-6)
//   ];

//   return (
//     <div className="grid grid-cols-12 grid-rows-2 gap-4 max-w-6xl mx-auto">
//       {/* First Column: Full 6 rows */}
//       <div className="col-span-4 row-span-1">
//         <img
//           src={images[0].imageUrl}
//           alt={images[0].alt}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Columns 5-7: First image spans 5 rows, second image spans 1 row */}
//       <div className="grid col-span-3 gap-y-2">

//       <div className="row-span-3">
//         <img
//           src={images[1].imageUrl}
//           alt={images[1].alt}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="row-span-1">
//         <img
//           src={images[2].imageUrl}
//           alt={images[2].alt}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       </div>

//       {/* Columns 8-9: One image spans the full 6 rows */}
//       <div className="col-span-2 row-span-1">
//         <img
//           src={images[3].imageUrl}
//           alt={images[3].alt}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Columns 10-12: First image spans 3 rows, second image spans 3 rows */}
//       <div className="grid col-span-3 gap-y-2">

//       <div className="row-span-1">
//         <img
//           src={images[4].imageUrl}
//           alt={images[4].alt}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="row-span-1">
//         <img
//           src={images[5].imageUrl}
//           alt={images[5].alt}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       </div>
//     </div>
//   );
// };

// export default GridLayout;

import React from "react";
const images = [
  { id: 1, imageUrl: "/image1.png", alt: "Image 1" }, // Full 1st column image
  { id: 2, imageUrl: "/image2.png", alt: "Image 2" }, // Column 5-7 (row 1-5)
  { id: 3, imageUrl: "/image3.png", alt: "Image 3" }, // Column 5-7 (row 6)
  { id: 4, imageUrl: "/image4.png", alt: "Image 4" }, // Column 8-9 (full row)
  { id: 5, imageUrl: "/image5.png", alt: "Image 5" }, // Column 10-12 (row 1-3)
  { id: 6, imageUrl: "/image6.png", alt: "Image 6" }, // Column 10-12 (row 4-6)
];

// const GridLayout = () => {
//   if (!images?.length || images.length < 6) {
//     return <div>Please provide at least 6 images</div>;
//   }

//   const gridSections = [
//     { colSpan: 4, rowSpan: 1, items: 1 },
//     {
//       colSpan: 3,
//       items: 2,
//       rowConfig: [
//         { span: 3 }, // First image spans 5 rows
//         { span: 1 }, // Second image spans 1 row
//       ],
//     },
//     { colSpan: 2, rowSpan: 1, items: 1 },
//     {
//       colSpan: 3,
//       items: 2,
//       rowConfig: [
//         { span: 1 }, // First image spans 5 rows
//         { span: 1 }, // Second image spans 1 row
//       ],
//     },
//   ];

//   let currentIndex = 0;

//   return (
//     <section className="max-w-6xl mx-auto  gap-x-4 justify-center items-center p-4 gap-y-8 grid ">
//       <h1 className="flex justify-center text-4xl text-[#008080] font-bold">
//         Lookbook
//       </h1>

//       <div className="grid grid-cols-12 grid-rows-2 gap-4 max-w-6xl mx-auto">
//         {gridSections.map((section, sectionIndex) => {
//           const sectionImages = images.slice(
//             currentIndex,
//             currentIndex + section.items
//           );
//           currentIndex += section.items;

//           if (section.rowConfig) {
//             return (
//               <div
//                 key={sectionIndex}
//                 className={`grid col-span-${section.colSpan} gap-y-2`}
//               >
//                 {sectionImages.map((image, imageIndex) => (
//                   <div
//                     key={image.id}
//                     className={`row-span-${section.rowConfig[imageIndex].span}`}
//                   >
//                     <img
//                       src={image.imageUrl}
//                       alt={image.alt}
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   </div>
//                 ))}
//               </div>
//             );
//           }

//           return (
//             <div
//               key={sectionIndex}
//               className={`${section.items > 1 ? "grid gap-y-2" : ""} col-span-${
//                 section.colSpan
//               } row-span-${section.rowSpan}`}
//             >
//               {sectionImages.map((image) => (
//                 // <div key={image.id}>
//                 <img
//                   src={image.imageUrl}
//                   alt={image.alt}
//                   className="w-full h-full object-cover rounded-lg"
//                   key={image.id}
//                 />
//                 // {/* </div> */}
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default GridLayout;

const GridLayout = () => {
    if (!images?.length || images.length < 6) {
      return <div>Please provide at least 6 images</div>;
    }
  
    const gridSections = [
      { colSpan: 4, rowSpan: 1, items: 1 },
      { 
        colSpan: 3, 
        items: 2,
        rowConfig: [
          { span: 3 },
          { span: 1 }
        ]
      },
      { colSpan: 2, rowSpan: 1, items: 1 },
      { 
        colSpan: 3,  
        items: 2, 
        rowConfig: [
          { span: 1 },
          { span: 1 }
        ] 
      }
    ];
  
    let currentIndex = 0;
  
    return (
      <section className="w-full max-w-6xl mx-auto p-4 space-y">
        <h3 className="text-4xl text-[#008080] font-bold text-center mb-12">Lookbook</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12  gap-4">
          {gridSections.map((section, sectionIndex) => {
            const sectionImages = images.slice(currentIndex, currentIndex + section.items);
            currentIndex += section.items;
  
            if (section.rowConfig) {
              return (
                <div key={sectionIndex} className={`grid gap-4 col-span-1 sm:col-span-2 md:col-span-${section.colSpan}`}>
                  {sectionImages.map((image, imageIndex) => (
                    <div 
                      key={image.id} 
                      className={`md:row-span-${section.rowConfig[imageIndex].span}`}
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.alt}
                        className="w-full h-64 md:h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              );
            }
  
            return (
              <div 
                key={sectionIndex} 
                className={`${section.items > 1 ? 'grid gap-4' : ''} col-span-1 sm:col-span-2 md:col-span-${section.colSpan} md:row-span-${section.rowSpan}`}
              >
                {sectionImages.map((image) => (
                  <img
                    key={image.id}
                    src={image.imageUrl}
                    alt={image.alt}
                    className="w-full h-64 md:h-full object-cover rounded-lg"
                  />
                ))}
              </div>
            );
          })}
        </div>
      </section>
    );
  };
  
  export default GridLayout;