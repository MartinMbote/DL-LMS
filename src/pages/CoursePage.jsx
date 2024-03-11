import React, { useState }  from 'react'
import { NavBar } from '../components'
import { star, downArrow, playButton } from '../assets';
import ReactPlayer from 'react-player';

const CoursePage = () => {

  const stars = [star, star, star, star, star];

  const overviewData = [
    {
      title: "Overview of Python",
      subTitle: ["History of Python", "Why Python is Popular", "Applications of Python", "Installing Python"]
    }, 

    {
      title: "Basic Syntax",
      subTitle: ["Syntax"]
    }, 

    {
      title: "Control Flow",
      subTitle: ["flowing"]
    }
  ];

  const [rotation, setRotation] = useState(0);
  const [view, setView] = useState('hidden');

  const rotateImage = () => {
    setRotation(rotation + 180); // Rotate 90 degrees on each click
    setView(view === 'hidden' ? 'flex' : 'hidden');
  };

  return (
    <div>
        <NavBar isLoggedIn={true} />
        
        <div>
          <div className='ml-[5.6vw] flex gap-[3vw]'>
            <div>
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

                <div className='pl-[3vw] pt-[3vw] w-[58.5vw] mb-[13vw]'>
                  <p className='text-[1.4vw] font-semibold mb-[1vw]'>
                    Course Details
                  </p>

                  <p className='text-[0.9vw] text-strathmore-grey font-semibold mb-[1.2vw]'>
                    Python, known for its simplicity and versatility, has become one of the most popular programming languages worldwide. This course offers a comprehensive journey through the history of Python, from its humble beginnings to its current status as a powerhouse in the world of programming. Through engaging video lessons, informative slides, and expert narration, students will explore the key milestones, major releases, and significant developments that have shaped Python into what it is today.
                  </p>

                  <p className='text-[1.4vw] font-semibold mb-[0.8vw]'>
                    Skills you will gain
                  </p>

                  <p className='border-[0.15vw] py-[0.6vw] w-[16vw] text-[1vw] flex justify-center text-strathmore-grey font-semibold border-strathmore-grey rounded-[0.6vw] mb-[1vw] cursor-none'>
                    Programming Fundamentals
                  </p>

                  <p className='text-[1.4vw] font-semibold mb-[0.6vw]'>
                    Meet the Instructor
                  </p>

                  <p className='ml-[1vw] text-[1.1vw] text-nav-blue font-semibold mb-[0.6vw]'>
                    Sensei
                  </p>

                  <p className='text-[1.4vw] font-semibold mb-[0.6vw]'>
                    Learner Reviews
                  </p>

                  <div className='flex'>
                    <p className='ml-[1vw] text-[1vw] text-strathmore-grey font-semibold'>
                      4.0 out of 5
                    </p>

                    <div className='flex gap-[0.2vw] mt-[0.45vw] mx-[0.7vw]'>
                        {stars.map((star, idx) => (
                          <img key={idx} src={star} className='h-[0.7vw]' />
                        ))}
                    </div>

                    <div>
                      <p className='text-[1vw] text-strathmore-grey font-semibold'>
                        4,100 Ratings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className='py-[1.5vw] text-[1.1vw] font-semibold text-strathmore-grey'>
                Courses
              </p>

              {/* <div className='w-[22.8vw] border-[0.15vw] rounded-[0.4vw] border-gray-300 '>
                <div className='border-t-[0.15vw]'>
                  <div className='py-[1.8vw] text-[1.1vw] flex gap-[6vw] font-semibold  pl-[2vw] cursor-pointer' onClick={rotateImage}>
                    <p>
                      Overview of Python
                    </p>

                    <img src={downArrow} 
                      className='transition ease-in-out duration-600 h-[1vw] mt-[0.32vw]' 
                      style={{ transform: `rotate(${rotation}deg)` }}
                    />
                  </div>

                  <div className={`w-full h-[3vw] bg-nav-blue bg-opacity-30 flex gap-[0.8vw]  ${view}`}>
                    <div className='h-full w-[0.4vw] bg-nav-blue'></div>

                    <img src={playButton} className='h-[1.2vw] mt-[1vw]' />

                    <div className='font-semibold mt-[0.35vw]'>
                      <p className='text-[0.85vw]'>
                        History of Python
                      </p>

                      <p className='text-[0.7vw] text-strathmore-grey'>
                        10m 30s
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className='w-[22.8vw] border-[0.15vw] rounded-[0.4vw] border-gray-300 '>
                {overviewData.map((info, index) => (
                  <div className='border-t-[0.15vw]' key={index}>
                    <div className='py-[1.8vw] text-[1.1vw] flex font-semibold  pl-[2vw] cursor-pointer' onClick={rotateImage}>
                      <p className='w-[16vw]'>
                        {info.title}
                      </p>

                      <img src={downArrow} 
                        className='transition ease-in-out duration-600 h-[1vw] mt-[0.32vw]' 
                        style={{ transform: `rotate(${rotation}deg)` }}
                      />
                    </div>

                    {info.subTitle.map((subInfo, i) => (
                      <div className={`w-full h-[3vw] active:bg-nav-blue active:bg-opacity-30 flex gap-[0.8vw] cursor-pointer  ${view}`}>
                        <div className='h-full w-[0.4vw] opacity-0 bg-nav-blue'></div>

                        <img src={playButton} className='h-[1.2vw] mt-[1vw]' />

                        <div className='font-semibold mt-[0.35vw]'>
                          <p className='text-[0.85vw]'>
                            {info.subTitle[i]}
                          </p>

                          <p className='text-[0.7vw] text-strathmore-grey'>
                            10m 30s
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CoursePage