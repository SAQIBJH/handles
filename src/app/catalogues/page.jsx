import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Image from "next/image";
import { getCatalogueData, getNavLinkMenu } from "../service/apiService";
import { Download } from "lucide-react";

// const catalogueItems = [
//   {
//     title: "Architectural Solutions",
//     year: "2023",
//     image: "/media/r1eddxvz/hidayath-architectural-catalogue.webp",
//     pdfLink: "/media/0obdwvpl/hidayath-architectural-catalogue-new.pdf",
//   },
//   {
//     title: "Industrial Metal Fabrication",
//     year: "2024",
//     image: "/media/yldoqnlg/industrial_metal.webp",
//     pdfLink: "/media/45ahwzfd/03_hhi_pqd.pdf",
//   },
//   {
//     title: "Architectural Solutions",
//     year: "2023",
//     image: "/media/r1eddxvz/hidayath-architectural-catalogue.webp",
//     pdfLink: "/media/0obdwvpl/hidayath-architectural-catalogue-new.pdf",
//   },
//   {
//     title: "Industrial Metal Fabrication",
//     year: "2024",
//     image: "/media/yldoqnlg/industrial_metal.webp",
//     pdfLink: "/media/45ahwzfd/03_hhi_pqd.pdf",
//   },
//   {
//     title: "Architectural Solutions",
//     year: "2023",
//     image: "/media/r1eddxvz/hidayath-architectural-catalogue.webp",
//     pdfLink: "/media/0obdwvpl/hidayath-architectural-catalogue-new.pdf",
//   },
//   {
//     title: "Industrial Metal Fabrication",
//     year: "2024",
//     image: "/media/yldoqnlg/industrial_metal.webp",
//     pdfLink: "/media/45ahwzfd/03_hhi_pqd.pdf",
//   },
//   {
//     title: "Architectural Solutions",
//     year: "2023",
//     image: "/media/r1eddxvz/hidayath-architectural-catalogue.webp",
//     pdfLink: "/media/0obdwvpl/hidayath-architectural-catalogue-new.pdf",
//   },
//   {
//     title: "Industrial Metal Fabrication",
//     year: "2024",
//     image: "/media/yldoqnlg/industrial_metal.webp",
//     pdfLink: "/media/45ahwzfd/03_hhi_pqd.pdf",
//   },
//   {
//     title: "Architectural Solutions",
//     year: "2023",
//     image: "/media/r1eddxvz/hidayath-architectural-catalogue.webp",
//     pdfLink: "/media/0obdwvpl/hidayath-architectural-catalogue-new.pdf",
//   },
//   {
//     title: "Industrial Metal Fabrication",
//     year: "2024",
//     image: "/media/yldoqnlg/industrial_metal.webp",
//     pdfLink: "/media/45ahwzfd/03_hhi_pqd.pdf",
//   },
//   // Add the rest of the catalogue items here...
// ];

export default async function ECataloguePage() {
  const catalogueItems = await getCatalogueData();
  if (!catalogueItems) return null;
  const navItems = await getNavLinkMenu();
  return (
    <>
      <Header navItems={navItems} />
      <section className="flex flex-col items-center gap-y-16 max-w-6xl mx-auto py-16">
        <div className="flex flex-col justify-end items-center w-full   relative ">
          <h1 className="font-bold text-3xl lg:text-4xl z-20 text-[#088080]">
            E-Catalogue
          </h1>
        </div>
        <div className="flex flex-wrap max-sm:p-4 p-0.5 w-full  gap-12 md:justify-center max-md:justify-start">
          {catalogueItems && catalogueItems?.map((item, index) => (
            <div
              key={item?.id || index}
              title={item?.title}
              className="flex bg-white w-full max-w-[370px] lg:max-w-[350px] shadow-[0px_1px_13px_0px_rgba(0,0,0,0.29)]"
            >
              <a
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_API_URL}${item?.pdfLink?.url}` || null}
                title={item?.title}
                className="flex flex-col"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image?.url}`|| null}
                  alt={item?.image?.title}
                  width={180}
                  height={300}
                  className="h-full max-w-[180px] lg:max-w-[180px]"
                />
              </a>
              <div
                className="flex flex-col w-full justify-between items-center text-center p-2 gap-3"
                style={{ minWidth: "135px" }}
              >
                <a
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_API_URL}${item?.pdfLink?.url}` || null}
                  title={item?.title}
                  className="flex flex-col"
                >
                  <p className="text-[#088080] mt-5 font-bold">{item.title}</p>
                  <span className="font-bold text-gray-500 mt-5">
                    {item?.year}
                  </span>
                </a>
                <a
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_API_URL}${item?.pdfLink?.url}`}
                title={item?.title}
                  download
                  className="rounded-full bg-[#088080]  text-sm text-white py-1 px-3 m-auto flex gap-1"
                >
                  <span><Download size={18}/></span>DOWNLOAD
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
