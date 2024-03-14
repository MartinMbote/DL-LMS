import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logInwhite, logIn, googleLogo } from '../assets';

const SignUpPage = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        repeatPassword: ''
      });

      const [agreeTerms, setAgreeTerms] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleCheckboxChange = () => {
        setAgreeTerms(!agreeTerms);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreeTerms) {
            alert("Please agree to the Terms & Conditions.");
            return;
        }

        // Check if all required fields are filled
        if (!firstName || !lastName || !email || !username || !password || !repeatPassword || !agreeTerms) {
            alert("Please fill in all fields.");
            return;
        }

        // Check if passwords match
        if (password !== repeatPassword) {
            alert("Passwords do not match.");
            return;
        }
        
        // Implement form submission logic here, e.g., send data to backend API
        console.log(formData);
      };
    
      const { firstName, lastName, email, username, password, repeatPassword } = formData;

  return (
    <div>
        <div className='w-full h-[5vw] bg-nav-logged'>
            <Link to="/dl-lms/">
            <div className='absolute mt-[0.9vw] ml-[1.5vw]'>
                <div className='flex font-bold gap-[0.8vw]'>
                <div className='text-white bg-nav-blue w-[3.3vw] h-[3.3vw] rounded-[0.7vw] text-[1.4vw] flex justify-center leading-[3.2vw] '>
                    <p>
                    DL
                    </p>
                </div>

                <p className='text-nav-blue mt-[0.8vw] text-[1.1vw]'>
                    DIGITAL LEARNING
                </p>
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

                        <div className='text-left font-semibold mt-[2vw] mb-[1vw]'>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className='flex gap-[1.5vw] mb-[1vw]'>
                                        <div>
                                            <p className='text-[0.9vw]'>
                                                First Name: 
                                            </p>

                                            <input type="text" name="firstName" value={firstName} onChange={handleChange} placeholder='Enter First Name' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
                                        </div>

                                        <div>
                                            <p className='text-[0.9vw]'>
                                                Last Name: 
                                            </p>

                                            <input type="text" name="lastName" value={lastName} onChange={handleChange} placeholder='Enter Last Name' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
                                        </div>
                                    </div>

                                    <div className='flex gap-[1.5vw] mb-[1vw]'>
                                        <div>
                                            <p className='text-[0.9vw]'>
                                                Email ID: 
                                            </p>

                                            <input type="email" name="email" value={email} onChange={handleChange} placeholder='Enter Email ID' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
                                        </div>

                                        <div>
                                            <p className='text-[0.9vw]'>
                                                Username: 
                                            </p>

                                            <input type="text" name="username" value={username} onChange={handleChange} placeholder='Enter preferred Username' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
                                        </div>
                                    </div>

                                    <div className='flex gap-[1.5vw] mb-[1vw]'>
                                        <div>
                                            <p className='text-[0.9vw]'>
                                                Password: 
                                            </p>

                                            <input type="password" name="password" value={password} onChange={handleChange} placeholder='Enter Password' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
                                        </div>

                                        <div>
                                            <p className='text-[0.9vw]'>
                                                Repeat Password: 
                                            </p>

                                            <input type="password" name="repeatPassword" value={repeatPassword} onChange={handleChange} placeholder='Repeat Password' className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-[15vw] h-[1.7vw]' />
                                        </div>
                                    </div>
                                </div>

                                <label>                                    
                                    <div className='flex gap-[0.7vw] mb-[1vw]'>
                                        <input type="checkbox" checked={agreeTerms} onChange={handleCheckboxChange} />

                                        <p className='text-[0.9vw] mt-[-0.05vw]'>
                                            I Agree to the Terms & Conditions
                                        </p>
                                    </div>
                                </label>
                                
                                <div className='flex justify-center'>
                                    <button type="submit" className='flex bg-nav-blue text-white text-[0.9vw] text-center w-[18vw] h-[2vw] pl-[5.5vw] pt-[0.25vw] rounded-[0.3vw] gap-[2.5vw]'>
                                        Create Account

                                        <img src={logInwhite} className='h-[1.2vw] mt-[0.15vw]' />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className='flex font-bold mb-[1vw]'>
                            <div className='w-full h-[0.1vw] mt-[0.8vw] bg-black'></div>

                            <p className='mx-[0.8vw]'>
                                OR
                            </p>

                            <div className='w-full h-[0.1vw] mt-[0.8vw] bg-black'></div>
                        </div>

                        <div className='flex justify-center mb-[1vw]'>
                            <button className='flex border-gray-500 border-[0.15vw] text-[0.9vw] text-center w-[18vw] h-[2vw] pl-[2.5vw] pt-[0.25vw] rounded-[0.3vw] font-semibold gap-[3.5vw]'>
                                <img src={logIn} className='h-[1.2vw] mt-[0.1vw]' />

                                Sign In 
                            </button>
                        </div>

                        <div className='flex justify-center mb-[1.5vw]'>
                            <button className='flex border-gray-500 border-[0.15vw] text-[0.9vw] text-center w-[18vw] h-[2vw] pl-[2.5vw] pt-[0.25vw] rounded-[0.3vw] font-semibold gap-[1vw]'>
                                <img src={googleLogo} className='h-[1.2vw] mt-[0.1vw]' />

                                Continue with Google 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUpPage