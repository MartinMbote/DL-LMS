import React from 'react'
import { designIcon, developmentIcon, itIcon, marketingIcon, personaldevelopmentIcon, businessIcon, photoIcon, artsIcon } from '../assets'

const Categories = () => {

  const categoriesImages = [designIcon, developmentIcon, itIcon, marketingIcon, personaldevelopmentIcon, businessIcon, photoIcon, artsIcon];
  const categoriesText = ["design", "Development", "IT & Software", "Marketing", "Personal Development", "Business", "Photography & Videography", "Arts"];

  return (
    <div>
        <div className='w-full h-[8.5vw] mt-[5vw]'>
            <p className='text-strathmore-red text-[3vw] mt-[2vw] ml-[8vw]'>
                Top Categories
            </p>
        </div>

        <div className='flex justify-center mt-[-2vw] mb-[3vw]'>
          <div className='w-[80vw] pb-[3vw] flex '>
              <div className='flex gap-[2vw] flex-wrap justify-center'>
                {categoriesImages.map((image, index) => (
                  <div key={index} >
                    <div className='w-[13vw] h-[13vw] bg-opacity-20 bg-strathmore-grey border border-black'>
                      <img src={image} className='h-[12.8vw]' />
                    </div>

                    <p className='text-[1vw] font-semibold mt-[0.6vw]'>
                      {categoriesText[index]}
                    </p>
                  </div>
                ))}
              </div>
          </div>
        </div>
    </div>
  )
}

export default Categories