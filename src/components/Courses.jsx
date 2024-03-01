import React from 'react'
import { pythonForDataScience, star, bigDataImage, dataStructureImg, DataAnalytics } from '../assets'

const Courses = () => {
    const stars = [star, star, star, star, star];
    const coursesImages = [pythonForDataScience, bigDataImage, dataStructureImg, DataAnalytics];
    const courseText = ["Python for Data Science", "acs", "Data Structure & Analysis", "Data Analytics"];

  return (
    <div>
        <div className='border w-full h-[8.5vw] bg-opacity-20 bg-strathmore-grey'>
            <p className='text-strathmore-red text-[3vw] mt-[2vw] ml-[1.5vw]'>
                Explore Courses
            </p>
        </div>

        <div>
            <div className='flex justify-center mt-[1.2vw]'>
                <div className='w-[10vw] py-[0.5vw] border-b-[0.25vw] border-strathmore-grey text-center text-[1.08vw] text-strathmore-grey font-semibold hover:text-nav-blue hover:border-nav-blue cursor-pointer'>
                    <p>
                        Data Science
                    </p>
                </div>

                <div className='w-[10vw] py-[0.5vw] border-b-[0.25vw] border-strathmore-grey text-center text-[1.08vw] text-strathmore-grey font-semibold hover:text-nav-blue hover:border-nav-blue cursor-pointer'>
                    <p>
                        Game Development
                    </p>
                </div>

                <div className='w-[10vw] py-[0.5vw] border-b-[0.25vw] border-strathmore-grey text-center text-[1.08vw] text-strathmore-grey font-semibold hover:text-nav-blue hover:border-nav-blue cursor-pointer'>
                    <p>
                        3D Animation
                    </p>
                </div>

                <div className='w-[13vw] py-[0.5vw] border-b-[0.25vw] border-strathmore-grey text-center text-[1.08vw] text-strathmore-grey font-semibold hover:text-nav-blue hover:border-nav-blue cursor-pointer'>
                    <p>
                        Project Management
                    </p>
                </div>

                <div className='w-[9vw] py-[0.5vw] border-b-[0.25vw] border-strathmore-grey text-center text-[1.08vw] text-strathmore-grey font-semibold hover:text-nav-blue hover:border-nav-blue cursor-pointer'>
                    <p>
                        Cyber Security
                    </p>
                </div>

                <div className='w-[8vw] py-[0.5vw] border-b-[0.25vw] border-strathmore-grey text-center text-[1.08vw] text-strathmore-grey font-semibold hover:text-nav-blue hover:border-nav-blue cursor-pointer'>
                    <p>
                        Design
                    </p>
                </div>
            </div>

            <div className='flex justify-center mt-[1.2vw]'>
                <div className='border w-[80vw] py-[3vw] flex justify-center'>
                    {/* <div>
                        {coursesImages.map((image, index) => (
                            <img key={index} src={image} className='h-[9vw]' />
                        ))}

                        <div className='flex justify-center text-[1vw] font-bold mt-[0.7vw]'>
                            <div>
                                {courseText.map((text, index) => (
                                    <p key={index}>
                                        {text}
                                    </p>
                                ))}

                                <div className='flex text-[0.8vw] my-[0.2vw]'>
                                    <p>
                                        5.0
                                    </p>

                                    <div className='flex gap-[0.2vw] mt-[0.25vw]  mx-[0.5vw]'>
                                        {stars.map((star, index) => (
                                            <img key={index} src={star} className='h-[0.7vw]' />
                                        ))}
                                    </div>

                                    <p className='text-strathmore-grey'>
                                        (23,121)
                                    </p>
                                </div>

                                <p className='text-[0.9vw]'>
                                    $74.69
                                </p>
                            </div>
                        </div>
                    </div> */}


                    <div className='flex gap-[2vw]'>
                        {coursesImages.map((image, index) => (
                            <div key={index} className='cursor-pointer'>
                                <img src={image} className='h-[9vw]' />
                                <div className='flex justify-center text-[1vw] font-bold mt-[0.7vw]'>
                                    <div>
                                        <p>{courseText[index]}</p>
                                        <div className='flex text-[0.8vw] my-[0.2vw]'>
                                            <p>5.0</p>
                                            <div className='flex gap-[0.2vw] mt-[0.25vw] mx-[0.5vw]'>
                                                {stars.map((star, idx) => (
                                                    <img key={idx} src={star} className='h-[0.7vw]' />
                                                ))}
                                            </div>
                                            <p className='text-strathmore-grey'>(23,121)</p>
                                        </div>
                                        <p className='text-[0.9vw]'>$74.69</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Courses