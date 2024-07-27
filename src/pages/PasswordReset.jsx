import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/password_reset/', { email });
      setMessage(response.data.message);
      Toastify({
        text: "Success!, a link has been sent to your email",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "rgba(2, 51, 141, 0.4)",
          borderRadius: "10px",
          fontSize: "15px", // Increase font size
          padding: "15px",  // Increase padding
        },
      }).showToast();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed, user does not exist";
      Toastify({
        text: errorMessage,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "rgba(128, 0, 0, 0.4)",
          borderRadius: "10px",
          fontSize: "15px", // Increase font size
          padding: "15px",  // Increase padding
        },
      }).showToast();
    }
  };

  return (
    <div>
      <div className='w-full h-[5vw] bg-nav-logged'>
        <Link to="/dl-lms/">
          <div className='absolute mt-[0.9vw] ml-[1.5vw]'>
            <div className='flex font-bold gap-[0.8vw]'>
              <div className='text-white bg-nav-blue w-[3.3vw] h-[3.3vw] rounded-[0.7vw] text-[1.4vw] flex justify-center leading-[3.2vw]'>
                <p>DL</p>
              </div>
              <p className='text-nav-blue mt-[0.8vw] text-[1.1vw]'>DIGITAL LEARNING</p>
            </div>
          </div>
        </Link>
      </div>
      <div className='w-full h-[43.8vw] bg-nav-blue flex justify-center'>
        <div className='mt-[3vw]'>
          <div className='bg-white flex justify-center py-[2vw] px-[2vw] rounded-[1vw]'>
            <div className='text-center'>
              <p className='font-bold text-[1.2vw]'>Make the most of your professional life</p>
              <p className='text-[0.9vw]'>Please fill in your Email to reset your account's password</p>
              
             
              
              <form onSubmit={handleSubmit} className='mt-[2vw]'>
                <div className='flex flex-col items-center mb-[1vw]'>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]'
                  />
                  <button
                    type="submit"
                    className='flex justify-center items-center border-gray-500 border-[0.15vw] text-[0.9vw] text-center w-[12vw] h-[2vw] rounded-[0.3vw] font-semibold hover:scale-105 transition-transform mt-[1vw]'
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
