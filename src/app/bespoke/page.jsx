// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import { getNavLinkMenu } from "../service/apiService";

// export default async function Page() {
//     const navItems = await getNavLinkMenu();
//     return (
//         <div>
//            <Header navItems={navItems}/> 
//            <h1>
//                Bespoke
//            </h1>
//            <Footer/>
//         </div>
//     );
// }

import Footer from "../components/Footer"
import Header from "../components/Header"
import { getNavLinkMenu,getBespokeData } from "../service/apiService"
import Image from "next/image"
import {InquireBtn} from "../components/InquireBtn"
// import { Button } from "@/components/ui/button"

// Helper function to convert the rich text to plain text
const getPlainText = (root) => {
  return root.children[0].children.map((child) => child.text || (child.type === "linebreak" ? "\n" : "")).join("")
}

export default async function Page() {
  const navItems = await getNavLinkMenu()
  const data = await getBespokeData()
  if(!data) return null;
  if(!navItems) return null;

  return (
    <div className="min-h-screen flex flex-col mb-2">
      <Header navItems={navItems} />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8  flex flex-col gap-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-teal-600 mb-4">{data.title}</h1>
        <div className="flex flex-col gap-y-4">
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2  overflow-hidden  border-8 border-[#008080]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${data?.bannerimage?.url}` || "/placeholder.svg"}
              alt={data.bannerimage.alt}
              width={data.bannerimage.width}
              height={data.bannerimage.height}
              className="w-full h-[500px] object-fill"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${data?.bannerimage2?.url}` || "/placeholder.svg"}
              alt={data.firstimage.alt}
              width={data.firstimage.width}
              height={data.firstimage.height}
              className="w-full h-[500px] object-fill"
            />
          </div>
        </div>
        <div className="text-center mb-4 p-2">
          <p className="text-[#008080] font-bold text-2xl leading-relaxed tracking-wider">
            {getPlainText(data?.imgdescription?.root)}
          </p>
        </div>

        </div>

        <div className="flex flex-col gap-y-4">

        <div className="grid md:grid-cols-2 gap-2 max-w-5xl mx-auto mb-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${data?.firstimage?.url}` || null}
            alt={data?.firstimage?.alt}
            width={data?.firstimage?.width}
            height={data?.firstimage?.height}
            className="w-full h-[250px] rounded-lg shadow-lg"
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${data?.secondtimage?.url}` || "/placeholder.svg"}
            alt={data.secondtimage.alt}
            width={data.secondtimage.width}
            height={data.secondtimage.height}
            className="w-full h-[250px] rounded-lg shadow-lg"
          />
        </div>

        <div className="text-center mb-4 p-2">
          <p className="text-[#008080] font-bold text-2xl leading-relaxed tracking-wider">
            {getPlainText(data?.description?.root)}
          </p>
        </div>
        </div>

        
        <div>
            <InquireBtn btn = {data.enquirebtntext}/>
        </div>
      </main>

      <Footer />
    </div>
  )
}

