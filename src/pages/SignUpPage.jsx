import React from 'react'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <div>
        <div className='w-full h-[5vw] bg-nav-logged'>
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
        </div>
        
        <div className='w-full h-[43.8vw] bg-nav-blue flex justify-center'>
            <div>
                <div className='w-[30vw] bg-white flex justify-center py-[1.5vw] rounded-[1vw]'>
                    <div className='text-center'>
                    <p className='font-bold text-[1.1vw]'>
                        Make the most of your professional life
                    </p>

                    <p>
                        Please fill in your details to sign in to your account
                    </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUpPage