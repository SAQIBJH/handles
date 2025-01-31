"use client";
import React, { useState } from "react";

function renderDescription(data) {
  if (!data || !data.root || !data.root.children) {
    return null; // Handle missing or invalid data
  }

  return data.root.children.map((node, index) => {
    if (node.type === "paragraph" && node.children) {
      return (
        <p key={index} className="text-sm text-gray-700 leading-relaxed">
          {node.children
            .filter((child) => child.type === "text")
            .map((child, childIndex) => child.text)
            .join(" ")}
        </p>
      );
    }
    return null; // Ignore unsupported node types
  });
}


export default function ProductPage({ productData }) {
  if(!productData) return null
  const [selectedFinish, setSelectedFinish] = useState(
    productData?.Finishes[0]?.code || null
  );
  const [isTechDocsOpen, setIsTechDocsOpen] = useState(false);
  const [isCompleteCollection, setIsCompleteCollection] = useState(false);

  return (
    <>
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="relative">
            <div className="bg-gray-50 rounded-lg p-2">
              <img
                src={
                  `${process.env.NEXT_PUBLIC_API_URL}${productData?.image?.url}` ||
                  null
                }
                alt={productData?.title}
                className="w-full h-auto"
              />
            </div>
            {productData?.isNew && (
              <span className="absolute top-4 left-4 bg-pink-500 text-white px-2 py-1 text-xs font-semibold rounded">
                NEW
              </span>
            )}
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl  font-normal font-sans tracking-wide mb-2 uppercase">
              {productData?.title}
            </h2>
            <div className="text-gray-600  flex flex-col gap-1">
              <p>{productData.designer}</p>
              <p className="font-medium">{productData?.code}</p>
            </div>
            <p className="text-gray-500 text-base mb-4">{renderDescription(productData.description)}
              </p>

            <div className="h-[0.5px] bg-gray-500"></div>

            {/* Finishes Section */}
            <div className="flex flex-col gap-8 mb-8">
              <h2 className="text-base font-semibold font-sans tracking-wide mb-4 text-[#686868]">
                FINISHES
              </h2>
              <div className="flex gap-4">
                {productData?.Finishes?.map((finish) => (
                  <button
                    key={finish?.id}
                    title={finish?.title}
                    onClick={() => setSelectedFinish(finish.code)}
                    className={`relative flex flex-col items-center space-y-2 group w-fit p-1 ${
                      selectedFinish === finish.code
                        ? "ring-2 ring-offset-2"
                        : ""
                    }`}
                    style={
                      selectedFinish === finish.code && finish?.color
                        ? { boxShadow: `0 0 0 2px ${finish?.color}`, borderRadius: "10%" }
                        : {}
                    }
                  >
                    {/* Circle with finish color */}
                    <div
                      className="w-8 h-8 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: finish?.color }}
                    />
                    {/* Finish code displayed below */}
                    <span className="text-xs font-medium">{finish?.code}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[0.5px] bg-gray-700"></div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-8 p-2">
              {productData?.specifications?.map((spec, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-2 text-sm">{spec.label}</h3>
                  <p className="text-gray-600 text-sm">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Documentation Section */}
      <div className="max-w-7xl p-8 flex flex-col gap-8 mx-auto">
        <div className="flex items-center flex-col">
          <h2 className="text-lg font-normal text-[#303030] flex tracking-wider uppercase font-sans items-center w-full justify-between">
            Technical Documentation
            <button
              className={`text-[#303030] ${
                isTechDocsOpen ? "text-5xl" : "text-3xl"
              }  font-sans cursor-pointer p-2 font-normal flex justify-end transition-all`}
              onClick={() => setIsTechDocsOpen(!isTechDocsOpen)}
            >
              {isTechDocsOpen ? "-" : "+"}
            </button>
          </h2>

          {isTechDocsOpen && (
            <div className="bg-gray-200 p-6 rounded-md shadow-sm w-full transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productData?.technicalDocs && productData?.technicalDocs?.map((doc, index) => (
                  <div key={index}>
                    <h3 className="text-md font-bold text-black mb-2">{doc?.title}</h3>
                    <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}${doc?.pdfLink?.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    
                     className="text-sm text-teal-600 hover:underline">{doc?.content}</a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-[0.5px] bg-gray-200"></div>

        {/* Complete Collection Section */}
        <div className="flex items-center flex-col">
          <h2 className="text-lg font-normal text-[#303030] flex tracking-wider uppercase font-sans items-center w-full justify-between">
            Complete Collection
            <button
              className={`text-[#303030] ${
                isCompleteCollection ? "text-5xl" : "text-3xl"
              }  font-sans cursor-pointer p-2 font-normal flex justify-end transition-all`}
              onClick={() => setIsCompleteCollection(!isCompleteCollection)}
            >
              {isCompleteCollection ? "-" : "+"}
            </button>
          </h2>
          {isCompleteCollection && (
            <ul className="flex p-2 gap-4 w-full">
              {productData?.completeCollectionData && productData?.completeCollectionData?.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="opacity-40 cursor-pointer hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image?.url}` || null}
                    alt={item?.image?.alt || `Image ${index + 1}`}
                    className="w-20 h-20 object-contain border border-black p-2"
                  />
                  <p className="text-sm font-sans text-center font-semibold">{item?.itemCode}</p>
                </a>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
