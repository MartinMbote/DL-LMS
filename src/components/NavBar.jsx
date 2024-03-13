import React from 'react'
import SearchComponent from './SearchComponent'
import { bellIcon, messengerIcon, me, downArrow } from '../assets'
import { Link } from 'react-router-dom'

const NavBar = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <nav className='w-full h-[5vw] bg-nav-logged'>
        {/* <div className='absolute mt-[0.9vw] ml-[1.5vw]'>
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
        </div> */}

        <Link to="/dl-lms/">
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
        </Link>
        
        <div className='absolute left-[31vw] top-[1vw] border'>
          <SearchComponent isLoggedIn={true} />
        </div>

        <div className='absolute right-[1.5vw] top-[1vw] flex text-white gap-[0.95vw]'>
          <div className='flex gap-[0.8vw] mt-[0.8vw]'>
            <div>
              <img src={bellIcon} className='h-[1.5vw] cursor-pointer' />

              <div className='w-[0.5vw] h-[0.5vw] bg-red-600 mt-[-1.4vw] ml-[0.8vw] rounded-[3vw] z-10'></div>
            </div>

            <img src={messengerIcon} className='h-[1.4vw] cursor-pointer' />
          </div>

          <div className='flex gap-[0.5vw] cursor-pointer'>
            <img src={me} className='h-[3vw] rounded-[2vw]' />

            <div className='text-strathmore-grey text-[0.9vw] font-semibold flex gap-[0.3vw] mt-[0.7vw]'>
              <p>
                MRTN
              </p>

              <img src={downArrow} className='h-[0.6vw] mt-[0.43vw]' />
            </div>
          </div>
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
          {/* <p className='text-[1.1vw] mt-[0.6vw] cursor-pointer hover:text-strathmore-yellow transition-colors duration-200 ease-in-out'>
            Login
          </p> */}

          <Link to='/dl-lms/UserHomePage'>
          <p className='text-[1.1vw] mt-[0.6vw] cursor-pointer hover:text-strathmore-yellow transition-colors duration-200 ease-in-out'>
            Login
          </p>
          </Link>

          {/* <div className='w-[7.5vw] h-[2.9vw] border-[0.15vw] rounded-[0.6vw] text-center text-[1.2vw] leading-[2.5vw] cursor-pointer hover:text-strathmore-yellow hover:border-strathmore-yellow transition-colors duration-200 ease-in-out'>
            <p>
              Get Started
            </p>
          </div> */}

          <Link to='/dl-lms/SignUpPage'>
            <div className='w-[7.5vw] h-[2.9vw] border-[0.15vw] rounded-[0.6vw] text-center text-[1.2vw] leading-[2.5vw] cursor-pointer hover:text-strathmore-yellow hover:border-strathmore-yellow transition-colors duration-200 ease-in-out'>
              <p>
                Get Started
              </p>
            </div>
          </Link>
        </div>
      </nav>
      )}
    </div>
  )
}

export default NavBar