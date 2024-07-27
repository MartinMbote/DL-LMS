import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActivationPage = () => {
  const { uidb64, token } = useParams();
  const [message, setMessage] = useState('');

  const handleActivate = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/activate/${uidb64}/${token}/`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to activate account');
      }

      const data = await response.json();
      setMessage(data.message);
      toast.success(data.message);

      // Redirect to login page or dashboard
      setTimeout(() => {
        window.location.href = '/dl-lms/loginPage';
      }, 3000);
    } catch (error) {
      setMessage('Error activating account: ' + error.message);
      toast.error('Error activating account: ' + error.message);
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
      <div className='w-full h-[43.8vw] bg-nav-blue flex flex-col items-center justify-center text-center'>
        <h1 className='text-white text-[2vw] mb-[1vw]'>Activate Your Account</h1>
        <p className='text-white text-[1.2vw] mb-[2vw]'>Please click the button below to activate your account.</p>
        <button
          className='flex border-gray-500 border-[0.15vw] text-[0.9vw] text-center w-[18vw] h-[2vw] justify-center items-center rounded-[0.3vw] font-semibold gap-[0.5vw] hover:scale-105 transition-transform bg-white text-nav-blue'
          onClick={handleActivate}
        >
          Activate Account
        </button>
        {message && <p className='text-white text-[1vw] mt-[2vw]'>{message}</p>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ActivationPage;
