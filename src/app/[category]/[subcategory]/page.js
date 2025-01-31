import CategoryPage from "@/app/components/CategoryPage";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { getNavLinkMenu, getsubCategory, getSubCategoryProductdata, otherCategoriesData } from "@/app/service/apiService";

export default async function Page({ params, searchParams }) {
  try {
    // Validate params
    if (!params || typeof params !== "object") {
      console.error("Invalid params:", params);
      return <div>Error: Invalid page parameters.</div>;
    }

    const { finish, brand: filterBrand } = await searchParams;


    const { category, subcategory } = await params;
    if (!category || !subcategory) {
      console.error("Missing category or subcategory in params:", params);
      return <div>Error: Missing category or subcategory information.</div>;
    }

    // Run API calls concurrently using Promise.all
    let [navItems, subcategorData, productData, otherCategories] = await Promise.all([
      getNavLinkMenu().catch((error) => {
        console.error("Failed to fetch navigation items:", error);
        return null; // Return null on failure
      }),
      getsubCategory(subcategory).catch((error) => {
        console.error("Failed to fetch subcategory data:", error);
        return null; // Return null on failure
      }),
      getSubCategoryProductdata(subcategory, filterBrand, finish).catch((error) => {
        console.error("Failed to fetch product data:", error);
        return null; // Return null on failure
      }),
      otherCategoriesData(subcategory).catch((error) => {
        console.error("Failed to fetch product data:", error);
        return null; // Return null on failure
      })
    ]);

    // Validate API responses
    if (!navItems) {
      // return <div>Error: Failed to load navigation data.</div>;
      navItems = [];
    }
    if (!subcategorData) {
      // return <div>Error: Failed to load subcategory data.</div>;
      subcategorData = {};
    }
    if (!productData) {
      // return <div>Error: Failed to load product data.</div>;
      productData = [];
    }
    if(!otherCategories){
      otherCategories = [];
    }

    // Extract subcategory details
    const { Finishes, brand,title } = subcategorData?.Category || {};
    const { bannerimage } = subcategorData || {};


    return (
      <div className="flex flex-col min-h-screen gap-y-5">
        <Header navItems={navItems} />
        <CategoryPage
          productData={productData}
          subcategoryDetails={{ Finishes, brand, bannerimage,title }}
          otherCategories={otherCategories}
        />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Unexpected error occurred:", error);
    return <div>Error: Something went wrong. Please try again later.</div>;
  }
}
