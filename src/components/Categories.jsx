import React, { useState, useEffect } from 'react';
import { designIcon, developmentIcon, itIcon, marketingIcon, personaldevelopmentIcon, businessIcon, photoIcon, artsIcon } from '../assets';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      let response = await fetch('http://127.0.0.1:8000/api/categories/', {
        method: 'GET'
      });
      let data = await response.json();

      if (response.status === 200) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div>
      <div className='w-full h-[8.5vw] mt-[5vw]'>
        <p className='text-strathmore-red text-[3vw] mt-[2vw] ml-[8vw]'>
          Top Categories
        </p>
      </div>

      <div className='flex justify-center mt-[-2vw] mb-[3vw]'>
        <div className='w-[80vw] pb-[3vw] flex '>
          <div className='flex gap-[2vw] flex-wrap justify-center'>
            {categories.map((category, index) => (
              <div key={index}>
                <div className='w-[13vw] h-[13vw] bg-opacity-20 bg-strathmore-grey border border-black'>
                  <img src={category.image} className='h-[12.8vw]' alt={category.name} />
                </div>
                <p className='text-[1vw] font-semibold mt-[0.6vw]'>
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
