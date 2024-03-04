import React, { useState } from 'react';  //We use the useState hook to manage the state of the search query.
import { triangle, searchIcon } from '../assets';

const SearchComponent = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);   //The handleInputChange function updates the query state as the user types in the input field.
      };

    const handleSearch = () => {
        onSearch(query);    //The handleSearch function is called when the user clicks the "Search" button. It invokes the onSearch function passed as a prop, passing the current query as an argument.
    };

  return (
    <div>
      <div className='absolute  flex text-white'>
        <div className='w-[10vw] bg-search-green rounded-l-[0.7vw] border-r-[0.1vw] flex justify-center'>
            <div className='flex absolute gap-[0.8vw] top-[0.7vw] font-semibold text-[1.1vw]'>
                <p>
                    Explore
                </p>

                <img src={triangle} className='w-[0.68vw] h-[0.68vw] mt-[0.54vw]' />
            </div>
            
        </div>

        <input
            type="text"
            placeholder="What do you want to Learn?"
            value={query}
            onChange={handleInputChange}
            className='h-[3vw] w-[22.5vw] bg-search-green placeholder-white text-[1vw] '
        />
        <button onClick={handleSearch} className='w-[2.6vw] bg-search-green rounded-r-[0.7vw]'>
            <img src={searchIcon} className='h-[1.3vw]' />
        </button>
      </div>
    </div>
  )
}

export default SearchComponent