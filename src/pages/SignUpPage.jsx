import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logInwhite, logIn, googleLogo } from '../assets';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleScriptLoad = () => {
      window.google.accounts.id.initialize({
        client_id: '16764930346-lm50ojbsa6cua9go1lan6vb3u4b1gkfk.apps.googleusercontent.com',
        callback: handleGoogleResponse
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );
    };

    if (window.google) {
      handleGoogleScriptLoad();
    } else {
      const script = document.createElement('script');
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = handleGoogleScriptLoad;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/login/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to log in with Google');
      }

      const data = await res.json();
      console.log('Google login successful:', data);
      navigate('/dl-lms/dashboard', { replace: true });
    } catch (error) {
      console.error('Error during Google login:', error);
      Toastify({
        text: error.message || 'Error during Google login. Please try again.',
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
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, include an uppercase letter and a special character.');
      return;
    }

    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to register');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      navigate('/dl-lms/activate', { replace: true });
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.message || 'Error during registration. Please try again.');
    }
  };

  const { first_name, last_name, email, username, password, repeatPassword } = formData;

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
              <p className='font-bold text-[1.2vw]'>
                Make the most of your professional life
              </p>
              <p className='text-[0.9vw]'>
                Please fill in your details to sign in to your account
              </p>
              {error && <p className='text-red-500'>{error}</p>}
              <div className='text-left font-semibold mt-[2vw] mb-[1vw]'>
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className='flex gap-[1.5vw] mb-[1vw]'>
                      <div>
                        <p className='text-[0.9vw]'>First Name:</p>
                        <input type="text" name="first_name" value={first_name} onChange={handleChange} placeholder='Enter First Name' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
                      </div>
                      <div>
                        <p className='text-[0.9vw]'>Last Name:</p>
                        <input type="text" name="last_name" value={last_name} onChange={handleChange} placeholder='Enter Last Name' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
                      </div>
                    </div>
                    <div className='flex gap-[1.5vw] mb-[1vw]'>
                      <div>
                        <p className='text-[0.9vw]'>Email




ChatGPT
ID:</p>
<input type="email" name="email" value={email} onChange={handleChange} placeholder='Enter Email ID' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
</div>
<div>
<p className='text-[0.9vw]'>Username:</p>
<input type="text" name="username" value={username} onChange={handleChange} placeholder='Enter preferred Username' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
</div>
</div>
<div className='flex gap-[1.5vw] mb-[1vw]'>
<div>
<p className='text-[0.9vw]'>Password:</p>
<input type="password" name="password" value={password} onChange={handleChange} placeholder='Enter Password' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
</div>
<div>
<p className='text-[0.9vw]'>Repeat Password:</p>
<input type="password" name="repeatPassword" value={repeatPassword} onChange={handleChange} placeholder='Repeat Password' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
</div>
</div>
</div>
<label>
<div className='flex gap-[0.7vw] mb-[1vw]'>
<input type="checkbox" checked={agreeTerms} onChange={handleCheckboxChange} />
<p className='text-[0.9vw] mt-[-0.05vw]'>I Agree to the Terms & Conditions</p>
</div>
</label>
<div className='flex justify-center'>
<button type="submit" className='flex bg-nav-blue text-white text-[0.9vw] text-center w-[18vw] h-[2vw] pl-[5.5vw] pt-[0.25vw] rounded-[0.3vw] gap-[2.5vw] hover:scale-105 transition-transform'>
Create Account
<img src={logInwhite} className='h-[1.2vw] mt-[0.15vw]' />
</button>
</div>
</form>
</div>
<div className='flex font-bold mb-[1vw]'>
<div className='w-full h-[0.1vw] mt-[0.8vw] bg-black'></div>
<p className='mx-[0.8vw]'>OR</p>
<div className='w-full h-[0.1vw] mt-[0.8vw] bg-black'></div>
</div>
<div className='flex justify-center mb-[1vw]'>
<Link to='/dl-lms/LogInPage'>
<button className='flex border-gray-500 border-[0.15vw] text-[0.9vw] text-center w-[18vw] h-[2vw] pl-[2.5vw] pt-[0.25vw] rounded-[0.3vw] font-semibold gap-[3.5vw] hover:scale-105 transition-transform'>
<img src={logIn} className='h-[1.2vw] mt-[0.1vw]' />
Sign In
</button>
</Link>
</div>
<div className='flex justify-center mb-[1.5vw]'>
<div id="googleSignInButton"></div>
</div>
</div>
</div>
</div>
</div>
</div>
)
}

export default SignUpPage;