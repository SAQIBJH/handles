import React from "react";
const images = [
  { id: 1, imageUrl: "/image1.png", alt: "Image 1" }, // Full 1st column image
  { id: 2, imageUrl: "/image2.png", alt: "Image 2" }, // Column 5-7 (row 1-5)
  { id: 3, imageUrl: "/image3.png", alt: "Image 3" }, // Column 5-7 (row 6)
  { id: 4, imageUrl: "/image4.png", alt: "Image 4" }, // Column 8-9 (full row)
  { id: 5, imageUrl: "/image5.png", alt: "Image 5" }, // Column 10-12 (row 1-3)
  { id: 6, imageUrl: "/image6.png", alt: "Image 6" }, // Column 10-12 (row 4-6)
];



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