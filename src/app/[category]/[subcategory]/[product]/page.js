import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ProductPage from "@/app/components/ProductPage";
import { getNavLinkMenu, getProductData } from "@/app/service/apiService";


export default async function Page({ params }){
const { category,subcategory, product } = await params;
const productData = await getProductData(product);
const navItems = await getNavLinkMenu();
    return (
        <>
        <Header navItems={navItems}/>
        <ProductPage
         productData={productData}
        />
        <Footer/>
        </>
    )
}