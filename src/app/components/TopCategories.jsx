import React from "react";

// Simulated data from the backend (without the cols field)
const categoriesFromBackend = [
  { title: "Furniture Handles", image: "/image1.png" },
  { title: "Bathroom Handles", image: "/image2.png" },
  { title: "Locks", image: "/image4.png" },
  { title: "Door Handles", image: "/image8.png" },
  { title: "Door Knobs", image: "/image5.png" },
  { title: "Sliding Doors", image: "/image3.png" },
  { title: "Pull Handles", image: "/image4.png" },
];

const CategoryGrid = () => {
  // Define the column and row spans separately
  const layout = [
    "col-span-12 md:col-span-3 row-span-1",
    "col-span-12 md:col-span-5 row-span-1",
    "col-span-6 md:col-span-2  row-span-1",
    "col-span-6 md:col-span-2  md:row-span-1 lg:row-span-2",
    "col-span-12 md:col-span-4 row-span-1",
    "col-span-6 md:col-span-3 row-span-1",
    "col-span-6 md:col-span-3 row-span-1",
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-semibold text-[#008080] text-center mb-12">
        Top Categories
      </h1>

      <div className="grid grid-cols-12 gap-4 grid-rows-2 h-auto md:h-[580px]">
        {categoriesFromBackend.map((category, index) => (
          <div
            key={index}
            className={`relative group cursor-pointer ${layout[index]} `}
          >
            <div className="relative h-full overflow-hidden rounded-lg">
              <img
                src={category.image || null}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40">
                <h2 className="absolute bottom-6 left-6 text-white text-2xl font-light">
                  {category.title}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;