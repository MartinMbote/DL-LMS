import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { logIn } from '../assets';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Correctly access the login function from context

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
       Toastify({
    text: "Login successful, start exploring",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: "rgba(2, 51, 141, 0.4)",
      borderRadius: "10px",
      fontSize: "15px",  // Increased font size
      padding: "15px",   // Increase padding
        },
      }).showToast();
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || "Failed, check username or password";
       Toastify({
    text: errorMessage,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: "rgba(128, 0, 0, 0.4)",
      borderRadius: "10px",
      fontSize: "15px",  // Increased font size
      padding: "15px",   // Increase padding
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
              <div className='text-white bg-nav-blue w-[3.3vw] h-[3.3vw] rounded-[0.7vw] text-[1.4vw] flex justify-center leading-[3.2vw] '>
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
              <p className='text-[0.9vw]'>Please fill in your details to sign in to your account</p>
              {error && <p className='text-red-500'>{error}</p>}
              <div className='text-left font-semibold mt-[2vw] mb-[1vw]'></div>
              <form onSubmit={handleSubmit}>
                <div className='flex gap-[1.5vw] mb-[1vw]'>
                  <div>
                    <p className='text-[0.9vw]'>Username:</p>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder='Enter preferred Username'
                      className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]'
                      required
                    />
                  </div>
                  <div>
                    <p className='text-[0.9vw]'>Password:</p>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder='Enter preferred Password'
                      className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]'
                      required
                    />
                  </div>
                </div>
                <div className='flex flex-col items-center mb-[1vw]'>
                  <button
                    type="submit"
                    className='flex border-gray-500 border-[0.15vw] text-[0.9vw] text-center w-[18vw] h-[2vw] pl-[2.5vw] pt-[0.25vw] rounded-[0.3vw] font-semibold gap-[3.5vw] hover:scale-105 transition-transform'
                    disabled={loading}
                  >
                    <img src={logIn} className='h-[1.2vw] mt-[0.1vw]' alt="Log In" />
                    Sign In
                  </button>
                  <Link to="/dl-lms/password/reset" className='text-blue-500 text-[0.8vw] mt-[1vw] hover:underline'>
                    Forgot Password?
                  </Link>
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

export default LoginPage;
