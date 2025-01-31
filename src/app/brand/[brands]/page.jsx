import BrandsPage from "@/app/components/BrandsPage";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { getBrandCategoryData, getBrandFinshes, getBrandPageData, getBrandProductData, getNavLinkMenu } from "@/app/service/apiService";
import { redirect } from "next/navigation";

export default async function Page({ params, searchParams }) {

    let { brands = "" } = await params;
    let { finish  } = await searchParams;

    if(brands === "hold")redirect("/hold");
    let brandData = await getBrandPageData(brands);
    if (!brandData) brandData = {};
    let navItems = await getNavLinkMenu();
    if (!navItems) navItems = [];
    let brandProductData = await getBrandProductData(brands,finish);
    if (!brandProductData) brandProductData = [];
    let { bannerimage = {}, image = {}, description = {} } = brandData;
    let brandFinishes = await getBrandFinshes(brands);
    if (!brandFinishes) brandFinishes = [];
    if (!brandData) brandData = [];
    if (!navItems) navItems = [];
    let brandCategories = await getBrandCategoryData(brands)
    if (!brandCategories) brandCategories = [];

    return (
        <div>
            <Header navItems={navItems} />
            <BrandsPage bannerimage={bannerimage} image={image} description={description} brandProductData={brandProductData} brandFinishes={brandFinishes} brandCategories={brandCategories} />
            <Footer />
        </div>
    );
}