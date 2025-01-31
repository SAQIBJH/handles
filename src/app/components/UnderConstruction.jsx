// create an UI for website under construction this will be server side component
export default function UnderConstruction() {
  return (
    <>
      <div className="flex flex-col items-center  min-h-screen gap-y-10">
        <header className="w-full h-24 bg-[#008080] flex items-center justify-center">
          <img src="./handlelogo.png" alt="under construction logo " 
          className="w-fit h-10"
          />
        </header>
        <section className="flex flex-col items-center justify-center gap-4">
          <img
            src="./constructionimage.svg"
            alt="under construction"
            className="w-full max-h-[250px]"
          />
          <p className="text-5xl text-[#008080]/40 tracking-wider">
            Coming Soon
          </p>

          <div className="flex flex-col items-center justify-center gap-10 mb-4">
            <h1 className="text-3xl underline space-y-2 mt-20 text-black/40 underline-offset-8 flex">
              Our Other Brands
            </h1>
            <div className="flex items-center justify-center gap-10">
              <a href="https://hidayath.com" target="_blank" rel="noreferrer">
                <img
                  src="./hidayath_logo.webp"
                  alt="hidayath logo"
                  width={200}
                  height={200}
                />
              </a>
              <a
                href="https://hold-design.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="./Hold_Logo.jpg"
                  alt="hold logo"
                  width={200}
                  height={200}
                />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
