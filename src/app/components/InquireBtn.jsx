"use client";
export const InquireBtn = ({btn}) => {
    if(!btn) return null;
    return (
        <div className="text-center">
          <button className="bg-[#088080] hover:bg-teal-700 text-white py-3 px-8 text-lg uppercase tracking-[0.2em]">
            {btn}
          </button>
        </div> 
    );
}