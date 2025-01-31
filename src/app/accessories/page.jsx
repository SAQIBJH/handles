import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getNavLinkMenu, getSubCategoryProductdata } from "../service/apiService";

export default async function Page() {
    const navItems = await getNavLinkMenu();
    const products =await getSubCategoryProductdata('pull-handles').catch((error) => {
            console.error("Failed to fetch product data:", error);
            return null; // Return null on failure
          })
    return (
        <div>
           <Header navItems={navItems}/> 
           <section className="flex flex-col items-center gap-y-16 max-w-6xl mx-auto py-16">
        <div className="flex flex-col justify-end items-center w-full   relative ">
          <h1 className="font-bold text-3xl lg:text-4xl z-20 text-[#088080]">
            Accessories
          </h1>
        </div>
         {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 shadow-inner border rounded-sm p-2 gap-4"> */}
         <div className="flex flex-wrap max-sm:p-4 p-0.5 w-full  gap-12 md:justify-center max-md:justify-start">
      {products && products?.length > 0 &&  products?.map((product) => (
        <a
        href={product?.completeurl || "#"} 
          key={product.id}
          className="flex flex-col gap-2 p-4 justify-center items-center border rounded-lg shadow-md h-full cursor-pointer"
        >
          <div className="w-32 h-32 relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${product?.image?.url}` || null}
              alt={product?.image?.alt}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2 className="text-sm text-gray-700 font-medium text-center">
            {product?.title}
          </h2>
          <p className="text-xs text-center">{product?.code}</p>
        </a>
      ))}
    </div>
      </section>
           <Footer/>
        </div>
    );
}