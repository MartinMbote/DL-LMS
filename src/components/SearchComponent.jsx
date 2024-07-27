import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { triangle, searchIcon } from '../assets';

const SearchComponent = ({ onSearch, isLoggedIn }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.length > 0) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/courses/search/', {
            params: {
              title: query,
            },
          });
          setResults(response.data);
          if (typeof onSearch === 'function') {
            onSearch(response.data);
          } else {
            console.error('onSearch is not a function');
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
          console.error('Error response:', error.response);
        }
      } else {
        setResults([]);
      }
    };
    fetchSearchResults();
  }, [query, onSearch]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="relative">
      {isLoggedIn ? (
        <div className="absolute flex text-white">
          <div className="w-[10vw] bg-mockup-yellow rounded-l-[0.7vw] border-r-[0.1vw] flex justify-center">
            <div className="flex absolute gap-[0.8vw] top-[0.7vw] font-semibold text-[1.1vw]">
              <p>Explore</p>
              <img src={triangle} className="w-[0.68vw] h-[0.68vw] mt-[0.54vw]" alt="triangle icon" />
            </div>
          </div>
          <input
            type="text"
            placeholder="What do you want to learn?"
            value={query}
            onChange={handleInputChange}
            className="h-[3vw] w-[22.5vw] bg-mockup-yellow placeholder-white text-[1vw] pl-[1.5vw] focus:outline-none"
          />
          <button className="w-[2.6vw] bg-mockup-yellow rounded-r-[0.7vw]" disabled>
            <img src={searchIcon} className="h-[1.3vw]" alt="search icon" />
          </button>
        </div>
      ) : (
        <div className="absolute flex text-white">
          <div className="w-[10vw] bg-search-green rounded-l-[0.7vw] border-r-[0.1vw] flex justify-center">
            <div className="flex absolute gap-[0.8vw] top-[0.7vw] font-semibold text-[1.1vw]">
              <p>Explore</p>
              <img src={triangle} className="w-[0.68vw] h-[0.68vw] mt-[0.54vw]" alt="triangle icon" />
            </div>
          </div>
          <input
            type="text"
            placeholder="What do you want to learn?"
            value={query}
            onChange={handleInputChange}
            className="h-[3vw] w-[22.5vw] bg-search-green placeholder-white text-[1vw] pl-[1.5vw] focus:outline-none"
          />
          <button className="w-[2.6vw] bg-search-green rounded-r-[0.7vw]" disabled>
            <img src={searchIcon} className="h-[1.3vw]" alt="search icon" />
          </button>
        </div>
      )}
      {results.length > 0 && (
        <div className="absolute w-[35vw] bg-nav-logged rounded-lg shadow-lg p-[1vw] mt-[3.5vw] left-0 z-50">
        
          <ul className="list-none p-0 m-0">
            {results.map((course) => (
              <li key={course.id} className="text-strathmore-grey font-semibold mt-[2vw] mb-[2.2vw] text-[1.05vw] hover:text-grey-500 transition-colors duration-200">
                <a href={`/dl-lms/course/${course.id}/`} className="block">{course.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

SearchComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default SearchComponent;
