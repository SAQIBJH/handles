// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./HomeBanner.css";

// const images = [
//   {
//     src: "/bannerImage.png",
//     content: "HOLD, a premium Canadian brand, crafts luxury door handles blending innovation, elegance, and durability. Transform spaces with timeless designs, ensuring every door becomes a statement of sophistication and style."
//   },
//   {
//     src: "/bannerImage.png",
//     content: "HOLD, a premium Canadian brand, crafts luxury door handles blending innovation, elegance, and durability. Transform spaces with timeless designs, ensuring every door becomes a statement of sophistication and style."
//   },
//   {
//     src: "/bannerImage.png",
//     content: "HOLD, a premium Canadian brand, crafts luxury door handles blending innovation, elegance, and durability. Transform spaces with timeless designs, ensuring every door becomes a statement of sophistication and style."
//   },
// ];

// const HomeBanner = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
  
//   };

//   return (
//     <Slider {...settings} className="max-w-6xl mx-auto">
//       {images.map((image, index) => (
//         <div key={index} className="outline-none">
//           <div className="gap-x-4 justify-center items-center p-4 bg-[#F5FAFA] grid grid-cols-1 md:grid-cols-2">
//             <div className="flex flex-col gap-y-2 px-5">
//               <div className="flex justify-center items-center mb-4">
//                 <Image
//                   src="/logo.png"
//                   alt="HOLD Logo"
//                   width={150}
//                   height={150}
//                 />
//               </div>
//               <div className="items-start inline-flex font-light not-italic text-[#545454] no-underline pb-1">
//                 {image.content}
//               </div>
//               <div className="flex items-start gap-x-4 mt-4">
//                 <a
//                   href="/"
//                   className="px-2 py-1.5 bg-[#008080] tracking-widest text-white text-sm hover:underline"
//                 >
//                   LEARN MORE
//                 </a>
//                 <a
//                   href="/"
//                   className="font-normal text-[#545454] border-2 border-black tracking-widest text-sm py-1 px-1.5"
//                 >
//                   CHECK CATALOG
//                 </a>
//               </div>
//             </div>
//             <div className="flex justify-center items-center mt-4 md:mt-0">
//               <Image
//                 src={image.src}
//                 alt="Banner Image"
//                 width={500}
//                 height={500}
//                 objectFit="contain"
//               />
//             </div>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default HomeBanner;

// "use client"

// import Image from "next/image"
// import Slider from "react-slick"
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"
// import "./HomeBanner.css"
// import { PayloadLexicalReactRenderer } from "@atelier-disko/payload-lexical-react-renderer"

// const HomeBanner = ({homeBannerData = []}) => {
  
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   }

//   return (
//     <div className="home-banner-container">
//       <Slider {...settings} className="max-w-6xl mx-auto">
//         {homeBannerData && homeBannerData?.length > 0 && homeBannerData?.map((data, index) => (
//           <div key={index} className="outline-none p-2">
//             <div className="gap-4 justify-center items-center p-4 bg-[#F5FAFA] grid grid-cols-1 md:grid-cols-2">
//               <div className="flex flex-col gap-y-2 px-5">
//                 <div className="flex justify-center items-center mb-4">
//                   <Image src={`${process.env.NEXT_PUBLIC_API_URL}${data?.iconimage?.url}`} alt={data?.iconimage?.alt || "brand Logo"} width={150} height={150} />
//                 </div>
//                 <div className="banner-text items-start inline-flex font-light not-italic text-[#545454] no-underline pb-1 md:text-xs">
//                   {/* {image.content} */}
//                   <PayloadLexicalReactRenderer content={data?.description} />
//                 </div>
//                 <div className="banner-buttons flex items-start gap-x-4 mt-4">
//                   <a
//                     href={data?.homebrands?.completebrandslug || "/"}
//                     className="banner-button px-2 py-1.5 bg-[#008080] tracking-widest text-white text-sm hover:underline"
//                   >
//                     LEARN MORE
//                   </a>
//                   <a
//                     href={`${process.env.NEXT_PUBLIC_API_URL}${data?.homecatalogue?.pdfLink?.url}` || "/"}
//                     target="_blank"
//                     className="banner-button font-normal text-[#545454] border-2 border-black tracking-widest text-sm py-1 px-1.5"
//                   >
//                     CHECK CATALOG
//                   </a>
//                 </div>
//               </div>
//               <div className="banner-image flex justify-center items-center mt-4 md:mt-0">
//                 <img
//                   src={`${process.env.NEXT_PUBLIC_API_URL}${data?.bannerimage?.url}` || null}
//                   alt="Banner Image"
//                   // width={500}
//                   // height={500}
//                   // objectFit="contain max-h-[450px] w-full"
//                   className="object-contain  w-full"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   )
// }

// export default HomeBanner

"use client"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./HomeBanner.css"
import { PayloadLexicalReactRenderer } from "@atelier-disko/payload-lexical-react-renderer"

const HomeBanner = ({ homeBannerData = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div className="home-banner-container">
      <Slider {...settings} className="max-w-6xl mx-auto">
        {homeBannerData?.map((data, index) => (
          <div key={index} className="outline-none p-2">
            <div className="gap-4 justify-center items-center p-4 bg-[#F5FAFA] grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
              {/* Text Content - Consistent Width */}
              <div className="flex flex-col justify-center items-center h-full px-5">
                <div>
                  <div className="flex justify-center items-center mb-4">
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_API_URL}${data?.iconimage?.url}`} 
                      alt={data?.iconimage?.alt || "brand Logo"} 
                      width={150} 
                      height={150}
                      className="object-contain"
                    />
                  </div>
                  <div className="banner-text inline-flex font-light text-[#545454] md:text-xs">
                    <PayloadLexicalReactRenderer content={data?.description} />
                  </div>
                </div>
                
                {/* Buttons - Fixed Position at Bottom */}
                <div className="banner-buttons flex items-start justify-start gap-x-4 mt-4 w-full">
                  <a
                    href={data?.homebrands?.completebrandslug || "/"}
                    className="banner-button px-2 py-1.5 bg-[#008080] tracking-widest text-white text-sm hover:underline"
                  >
                    LEARN MORE
                  </a>
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}${data?.homecatalogue?.pdfLink?.url}` || "/"}
                    target="_blank"
                    className="banner-button font-normal text-[#545454] border-2 border-black tracking-widest text-sm py-1 px-1.5"
                  >
                    CHECK CATALOG
                  </a>
                </div>
              </div>

              {/* Image Container - Responsive but Consistent */}
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${data?.bannerimage?.url}`}
                  alt="Banner Image"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HomeBanner

