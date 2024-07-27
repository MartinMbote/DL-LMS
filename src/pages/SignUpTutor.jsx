import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import debounce from 'lodash/debounce';

const SignUpTutor = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    qualification: '',
    institution: '',
    experience: '',
    expertise: '',
    cv_upload: null,
  });
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [csrfToken, setCsrfToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get-csrf-token/', {
          method: 'GET',
          credentials: 'include',
        });
        const csrfTokenResponse = await response.json();
        Cookies.set('csrftoken', csrfTokenResponse.csrfToken, { sameSite: 'Strict' });
        setCsrfToken(csrfTokenResponse.csrfToken);
      } catch (error) {
        setError('Failed to fetch CSRF token');
      }
    };
    getCsrfToken();
  }, []);

  const fetchInstitutions = debounce(async (searchTerm) => {
    if (searchTerm.length > 2) {
      try {
        const response = await axios.get(`http://universities.hipolabs.com/search?name=${searchTerm}`);
        setSearchResults(response.data);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error('Error fetching institutions:', error);
      }
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  }, 300);

  useEffect(() => {
    fetchInstitutions(searchTerm);
  }, [searchTerm]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'institution') {
      setSearchTerm(value);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cv_upload: e.target.files[0] });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const formDataForBackend = new FormData();
    for (const key in formData) {
      formDataForBackend.append(key, formData[key]);
    }

    formDataForBackend.append('confirm_password', formData.confirmPassword);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register-teacher/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: formDataForBackend,
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/dl-lms/activate/:uidb64/:token');
      } else {
        const data = await response.json();
        setError(data.detail || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred during registration');
    }
  };

  const handleInstitutionSelect = (institution) => {
    setFormData({ ...formData, institution });
    setSearchTerm(institution);
    setIsDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <p className='font-bold text-[1.2vw]'>
                Make the most of your professional life
              </p>
              <p className='text-[0.9vw]'>
                Please fill in your details to sign in to your account
              </p>
              {error && <p className='text-red-500'>{error}</p>}
              <div className='text-left font-semibold mt-[2vw] mb-[1vw]'>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                  {currentStep === 1 && (
                    <div className="w-[28vw]">
                      <div className='flex gap-[1.5vw] mb-[1vw]'>
                        <div className="w-1/2">
                          <p className='text-[0.9vw]'>First Name:</p>
                          <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                            required
                          />
                        </div>
                        <div className="w-1/2">
                          <p className='text-[0.9vw]'>Last Name:</p>
                          <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                            required
                          />
                        </div>
                      </div>
                      <div className='flex gap-[1.5vw] mb-[1vw]'>
                        <div className="w-1/2">
                          <p className='text-[0.9vw]'>Email:</p>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                            required
                          />
                        </div>
                        <div className="w-1/2">
                          <p className='text-[0.9vw]'>Phone:</p>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <p className='text-[0.9vw]'>Address:</p>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                          required
                        />
                      </div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="w-[28vw]">
                      <div>
                        <p className='text-[0.9vw]'>Qualification:</p>
                        <input
                          type="text"
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleChange}
                          className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                          required
                        />
                      </div>
                      <div ref={dropdownRef} className="relative">
                        <p className='text-[0.9vw]'>Institution:</p>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                          required
                        />
                        {isDropdownVisible && (
                          <div className="border rounded w-full max-h-[8vw] overflow-y-auto mt-1 absolute bg-white z-10">
                            {searchResults.map((institution) => (
                              <div
                                key={institution.name}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleInstitutionSelect(institution.name)}
                              >
                                {institution.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className='text-[0.9vw]'>Years of Experience:</p>
                        <input
                          type="text"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                          required
                        />
                      </div>
                      <div>
                        <p className='text-[0.9vw]'>Area of Expertise:</p>
                        <input
                          type="text"
                          name="expertise"
                          value={formData.expertise}
                          onChange={handleChange}
                          className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                          required
                        />
                      </div>
                      <div>
                        <p className='text-[0.9vw]'>Upload CV:</p>
                        <input
                          type="file"
                          name="cv_upload"
                          onChange={handleFileChange}
                          className='text-[0.8vw] mt-1'
                          required
                        />
                      </div>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="w-[28vw]">
                      <div className='flex gap-[1.5vw] mb-[1vw]'>
                        <div className="w-1/2">
                          <p className='text-[0.9vw]'>Username:</p>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                            required
                          />
                        </div>
                        <div className="w-1/2">
                          <p className='text-[0.9vw]'>Password:</p>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <p className='text-[0.9vw]'>Confirm Password:</p>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className='border placeholder-gray-500 text-[0.8vw] pl-[1vw] border-gray-400 rounded-[0.4vw] w-full h-[1.7vw]'
                          required
                        />
                      </div>
                    </div>
                  )}
                  <div className='flex justify-between mt-[1.5vw] w-[28vw]'>
                    {currentStep > 1 && (
                      <button type="button" onClick={handlePrevious} className='border border-blue-500 text-blue-500 rounded px-4 py-2'>
                        Previous
                      </button>
                    )}
                    {currentStep < 3 ? (
                      <button type="button" onClick={handleNext} className='bg-blue-500 text-white rounded px-4 py-2'>
                        Next
                      </button>
                    ) : (
                      <button type="submit" className='bg-blue-500 text-white rounded px-4 py-2'>
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <p className='text-[0.8vw] mt-[1vw]'>
                Already have an account?{' '}
                <Link to="/dl-lms/login" className='text-blue-500'>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpTutor;
