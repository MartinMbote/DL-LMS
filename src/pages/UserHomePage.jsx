import React from 'react'
import { NavBar, SidePanel } from '../components'
import { Link } from 'react-router-dom'
import { pinksweater, pythonForDataScience, star, bigDataImage, dataStructureImg, DataAnalytics, clearArrow } from '../assets'

const UserHomePage = () => {

  const stars = [star, star, star, star, star];
    
    const sectionTitle = [
      {
        title: "Top Picks for Martin",

        coursesImages: [pythonForDataScience, bigDataImage, dataStructureImg, DataAnalytics, pythonForDataScience, bigDataImage, dataStructureImg, DataAnalytics],

        courseText: ["Python for Data Science", "Advanced Big Data", "Data Structure & Analysis", "Data Analytics", "Python for Data Science", "Advanced Big Data", "Data Structure & Analysis", "Data Analytics"],

        byWho: ["Phalex"]
      }, 

      {
        title: "This weeks top Courses",

        coursesImages: [pythonForDataScience, bigDataImage, dataStructureImg, DataAnalytics, pythonForDataScience, bigDataImage, dataStructureImg, DataAnalytics],

        courseText: ["Python for Data Science", "Advanced Big Data", "Data Structure & Analysis", "Data Analytics", "Python for Data Science", "Advanced Big Data", "Data Structure & Analysis", "Data Analytics"],

        byWho: ["John"]
      },

      {
        title: "Popular on DL Learning",

        coursesImages: [pythonForDataScience, bigDataImage, dataStructureImg, DataAnalytics, pythonForDataScience, bigDataImage, dataStructureImg, DataAnalytics],
        
        courseText: ["Python for Data Science", "Advanced Big Data", "Data Structure & Analysis", "Data Analytics", "Python for Data Science", "Advanced Big Data", "Data Structure & Analysis", "Data Analytics"],

        byWho: ["Mike"]
      },

      {
        title: "New Releases",

        coursesImages: [pythonForDataScience, bigDataImage, dataStructureImg, DataAnalytics, pythonForDataScience, bigDataImage, dataStructureImg, DataAnalytics],
        
        courseText: ["Python for Data Science", "Advanced Big Data", "Data Structure & Analysis", "Data Analytics", "Python for Data Science", "Advanced Big Data", "Data Structure & Analysis", "Data Analytics"],

        byWho: ["Micheal"]
      }
    ];

  return (
    <div>
      <NavBar isLoggedIn={true} />
      
      <div className='flex'>
        <SidePanel />

        
        <div className='w-full h-[43.8vw] overflow-y-auto'>
          <div className='flex gap-[1vw]'>
            <div className='w-[31vw] top-[17vw] left-[8vw] mt-[11vw] ml-[5vw]'>
              <p className='text-strathmore-red text-[3vw] font-semibold leading-[4vw]'>
                Martin, Keep learning at a safe and steady pace.
              </p>

              <p className='text-strathmore-grey font-semibold mt-[2vw] mb-[2.2vw] text-[1.05vw]'>
                <span className='text-nav-blue'>Expert-led courses</span> across a variety of <span className='text-nav-blue'>online class topics</span> for every step of your career. Instructors with real-world experience.
              </p>

              <div className=' flex gap-[2.8vw] justify-center'>
                {/* <Link to="/dl-lms/LearnCoursePage">
                  <div className='w-[11vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white'>
                    <p>
                      Try my free Month
                    </p>
                  </div>
                </Link> */}

                <div className='w-[11vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white'>
                    <p>
                      Start my free Month
                    </p>
                  </div>

                <div className='w-[11vw] h-[2.8vw] border-[0.15vw] border-strathmore-grey text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-strathmore-grey text-[1vw]'>
                  <p>
                    Buy for my Team
                  </p>
                </div>
              </div>
            </div>

            <div>
              <img src={pinksweater} className='h-[35vw] mt-[6vw]' />
            </div>
          </div>


          {/* <div className='mb-[3vw]'>
            <div className='border w-full h-[8.5vw] bg-opacity-20 bg-strathmore-grey'>
                <p className='text-strathmore-red text-[3vw] mt-[1.8vw] ml-[8vw]'>
                    Top Picks for Martin
                </p>
            </div>

            <div>

              <div className='flex justify-end gap-[0.5vw] mr-[2vw] mt-[1.3vw]'>
                <img src={clearArrow} className='h-[2vw] rotate-180 cursor-pointer' />

                <img src={clearArrow} className='h-[2vw] cursor-pointer' />
              </div>
                

                <div className='flex justify-center mt-[1.2vw]'>
                    <div className='border w-[80vw] py-[3vw] flex'>
                        
                        <div className='flex gap-[2vw] overflow-x-auto'>

                          <div className='w-[0vw] h-[1vw] bg-black'></div>

                            {coursesImages.map((image, index) => (
                                <div key={index} className='cursor-pointer flex-shrink-0'>
                                    <img src={image} className='h-[9vw]' />
                                    <div className='flex ml-[1.5vw] text-[1vw] font-bold mt-[0.7vw]'>
                                        <div>
                                            <p className='text-strathmore-grey font-semibold mt-[-0.4vw] mb-[0.2vw] text-[0.95vw]'>
                                              Course
                                            </p>
                                            <p>{courseText[index]}</p>
                                            <div className='flex text-[0.8vw] my-[0.2vw]'>
                                                <p className='text-[0.7vw] text-strathmore-grey mb-[1vw]'>
                                                  By: 
                                                </p>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}

                          <div className='w-[0vw] h-[1vw] bg-black'></div>
                        </div>

                    </div>
                </div>
            </div>
        </div> */}


        {sectionTitle.map((section, index) => (
          <div className='mb-[3vw]' key={index}>
            <div className='border w-full h-[8.5vw] bg-opacity-20 bg-strathmore-grey'>
                <p className='text-strathmore-red text-[3vw] mt-[1.8vw] ml-[8vw]'>
                    {section.title}
                </p>
            </div>

            <div>

              <div className='flex justify-end gap-[0.5vw] mr-[2vw] mt-[1.3vw]'>
                <img src={clearArrow} className='h-[2vw] rotate-180 cursor-pointer' />

                <img src={clearArrow} className='h-[2vw] cursor-pointer' />
              </div>

              <div className='flex justify-center mt-[1.2vw]'>
                    <div className='border w-[80vw] py-[3vw] flex'>
                        
                        <div className='flex gap-[2vw] overflow-x-auto'>

                          <div className='w-[0vw] h-[1vw] bg-black'></div>

                            {/* {section.coursesImages.map((image, i) => (
                                <div key={i} className='cursor-pointer flex-shrink-0'>
                                    <img src={image} className='h-[9vw]' />
                                    <div className='flex ml-[1.5vw] text-[1vw] font-bold mt-[0.7vw]'>
                                        <div>
                                            <p className='text-strathmore-grey font-semibold mt-[-0.4vw] mb-[0.2vw] text-[0.95vw]'>
                                              Course
                                            </p>
                                            <p>{section.courseText[i]} </p>
                                            <div className='flex text-[0.8vw] my-[0.2vw]'>
                                                <p className='text-[0.7vw] text-strathmore-grey mb-[1vw]'>
                                                  By: {section.byWho}
                                                </p>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))} */}

                            <Link className='flex gap-[2vw]' to='/dl-lms/LearnCoursePage'>
                              {section.coursesImages.map((image, i) => (
                                  <div key={i} className='cursor-pointer flex-shrink-0'>
                                      <img src={image} className='h-[9vw]' />
                                      <div className='flex ml-[1.5vw] text-[1vw] font-bold mt-[0.7vw]'>
                                          <div>
                                              <p className='text-strathmore-grey font-semibold mt-[-0.4vw] mb-[0.2vw] text-[0.95vw]'>
                                                Course
                                              </p>
                                              <p>{section.courseText[i]} </p>
                                              <div className='flex text-[0.8vw] my-[0.2vw]'>
                                                  <p className='text-[0.7vw] text-strathmore-grey mb-[1vw]'>
                                                    By: {section.byWho}
                                                  </p>
                                                  
                                              </div>
                                              
                                          </div>
                                      </div>
                                  </div>
                              ))}
                            </Link>

                          <div className='w-[0vw] h-[1vw] bg-black'></div>
                        </div>

                    </div>
                </div>

            </div>
          </div>
        ))}


        </div>
      </div>
    </div>
  )
}

export default UserHomePage