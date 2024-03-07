import React from 'react'
import { NavBar } from '../components'
import ReactPlayer from 'react-player';

const CoursePage = () => {
  return (
    <div>
        <NavBar isLoggedIn={true} />
        
        <div>
          <div className='ml-[5.6vw]'>
            <p className='py-[1.5vw] text-[1.1vw] font-semibold text-strathmore-grey'>
              From the Course: <span className='text-nav-blue'>Data Science</span>
            </p>

            <div>
              <div className='flex justify-center h-[32.95vw] w-[58.5vw] border bg-black'>
                <ReactPlayer url='https://github.com/MartinMbote/elearning-platform/raw/main/src/assets/bikeRide.mp4'
                width='100%'
                height='100%'
                config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload' // Optional: To prevent the download button from appearing
                      }
                    },
                    attributes: {
                      controls: true // Optional: To show player controls
                    }
                  }}
                />
              </div>

              <div className='border w-[58.5vw] pl-[3vw] pt-[0.5vw] pb-[1.4vw]'>
                <p className='text-[1.7vw] font-semibold'>
                  Introduction to Python
                </p>

                <p className='text-[1vw] text-strathmore-grey font-semibold'>
                  From the Course: <span className='text-nav-blue'>Data Science</span>
                </p>

                <div className='w-[13.5vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white mt-[0.5vw]'>
                  <p>
                    Start my 1-month free trial
                  </p>
                </div>
              </div>

              <div className='pl-[3vw] pt-[3vw] w-[58.5vw]'>
                <p className='text-[1.4vw] font-semibold mb-[1vw]'>
                  Course Details
                </p>

                <p className='text-[0.9vw] text-strathmore-grey font-semibold'>
                  Python, known for its simplicity and versatility, has become one of the most popular programming languages worldwide. This course offers a comprehensive journey through the history of Python, from its humble beginnings to its current status as a powerhouse in the world of programming. Through engaging video lessons, informative slides, and expert narration, students will explore the key milestones, major releases, and significant developments that have shaped Python into what it is today.
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CoursePage