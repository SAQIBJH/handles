"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ScrollableSection } from "./ScrollableSection";
import ProductCard from "./ProductCard";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryPage = ({ productData = [], subcategoryDetails, otherCategories = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // const handleFilter = (type, value) => {
  //   const params = new URLSearchParams(searchParams.toString());

  //   // Toggle filter
  //   if (params.get(type) === value) {
  //     params.delete(type);
  //   } else {
  //     params.set(type, value);
  //   }

  //   router.push(`?${params.toString()}`, { scroll: false });
  // };


  return (
    <section className="max-w-6xl mx-auto p-4 flex gap-20">
      <div className="flex flex-col gap-y-10">
        {/* Finishes Section */}
        <div className="flex flex-col gap-y-2 px-1">
          <h1 className="text-md items-start px-2 text-[#088080] font-bold">
            Finishes
          </h1>
          <div className="border-b-2 border-gray-300 w-full" />
          <ScrollableSection>
            {/* {subcategoryDetails?.Finishes?.map((finish) => (
              <div 
                key={finish?.id} 
                className={`flex items-center gap-2 cursor-pointer p-2 rounded-md ${searchParams.get('finish') === finish.finishslug ? 'bg-gray-200 hover:bg-gray-100' : ''} hover:bg-gray-100`}
                onClick={() => handleFilter('finish', finish.finishslug)}
              >
                <div className="border-2 border-grey-300 p-0.5 flex items-center justify-center">
                  <span
                    style={{ backgroundColor: finish?.color }}
                    className="w-10 h-10 border-2 rounded-full"
                  />
                </div>
                <span className="text-sm">{finish?.title}</span>
              </div>
            ))} */}
            {subcategoryDetails?.Finishes?.map((finish) => (
              <form
                key={finish?.id}
                // action="/category"  // Replace with your actual path
                method="GET"
                className="w-full"
              >
                {/* Preserve existing search parameters */}
                {Array.from(searchParams.entries()).map(([key, value]) => (
                  key !== 'finish' && (
                    <input key={key} type="hidden" name={key} value={value} />
                  )
                ))}

                {/* Toggle input for finish parameter */}
                {searchParams.get('finish') === finish.finishslug ? (
                  <input type="hidden" name="finish" value="" />
                ) : (
                  <input type="hidden" name="finish" value={finish.finishslug} />
                )}

                <button
                  type="submit"
                  className={`flex items-center gap-2 w-full p-2 rounded-md ${searchParams.get('finish') === finish.finishslug
                      ? 'bg-gray-200 hover:bg-gray-200'
                      : 'hover:bg-gray-100'
                    }`}
                >
                  <div className="border-2 border-gray-300 p-0.5 flex items-center justify-center">
                    <span
                      style={{ backgroundColor: finish?.color }}
                      className="w-10 h-10 border-2 rounded-full"
                    />
                  </div>
                  <span className="text-sm">{finish?.title}</span>
                </button>
              </form>
            ))}
          </ScrollableSection>
        </div>

        {/* Brands Section */}
        <div className="flex flex-col gap-y-2 px-1">
          <h1 className="text-md items-start px-2 text-[#088080] font-bold">
            Brands
          </h1>
          <div className="border-b-2 border-gray-300 w-full" />
          <ScrollableSection>
            {/* {subcategoryDetails?.brand?.map((brand, index) => (
              <div 
                key={brand?.id} 
                className={`cursor-pointer flex items-center gap-4  p-2 rounded-md ${searchParams.get('brand') === brand?.brandslug ? 'bg-gray-200 hover:bg-gray-100' : ''} hover:bg-gray-100`}
                onClick={() => handleFilter('brand', brand?.brandslug)}
              >
                <div className="border-2 border-grey-300 p-0.5 flex items-center justify-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${brand?.image?.url}` || null}
                    alt={brand?.title || `Brand ${index}`}
                    width={40}
                    height={40}
                  />
                </div>
                <span className="text-lg">{brand?.title || ""}</span>
              </div>
            ))} */}
            {subcategoryDetails?.brand?.map((brand) => (
              <form
                key={brand?.id}
                method="GET"
                className="w-full"
              >
                {/* Preserve existing parameters except brand */}
                {Array.from(searchParams.entries()).map(([key, value]) => (
                  key !== 'brand' && (
                    <input key={key} type="hidden" name={key} value={value} />
                  )
                ))}

                {/* Toggle brand parameter */}
                {searchParams.get('brand') === brand.brandslug ? (
                  <input type="hidden" name="brand" value="" />
                ) : (
                  <input type="hidden" name="brand" value={brand.brandslug} />
                )}

                <button
                  type="submit"
                  className={`flex items-center gap-4 w-full p-2 rounded-md ${searchParams.get('brand') === brand.brandslug
                      ? 'bg-gray-200 hover:bg-gray-200'
                      : 'hover:bg-gray-100'
                    }`}
                >
                  <div className="border-2 border-gray-300 p-0.5 flex items-center justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${brand?.image?.url}`}
                      alt={brand?.title || `Brand ${brand.id}`}
                      width={40}
                      height={40}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="text-lg">{brand?.title || ""}</span>
                </button>
              </form>
            ))}
          </ScrollableSection>
        </div>

        {/* Other Categories */}
        <div className="flex flex-col gap-y-2">
          <h1 className="text-lg items-start pl-0.5 text-[#088080] font-bold">
            Other Categories
          </h1>
          <div className="border-b-2 border-gray-300 w-full" />
          <div className="flex flex-col gap-y-2 pl-2 text-teal-400">
            {otherCategories?.map((category) => (
              <a
                key={category?.id}
                href={category?.fullslug || "#"}
                className="hover:underline text-md"
              >
                {category?.title}
              </a>
            ))}
          </div>
        </div>
      </div>
      <ProductCard
        products={productData}
        title={subcategoryDetails?.title}
        bannerimage={subcategoryDetails?.bannerimage}
      />
    </section>
  );
};

export default CategoryPage;