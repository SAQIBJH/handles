import { PayloadLexicalReactRenderer } from "@atelier-disko/payload-lexical-react-renderer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ThumbnailGallery from "../components/HoldPageThumbnail";
import {
  getBrandProductData,
  getHoldData,
  getHoldProductData,
  getNavLinkMenu,
  otherCategoriesData,
} from "../service/apiService";

export default async function Page() {
  const navItems = await getNavLinkMenu();
  const holdData = await getHoldData();
  const otherCategories = await otherCategoriesData();
  const holdProductData = await getBrandProductData('hold');

  if (!holdData || !navItems || !otherCategories || !holdProductData)
    return null;
  const {
    title = "Default Title", // Fallback if title is undefined/null
    thumbimage = [], // Fallback to an empty array if thumbimage is undefined/null
    image = null, // Fallback if bannerimage is undefined/null
    headingtitle = "No title available.", // Fallback if headingtitle is undefined/null
    description = "No description available.", // Fallback if description is undefined/null
    websitelink = "#", // Fallback if websitelink is undefined/null
  } = holdData;
  return (
    <div>
      <Header navItems={navItems} />

      <main className="flex-1 flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto gap-y-4 sm:gap-y-6 md:gap-y-8">
        <div className="flex flex-col items-center justify-center ">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${image?.url}`}
            alt={image?.alt || "hold banner"}
            className="w-full h-auto object-fill bg-white mix-blend-hard-light"
          />
        </div>

        {/* Thumbnail Gallery */}
        <div className="w-full">
          <ThumbnailGallery thumbimage={thumbimage} />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-center -translate-y-4 sm:-translate-y-5 md:-translate-y-6">
          {headingtitle}
        </h1>

        {/* Description */}
        <PayloadLexicalReactRenderer
          content={description}
          elementRenderers={{
            paragraph: (props) => (
              <p className="text-xl sm:text-2xl md:text-3xl text-black leading-relaxed tracking-widest font-normal text-center sm:text-justify mb-4 last:mb-0">
                {props.children}
              </p>
            ),
          }}
        />

        {/* Website Link */}
        <a
          href={websitelink}
          target="_blank"
          rel="noreferrer"
          className="text-lg sm:text-xl md:text-2xl tracking-wider text-[#088080] underline hover:text-[#066666] transition-colors"
        >
          VISIT THE WEBSITE
        </a>

        {/* Divider */}
        <div className="w-full max-w-[500px] h-2 bg-gray-200 rounded-md my-4 sm:my-6 md:my-8"></div>

        {/* Category Links */}
        <div className="flex flex-wrap justify-center gap-4 px-4">
          {otherCategories &&
            otherCategories?.length > 0 &&
            otherCategories?.map((category) => (
              <a
                href={category?.fullslug || "#"}
                key={category?.id}
                className="text-base sm:text-lg md:text-xl text-white tracking-wider hover:bg-[#006666] 
                         bg-[#008080] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-md transition-colors"
              >
                {category?.title}
              </a>
            ))}
        </div>

        {/* Product Grid */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-4">
          {holdProductData &&
            holdProductData?.length > 0 &&
            holdProductData?.map((product) => (
              <a
                key={product?.id}
                href={product?.completeurl || "#"}
                className="flex flex-col items-center justify-center gap-y-4"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${product?.image?.url}`}
                  alt={product?.image?.alt}
                  className="w-full h-[200px] object-fill"
                />
              </a>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
