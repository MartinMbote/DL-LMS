import React from 'react'
import { motion } from "framer-motion"
import { pinksweater } from '../assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div>
      <motion.div className=' w-[100vw] h-[43.8vw]' initial={{
        opacity: 0,        
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2
      }}
      >
        <div className=' absolute w-[31vw] top-[17vw] left-[8vw]'>
          <p className='text-strathmore-red text-[3vw] font-semibold leading-[4vw]'>
            Keep learning at a safe and steady pace.
          </p>

          <p className='text-strathmore-grey font-semibold mt-[2vw] mb-[2.2vw] text-[1.05vw]'>
            <span className='text-nav-blue'>Expert-led courses</span> across a variety of <span className='text-nav-blue'>online class topics</span> for every step of your career. Instructors with real-world experience.
          </p>

          <div className=' flex gap-[2.8vw] justify-center'>
            <Link to="/dl-lms/SignUpPage">
              <div className='w-[11vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white hover:scale-105 transition-transform'>
                <p>
                  Try my free Month
                </p>
              </div>
            </Link>

            {/* <div className='w-[11vw] h-[2.8vw] border-[0.15vw] border-strathmore-grey text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-strathmore-grey text-[1vw]'>
              <p>
                Try DL for Business
              </p>
            </div> */}

            <Link to='/dl-lms/SignUpBusiness'>
              <div className='w-[11vw] h-[2.8vw] border-[0.15vw] border-strathmore-grey text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-strathmore-grey text-[1vw] hover:scale-105 transition-transform'>
                <p>
                  Try DL for Business
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className='absolute right-[0vw] top-[8.4vw]'>
          <img src={pinksweater} className='h-[40vw]' />
        </div>
      </motion.div>
    </div>
  )
}

export default Hero