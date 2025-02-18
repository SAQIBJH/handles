import { PayloadLexicalReactRenderer } from "@atelier-disko/payload-lexical-react-renderer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getNavLinkMenu, getFAQData } from "../service/apiService";

export default async function Page() {
    const navItems = await getNavLinkMenu();
    const faqs = await getFAQData(); // Fetching FAQ data dynamically
    const {quest = []} = faqs || {};

    return (
        <div>
            <Header navItems={navItems} />
            <section className="flex flex-col items-center gap-y-12 max-w-5xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-center">Frequently Asked Questions (FAQs)</h2>
                <div className="w-full flex flex-col gap-y-12 ">
                    {quest?.map((faq, index) => (
                        <div key={index} className="">
                            <div className="flex gap-4 items-center bg-gray-100 flex-row max-w-full">

                            <div className="border-l-4 border-red-500 h-20 flex bg-gray-100 justify-start items-center gap-8">
                                <span className="text-red-500 font-normal text-5xl ml-2  my-auto inline-flex">Q.</span>
                                <p className="text-black font-semibold flex"><PayloadLexicalReactRenderer content={faq.question}/></p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center  flex-row max-w-full">

                            <div className="border-l-4 border-gray-500 h-20 flex  justify-start items-center gap-8">
                                <span className="text-gray-500 font-normal text-5xl ml-2  my-auto inline-flex">A.</span>
                                <p className="text-gray-700 flex"><PayloadLexicalReactRenderer content={faq.answer}/></p>
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
}
