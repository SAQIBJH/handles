import { PayloadLexicalReactRenderer } from "@atelier-disko/payload-lexical-react-renderer"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { getNavLinkMenu, getTermsandConditons } from "../service/apiService"

export default async function Page() {
  const navItems = await getNavLinkMenu()
  const termsData = await getTermsandConditons()
  const { title = "", description = "", bannerimage = {} } = termsData || {}

  return (
    <div>
      <Header navItems={navItems} />
      <section className="flex flex-col items-center gap-y-16 max-w-6xl mx-auto pt-8 pb-16 lg:px-12 px-4">
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

        <div className="flex flex-col max-w-full px-2">
          <PayloadLexicalReactRenderer
            content={description}
            elementRenderers={{
              paragraph: ({ children, indent }) => (
                <p
                  className={`text-md text-black leading-relaxed  text-justify max-sm:text-start last:mb-2  `}
                >
                  {children}
                </p>
              ),
              heading: ({ children, level }) => {
                if (level === 1) {
                  return <h1 className="text-sm font-bold my-4">{children}</h1>
                }
                return <h2 className=" my-3 ">{children}</h2>
              },
              list: ({ children }) => <ul className="list-disc pl-6 space-y-2 mt-2 mb-2">{children}</ul>,
              listItem: ({ children }) => <li className="text-sm text-black lg:mr-96 last:mb-2">{children}</li>,
              linebreak: () => <br />,
              tab: () => <span className="ml-4"></span>,
              text: ({ text, format }) => {
                // Check if the text is a bullet point or if it's bold (format === 1)
                if (text.startsWith("•") || format === 1) {
                  return <span className="font-bold">{text}</span>
                }
                return <span>{text}</span>
              },
            }}
          />
        </div>
      </section>
      <Footer />
    </div>
  )
}



