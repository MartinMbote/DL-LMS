import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const getCSRFToken = () => {
  let csrfToken = null;
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      csrfToken = value;
    }
  });
  return csrfToken;
};

axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken();

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/api/dl-lms/reset/${uid}/${token}/`, {
        new_password: password,
      });

      if (response.status === 200) {
        setSuccess(true);
        Toastify({
          text: "Password reset successfully! Redirecting to login...",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          style: {
            background: "rgba(2, 51, 141, 0.4)",
            borderRadius: "10px",
            fontSize: "15px",
            padding: "15px",
          },
        }).showToast();
        setTimeout(() => {
           navigate('/dl-lms/loginPage');
        }, 3000); // Redirect after 3 seconds
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      Toastify({
        text: "Failed to reset password. Please try again.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "rgba(128, 0, 0, 0.4)",
          borderRadius: "10px",
          fontSize: "15px",
          padding: "15px",
        },
      }).showToast();
      console.error('Password reset error:', err); // Log the error for debugging
    } finally {
      setLoading(false);
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
              <p className='font-bold text-[1.2vw]'>Reset Your Password</p>
              <p className='text-[0.9vw]'>Please fill in your new password</p>
              
              <form onSubmit={handleSubmit}>
                <div className='flex gap-[1.5vw] mb-[1vw]'>
                  <div>
                    <p className='text-[0.9vw]'>New Password:</p>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder='Enter new password'
                      className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]'
                      required
                    />
                  </div>
                  <div>
                    <p className='text-[0.9vw]'>Confirm Password:</p>
                    <input
                      type="password"
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder='Confirm new password'
                      className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]'
                      required
                    />
                  </div>
                </div>
                <div className='flex flex-col items-center mb-[1vw]'>
                  <button
                    type="submit"
                    className='flex justify-center items-center border-gray-500 border-[0.15vw] text-[0.9vw] text-center w-[18vw] h-[2vw] rounded-[0.3vw] font-semibold hover:scale-105 transition-transform mt-[1vw]'
                    disabled={loading}
                  >
                    Reset Password
                  </button>
                </div>
                {loading && <p>Loading...</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
