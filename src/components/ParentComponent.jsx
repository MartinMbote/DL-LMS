import React, { useState } from 'react';
import SearchComponent from './SearchComponent';

const ParentComponent = () => {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <div>
            <h1>Course Search</h1>
            <SearchComponent onSearch={handleSearchResults} isLoggedIn={true} />
            <div>
                {searchResults.length > 0 && (
                    <div>
                        <h2>Search Results:</h2>
                        <ul>
                            {searchResults.map((course) => (
                                <li key={course.id}>{course.title}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParentComponent;
