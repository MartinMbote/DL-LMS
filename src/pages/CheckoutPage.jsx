import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NavBar } from '../components';
import { API_URL } from '../config/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutPage = () => {
  const { id: courseId, amount: coursePrice } = useParams();
  const { authTokens, user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email,
      },
    });

    if (error) {
      setError(error.message);
      toast.error(error.message);
      return;
    }

    const response = await fetch(`http://127.0.0.1:8000/api/create-subscription/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access}`
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        email,
        amount: coursePrice * 100,
        course_id: courseId,
      }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error.message);
      toast.error(data.error.message);
    } else {
      if (data.client_secret) {
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(data.client_secret);

        if (confirmError) {
          setError(confirmError.message);
          toast.error(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
          toast.success('Payment successful!');
          navigate(`/dl-lms/course/${courseId}`);
        }
      } else {
        toast.success('Payment successful!');
        navigate(`/dl-lms/course/${courseId}`);
      }
    }
  };

  const navbarProps = {
    isLoggedIn: !!user,
    username: user?.username,
  };

  return (
    <div>
      <NavBar {...navbarProps} />
      <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
        <div
          className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
          style={{ maxWidth: '600px' }}
        >
          <div className="w-full pt-1 pb-5">
            <div className=" bg-nav-blue  text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <i className="mdi mdi-credit-card-outline text-3xl"></i>
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">
              Your Payment Is Secured
            </h1>
          </div>
          <form onSubmit={handlePayment}>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">Email</label>
              <div>
                <input
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="email@example.com"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">Card details</label>
              <div className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md">
                <CardElement />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
            <div>
              <button
                className="block w-full max-w-xs mx-auto bg-nav-blue hover:bg-nav-blue focus:bg-nav-blue text-white rounded-lg px-3 py-3 font-semibold"
                type="submit"
                disabled={!stripe || !elements}
              >
                <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
