"use client";
import React, { useEffect, useRef } from "react";
import { ScrollableSection } from "./ScrollableSection";
import BrandProductCard from "./BrandProductPage";
import { useRouter, useSearchParams } from "next/navigation";

const BrandsPage = ({ bannerimage = {}, image = {}, description = "", brandProductData = [], brandFinishes = [], brandCategories = [] }) => {

    // const router = useRouter();
    // const searchParams = useSearchParams();

    // const handleFilter = (type, value) => {
    //     const params = new URLSearchParams(searchParams.toString());

    //     // Toggle filter
    //     if (params.get(type) === value) {
    //         params.delete(type);
    //     } else {
    //         params.set(type, value);
    //     }

    //     router.push(`?${params.toString()}`, { scroll: true });

    // };

    const router = useRouter();
    const searchParams = useSearchParams();
    const productCardRef = useRef(null);
    const initialLoad = useRef(true);

    const handleFilter = (type, value) => {
        const params = new URLSearchParams(searchParams.toString());

        // Toggle filter
        if (params.get(type) === value) {
            params.delete(type);
        } else {
            params.set(type, value);
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };

    // Scroll to product section when filters change
    // useEffect(() => {
    //     if (initialLoad.current) {
    //         initialLoad.current = false;
    //         return;
    //     }
        
    //     if (productCardRef.current) {
    //         productCardRef.current.scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'start',
    //             inline: 'nearest',

    //         });
    //     }
    // }, [searchParams]);

    return (
        <>
            <div className="flex flex-col items-center justify-center ">
                <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${image?.url}`}
                    alt={image?.alt}
                    className="h-[200px] object-fill bg-white mix-blend-hard-light"
                />
            </div>
            <section className="max-w-6xl mx-auto p-4 flex  gap-20 ">

                <div className="flex flex-col gap-y-10">
                    {/* Finishes Section */}
                    {/* <div className="flex flex-col gap-y-2 px-1">
          <h1 className="text-lg items-start px-2 text-[#088080] font-bold">
            Finishes
          </h1>
          <div className="border-b-2 border-gray-300 w-full" />
          <ScrollableSection>
            {brandFinishes &&
              brandFinishes.length > 0 &&
              brandFinishes?.map((finish) => (
                <div key={finish?.id} className="flex items-center gap-2">
                  <div className="border-2 border-grey-300 p-0.5 flex items-center justify-center">
                    <span
                      style={{ backgroundColor: finish?.color }}
                      className={`w-10 h-10 border-2 rounded-full `}
                    />
                  </div>
                  <span className="text-sm">{finish?.title}</span>
                </div>
              ))}
          </ScrollableSection>
        </div> */}

                    <div className="flex flex-col gap-y-2 px-1">
                        <h1 className="text-md items-start px-2 text-[#088080] font-bold">
                            Finishes
                        </h1>
                        <div className="border-b-2 border-gray-300 w-full" />
                        <ScrollableSection>
                            {brandFinishes &&
                                brandFinishes.length > 0 && brandFinishes?.map((finish) => (
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
                                ))}
                        </ScrollableSection>
                    </div>


                    {/* Other Categories */}
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-lg items-start pl-0.5 text-[#088080] font-bold">
                            Categories
                        </h1>
                        <div className="border-b-2 border-gray-300 w-full" />
                        <div className="flex flex-col gap-y-2 pl-2 text-teal-400">
            {brandCategories &&
              brandCategories?.length > 0 &&
              brandCategories?.map((category) => (
                <a
                  key={category?.id}
                  href={category?.fullslug || "#"}
                  className="hover:underline text-lg"
                >
                  {category?.title}
                </a>
              ))}
                        </div>
                    </div>
                </div>
                <BrandProductCard bannerimage={bannerimage} description={description} brandProductData={brandProductData} productCardRef={productCardRef} />
            </section>
        </>
    );
};

export default BrandsPage;
