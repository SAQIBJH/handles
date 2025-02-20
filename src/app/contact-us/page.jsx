import { PayloadLexicalReactRenderer } from "@atelier-disko/payload-lexical-react-renderer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getContactData, getContactFormData, getNavLinkMenu } from "../service/apiService";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "../components/ContactForm";

export default async function Page() {
    const navItems = await getNavLinkMenu();
    const contactData = await getContactData();
    const { fields = [], description : contactDescription = "" } = await getContactFormData();
    const { title = "", bannerimage = {}, description = "", ourlocations = [], ourcontactinfos = [] } = contactData || {};
    const [location = {}, address = {}] = ourlocations || [];

    return (
        <div>
            <Header navItems={navItems} />
            <section className="flex flex-col items-center gap-8 lg:gap-y-16 max-w-6xl mx-auto lg:py-12 lg:px-12 p-4">
                <div className="flex relative w-full">
                    <img
                        src={bannerimage?.url ? `${process.env.NEXT_PUBLIC_API_URL}${bannerimage?.url}` : "/default-image.jpg"}
                        alt={bannerimage?.alt || "termsandconditions"}
                        loading="lazy"
                        className="w-full h-[150px] object-cover"
                    />
                    <div className="absolute left-8 bottom-3.5 flex flex-col">
                        <span className="text-white text-2xl font-medium">{title}</span>
                        <div className="flex items-center gap-1 mt-1 -pl-1">
                            <span className="w-1 h-1 bg-white rounded-full"></span>
                            <span className="w-1 h-1 bg-white rounded-full"></span>
                            <span className="w-1 h-1 bg-white rounded-full"></span>
                            <span className="w-8 border-b-[3px] border-white rounded-lg "></span>
                        </div>
                    </div>
                </div>
                <div className="flex  w-full text-[#088080] text-lg font-normal">
                    <PayloadLexicalReactRenderer content={description} />
                </div>

                <div className="flex w-full mx-auto gap-8 lg:gap-24 justify-between lg:py-6 lg:flex-row flex-col">
                    <div className="lg:-w-[70%]  py-2">
                        <>
                        {contactDescription && <p className="text-[#088080] text-lg font-normal p-2 mb-2">{contactDescription}</p>}
                        </>
                        <ContactForm fields={fields} />
                    </div>
                    <div className="flex flex-col  gap-12 p-4 lg:mt-4 ">
                        <div className="flex flex-col gap-4">
                            <span className="text-[#088080] text-xl underline decoration-4 decoration-gray-600 underline-offset-8 mb-2">
                                Our Location:
                            </span>

                            <PayloadLexicalReactRenderer
                                content={ourlocations[0]?.address}
                                elementRenderers={{
                                    linebreak: () => <br />,
                                    paragraph: (props) => (
                                        <p className="text-[#088080] text-lg">
                                            {props.children}
                                        </p>
                                    ),
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-4 ">
                            <span className="text-[#088080] text-xl underline decoration-4 decoration-gray-600 underline-offset-8 mb-4">Contact info:</span>
                            <div className="flex gap-3">
                                <span className="inline-flex"><Phone strokeWidth={1} /></span>
                                <span className="inline-flex text-lg text-[#088080]">{ourcontactinfos[0]?.mobileno}</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="inline-flex"> <Mail strokeWidth={1} /></span>
                                <span className="inline-flex text-lg text-[#088080]">{ourcontactinfos[0]?.email}</span>
                            </div>
                            <div className="flex gap-3">
                                <img src="/global-network.png" alt="" className="w-6 h-6 inline-flex" />
                                <span className="inline-flex text-lg text-[#088080]">{ourcontactinfos[0]?.website}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-center items-center">
                    <iframe
                        title="Google Map"
                        width="1152"
                        height="350"
                        src={`https://www.google.com/maps?q=${location?.latitude || '40.748817'},${location?.longitude || '-73.985428'}&z=15&output=embed`}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ border: 0 }}
                    ></iframe>
                </div>
            </section>
            <Footer />
        </div>
    );
}