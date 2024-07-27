import React, { useState } from 'react';

const SubchapterContent = ({ content, title }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyContent = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <div className="subchapter-content p-6 bg-black text-white rounded-md max-w-3xl mx-auto relative">
            <h2 className="text-2xl mb-4">Further notes on {title}</h2>
            <a
                href="#"
                onClick={handleCopyContent}
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-300"
            >
                {isCopied ? 'Copied' : 'Copy Content'}
            </a>
            <div className="content-box bg-gray-900 text-gray-400 p-4 rounded-md whitespace-pre-wrap">
              {content}
            </div>
        </div>
    );
};

export default SubchapterContent;
