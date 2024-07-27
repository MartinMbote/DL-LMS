import React from 'react';
import { homeIconWhite, folderIconWhite, coursesIcon, certificateIcon, helpCenterImage } from '../assets';
import { Link } from 'react-router-dom';

const SidePanelAdmin = () => {
  const sidePanelData = [
    {
      icon: homeIconWhite,
      title: 'Applications',
      link: '/dl-lms/PendingTeacherList',
      subTitle: []
    },
    {
      icon: folderIconWhite,
      title: 'Browse',
      link: '#', // This will be empty as we will set links for subTitle
      subTitle: [
        { name: 'Learners', link: '/dl-lms/LearnersPage' },
        { name: 'Instructors', link: '/dl-lms/StudentPage' }
      ]
    },
    {
      icon: coursesIcon,
      title: 'Categories',
      link: '/dl-lms/CategoriesPage',
      subTitle: []
    },
    {
      icon: certificateIcon,
      title: 'Courses',
      link: '/dl-lms/CoursesPage',
      subTitle: []
    }
  ];

  return (
    <div>
      <div className='w-[17vw] h-[43.8vw] bg-strathmore-grey pt-[4.5vw]'>
        {sidePanelData.map((option, index) => (
          <div key={index} className='cursor-pointer'>
            {option.link !== '#' ? (
              <Link to={option.link}>
                <div className='pl-[2vw] flex gap-[0.8vw] py-[0.5vw] text-white hover:bg-white font-bold text-[1.25vw] hover:text-nav-blue transition-colors duration-200 ease-in-out'>
                  <img src={option.icon} className='h-[1.4vw] mt-[0.3vw]' alt={`${option.title}-icon`} />
                  <p>{option.title}</p>
                </div>
              </Link>
            ) : (
              <div className='pl-[2vw] flex gap-[0.8vw] py-[0.5vw] text-white font-bold text-[1.25vw] transition-colors duration-200 ease-in-out'>
                <img src={option.icon} className='h-[1.4vw] mt-[0.3vw]' alt={`${option.title}-icon`} />
                <p>{option.title}</p>
              </div>
            )}
            {option.subTitle.map((info, i) => (
              <Link to={info.link} key={i}>
                <div className='pl-[4.2vw] py-[0.5vw] font-light tracking-[0.15vw] text-[1.25vw] text-white hover:bg-white hover:text-nav-blue'>
                  <p>{info.name}</p>
                </div>
              </Link>
            ))}
          </div>
        ))}
        <div>
          <img src={helpCenterImage} className='h-[17vw] mt-[1vw] ml-[0.9vw]' alt='help-center' />
        </div>
      </div>
    </div>
  );
};

export default SidePanelAdmin;
