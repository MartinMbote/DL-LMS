import React from 'react'

const Footer = () => {

    const digitalLearningLinks = ["About", "What we Offer", "Careers", "Catalog", "Coursera Plus", "Professional Certificates", "For Enterprise", "Social Impact", "Free Courses", "All Courses"];

    const communityLinks = ["Learners", "Partners", "Blog", "The DL Podcast"];

    const moreLinks = ["Press", "Terms", "Privacy", "Help", "Accessiblity", "Contatc", "Articles", "Directory"];

  return (
    <div>
        <div className='w-full pb-[0.4vw] pt-[6vw] bg-strathmore-grey flex justify-center text-white'>
            <div>
                <div className='flex gap-[18vw] mb-[1.8vw] justify-center'>
                    <div>
                        <h2 className='text-[1.35vw] font-semibold tracking-wide'>
                            Digital Learning
                        </h2>

                        {digitalLearningLinks.map((link, index) => (
                            <div key={index} className='mt-[0.2vw] text-[0.9vw]'>
                                <p>
                                    {link}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className='text-[1.35vw] font-semibold tracking-wide'>
                            Community
                        </h2>

                        {communityLinks.map((link, index) => (
                            <div key={index} className='mt-[0.2vw] text-[0.9vw]'>
                                <p>
                                    {link}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className='text-[1.35vw] font-semibold tracking-wide'>
                            More
                        </h2>

                        {moreLinks.map((link, index) => (
                            <div key={index} className='mt-[0.2vw] text-[0.9vw]'>
                                <p>
                                    {link}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-[80vw] h-[0.05vw] bg-white'></div>

                <p className='text-[0.9vw] mt-[0.4vw] text-center'>
                    © 2024 Digital-Learning Inc. All rights reserved.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Footer