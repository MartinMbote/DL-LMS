import React from 'react'
import { NavBar, Hero, Courses, Categories } from '../components'
import { coprateImage } from '../assets';


const HomePage = () => {
  return (
    <div>
        <NavBar />
        <Hero />
        <Courses />
        <Categories />

        <div className='flex gap-[1.5vw]'>
          <div className='w-[40.5vw] h-[30vw] ml-[8vw] mt-[10vw] bg-opacity-20 bg-strathmore-grey pl-[5vw] pr-[3vw] pt-[4.5vw]'>
            <p className='text-strathmore-red text-[2.3vw] mb-[2.2vw]'>
              Drive business impact <br /> Get access to courses for your business, higher education, or government team
            </p>

            <div className='w-[11vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white border-[0.15vw] border-white'>
              <p>
                Get DL for Business
              </p>
            </div>
          </div>

          <img src={coprateImage} className='h-[44.5vw] mt-[4vw] pb-[3vw]' />
        </div>
    </div>
  )
}

export default HomePage