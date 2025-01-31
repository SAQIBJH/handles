import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getBrandsData, getNavLinkMenu } from "../service/apiService";

export default async function Page() {
  let navItems = await getNavLinkMenu();
  let brandsData = await getBrandsData();
  if (!brandsData) brandsData = [];
  if (!navItems) navItems = [];

  return (
    <div>
      <Header navItems={navItems} />
      <div className="container mx-auto px-4 py-8 max-w-5xl flex flex-col items-center justify-center gap-8">
        <h2 className="text-4xl font-bold text-center p-4 text-[#088080]">
          Our Brands
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 justify-center items-center place-content-center place-items-center gap-x-8">
          {brandsData &&
            brandsData.length > 0 &&
            brandsData.map((brand) => (
              <a
                key={brand.id}
                href={brand?.completebrandslug || "#"}
                rel="noopener noreferrer"
                title={brand?.title || "Brand"}
         
              >
                <Image
                  src={
                    `${process.env.NEXT_PUBLIC_API_URL}${brand?.image?.url}` ||
                    null
                  }
                  alt={brand?.image?.alt}
                  width={250}
                  height={250}
                  className="object-cover h-[250px] border-2 rounded-lg shadow-md"
                />
               </a>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
