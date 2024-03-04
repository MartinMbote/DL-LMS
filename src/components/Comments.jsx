import React from 'react'
import { nextArrow, commentImage } from '../assets'

const Comments = () => {
  return (
    <div>
      <div className='border bg-strathmore-grey bg-opacity-20 pt-[4.5vw] pb-[1.5vw] px-[3vw] flex mb-[5vw]'>
        <img src={nextArrow} className='h-[4vw] bg-white rounded-[1.9vw] rotate-180 mt-[7vw] cursor-pointer' />

        <div className=' flex gap-[3vw] ml-[15vw]'>
          <img src={commentImage} className='h-[17vw]' />

          <div className='w-[33vw] text-[1.05vw] mt-[1vw]'>
            <div>
              <p className='text-strathmore-grey font-semibold leading-[1.7vw]'>
                We are having a lot of positive feedback about our new LMS. It is so exciting to have such great results from our employees. Recently we received a suggestion from a supervisor for Winterwood. She requested access to see her employee activity results for the team of managers she supervises and eLeaP had this feature right there.
              </p>

              <div className='text-center mt-[2vw] leading-[2vw]'>
                <p className='font-bold'>
                  Jane Doe
                </p>

                <p className='font-semibold text-strathmore-grey'>
                  Global Head of Capability Development
                </p>

                <p className='font-bold'>
                  Company X
                </p>

                <p className='font-semibold text-strathmore-grey'>
                  Marketing Manager
                </p>
              </div>
            </div>
          </div>
        </div>

        <img src={nextArrow} className='h-[4vw] bg-white rounded-[1.9vw] right-[3vw] absolute mt-[7vw] cursor-pointer' />
      </div>
    </div>
  )
}

export default Comments