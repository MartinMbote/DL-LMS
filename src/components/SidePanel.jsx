import React from 'react'
import { homeIconBlue, homeIconWhite, folderIconWhite, coursesIcon, certificateIcon, helpCenterImage } from '../assets'

const SidePanel = () => {

    const sidePanelData = [
        {
            icon: [homeIconWhite],
            title: "Home",
            subTitle: []
        },

        {
            icon: [folderIconWhite],
            title: "Browse",
            subTitle: ["Business", "Technology", "Creative"]
        },

        {
            icon: [coursesIcon],
            title: "My Courses",
            subTitle: []
        },

        {
            icon: [certificateIcon],
            title: "Certifications",
            subTitle: []
        }
    ];

  return (
    <div>
        <div className='w-[17vw] h-[43.8vw] bg-nav-blue pt-[4.5vw]'>
          {/* <div>
            <div className='pl-[2vw] flex gap-[0.8vw] py-[0.5vw] bg-white font-bold text-[1.25vw] text-nav-blue'>
                <img src={homeIconBlue} className='h-[1.35vw] mt-[0.3vw]' />

                <p>
                    Home
                </p>
            </div>

            <div className='pl-[4.2vw] py-[0.5vw] font-light tracking-[0.15vw] text-[1.25vw] text-white'>
                <p>
                    Business
                </p>
            </div>
          </div> */}

          {sidePanelData.map((option, index) => (
            <div key={index} className='cursor-pointer'>
                <div className='pl-[2vw] flex gap-[0.8vw] py-[0.5vw] text-white hover:bg-white font-bold text-[1.25vw] hover:text-nav-blue transition-colors duration-200 ease-in-out'>
                    <img src={option.icon} className='h-[1.4vw] mt-[0.3vw]' />

                    <p>
                        {option.title}
                    </p>
                </div>

                {option.subTitle.map((info, i) => (
                    <div className='pl-[4.2vw] py-[0.5vw] font-light tracking-[0.15vw] text-[1.25vw] text-white hover:bg-white hover:text-nav-blue'>
                        <p>
                            {option.subTitle[i]}
                        </p>
                    </div>
                ))}
            </div>
          ))}

          <div>
            <img src={helpCenterImage} className='h-[17vw] mt-[1vw] ml-[0.9vw]' />
          </div>
        </div>
    </div>
  )
}

export default SidePanel