import React from 'react';

const PaymentPrompt = ({ onClose, coursePrice, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Unlock Chapters</h2>
        <p className="mb-6">To access this chapter, you need to purchase the course for ${coursePrice}.</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPrompt;
