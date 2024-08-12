import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPrompt = ({ onClose, courseId, coursePrice }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(`/dl-lms/checkout/${courseId}/${coursePrice}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-[1.4vw] font-semibold mb-[1vw]">Unlock Chapters</h2>
        <p className="py-[1.5vw] text-[1.1vw] font-semibold text-strathmore-grey">To access this chapter, you need to purchase the course for ${coursePrice}.</p>
        <div className="flex justify-center">
          <button
            onClick={handleConfirm}
            className="w-[13.5vw] h-[2.8vw] bg-nav-blue text-center rounded-[0.6vw] leading-[2.6vw] cursor-pointer font-semibold text-white drop-shadow text-[1vw] border-[0.15vw] border-white mt-[0.5vw]"
          >
            Continue Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPrompt;
