import Image from "next/image";
import React from "react";
import { PayloadLexicalReactRenderer } from "@atelier-disko/payload-lexical-react-renderer";
import FilterPills from "./FilterPills";

const BrandProductCard = ({ bannerimage, description, brandProductData,productCardRef }) => {
  return (
    <div className="flex flex-col gap-8">
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}${bannerimage?.url}` || null}
        alt="banner-image"
        className="object-contain h-auto w-full"
      />

      {description && (
        <PayloadLexicalReactRenderer
          content={description}
          elementRenderers={{
            paragraph: (props) => (
              <p className="text-2xl sm:text-xl md:text-2xl text-black leading-relaxed tracking-wider font-normal text-center sm:text-justify mb-4 last:mb-0">
                {props.children}
              </p>
            ),
          }}
        />
      )}
<span ref={productCardRef}>

<FilterPills/>
</span>

      <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 shadow-inner border rounded-sm p-2 gap-4">
        {brandProductData &&
          brandProductData?.length > 0 &&
          brandProductData?.map((product) => (
            <a
              href={product?.completeurl || "#"}
              key={product.id}
              className="flex flex-col gap-2 p-4 justify-center items-center border rounded-lg shadow-md h-full cursor-pointer"
            >
              <div className="w-full h-32 relative">
                <Image
                  src={
                    `${process.env.NEXT_PUBLIC_API_URL}${product?.image?.url}` ||
                    null
                  }
                  alt={product?.image?.alt}
                  layout="fill"
                  objectFit="fill"
                />
              </div>
              <h2 className="text-sm text-gray-700 font-medium text-center">
                {product?.title}
              </h2>
              <p className="text-xs text-center">{product?.code}</p>
            </a>
          ))}
      </div>
    </div>
  );
};

export default BrandProductCard;
