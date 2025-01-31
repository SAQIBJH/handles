'use client'
import { useState } from 'react'

export default function TechnicalDocumentation() {
  const [isTechDocsOpen, setIsTechDocsOpen] = useState(false)
  const [isCompleteCollection, setIsCompleteCollection] = useState(false)
  const completeCollection = [
    {
        title: "door handles",
        image: '/doorhandles.png',
        isNew: true,
        itemCode: "DK-001",
    },
    {
        title: "door handles",
        image: '/doorhandles.png',
        isNew: true,
        itemCode: "DK-001",
    },
    {
        title: "door handles",
        image: '/doorhandles.png',
        isNew: true,
        itemCode: "DK-001",
    },
    {
        title: "door handles",
        image: '/doorhandles.png',
        isNew: true,
        itemCode: "DK-001",
    }
  ]

  return (
    <div className="max-w-7xl p-8 flex flex-col gap-8 mx-auto">
      {/* Technical Documentation Section */}
      <div className="flex items-center flex-col">
        <h2 className="text-lg font-normal text-[#303030] flex tracking-wider uppercase font-sans items-center w-full justify-between">
          Technical Documentation
          <button
            className={`text-[#303030] ${isTechDocsOpen ? "text-5xl" : "text-3xl"}  font-sans cursor-pointer p-2 font-normal flex justify-end transition-all`}
            onClick={() => setIsTechDocsOpen(!isTechDocsOpen)}
          >
            {isTechDocsOpen ? '-' : '+'}
          </button>
        </h2>
        
        {/* Technical Documentation Content */}
        {isTechDocsOpen && (
          <div className="bg-gray-200 p-6 rounded-md shadow-sm w-full transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-md font-bold text-black mb-2">
                  Technical sheets
                </h3>
                <p className="text-sm text-gray-700">
                  door handle, window handle, DK
                </p>
              </div>

              <div>
                <h3 className="text-md font-bold text-black mb-2">
                  Installation directions
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>
                    door handles with "Low" 51x5 rosettes / escutcheons: fixing
                    with woodscrew
                  </li>
                  <li>
                    door handles with "Low" 51x5 rosettes / escutcheons: with
                    fixing bolts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-[0.5px] bg-gray-200" />

      {/* Complete Collection Section */}
      <div className="flex items-center flex-col">
        <h2 className="text-lg font-normal text-[#303030] flex tracking-wider uppercase font-sans items-center w-full justify-between">
          Complete Collection
          <button
            className={`text-[#303030] ${isCompleteCollection ? "text-5xl" : "text-3xl"}  font-sans cursor-pointer p-2 font-normal flex justify-end transition-all`}
            onClick={() => setIsCompleteCollection(!isCompleteCollection)}
          >
            {isCompleteCollection ? '-' : '+'}
          </button>
        </h2>
        {
          isCompleteCollection && (
            <div className='flex gap-2 w-full transition-all duration-300 flex-col'>
                <h3 className='text-base font-sans font-semibold tracking-wide uppercase text-[#686868]'>Lipstick</h3>
                <ul className='flex p-2 gap-4'>
                {
                  completeCollection.map((item, index) => (
                    
                    <a key={index}
                    href='#'
                    className=' opacity-40 cursor-pointer hover:opacity-100 transition-all duration-300'
                    >
                        <img src={item.image} alt="" 
                        className='w-20 h-20 object-cover border border-black p-2'/>
                        <p className='text-sm font-sans text-center font-semibold'>{item?.itemCode}</p>
                    </a>
                  ))
                }
                </ul>
            </div>
          )
        }
      </div>

      {/* Modal */}
      
    </div>
  )
}

