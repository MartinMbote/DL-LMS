import React from 'react'
import SearchComponent from './SearchComponent'

const NavBar = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <nav className='w-full h-[5vw] bg-nav-logged'>
        <div className='absolute mt-[0.9vw] ml-[1.5vw]'>
          <div className='flex font-bold gap-[0.8vw]'>
            <div className='text-white bg-nav-blue w-[3.3vw] h-[3.3vw] rounded-[0.7vw] text-[1.4vw] flex justify-center leading-[3.2vw] '>
              <p>
                DL
              </p>
            </div>

            <p className='text-nav-blue mt-[0.8vw] text-[1.1vw]'>
              DIGITAL LEARNING
            </p>
          </div>
        </div>
        
        <div className='absolute left-[31vw] top-[1vw] border'>
          <SearchComponent isLoggedIn={true} />
        </div>

        <div className='absolute right-[1.5vw] border top-[1vw] flex text-white gap-[1.9vw]'>
          
        </div>
      </nav>
      ) : (
        <nav className='w-full h-[5vw] bg-nav-blue'>
        <div className='absolute mt-[0.9vw] ml-[1.5vw]'>
          <div className='flex font-bold gap-[0.8vw]'>
            <div className='text-nav-blue bg-white w-[3.3vw] h-[3.3vw] rounded-[0.7vw] text-[1.4vw] flex justify-center leading-[3.2vw] '>
              <p>
                DL
              </p>
            </div>

            <p className='text-white mt-[0.8vw] text-[1.1vw]'>
              DIGITAL LEARNING
            </p>
          </div>
        </div>
        
        <div className='absolute left-[31vw] top-[1vw] border'>
          <SearchComponent />
        </div>

        <div className='absolute right-[1.5vw] top-[1vw] flex text-white gap-[1.9vw]'>
          <p className='text-[1.1vw] mt-[0.6vw] cursor-pointer hover:text-strathmore-yellow'>
            Login
          </p>

          <div className='w-[7.5vw] h-[2.9vw] border-[0.15vw] rounded-[0.6vw] text-center text-[1.2vw] leading-[2.5vw] cursor-pointer hover:text-strathmore-yellow hover:border-strathmore-yellow'>
            <p>
              Get Started
            </p>
          </div>
        </div>
      </nav>
      )}
    </div>
  )
}

export default NavBar