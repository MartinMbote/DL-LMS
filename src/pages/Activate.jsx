import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Activate = () => {
    const { uidb64, token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/activate/${uidb64}/${token}/`);
                setMessage('Account activated successfully! You can now log in.');
                // Redirect to login page after a few seconds
                setTimeout(() => {
                    navigate('/dl-lms/loginPage');
                }, 3000);
            } catch (error) {
                setMessage('Activation link is invalid or has expired.');
            }
        };
        activateAccount();
    }, [uidb64, token, navigate]);

    return (
        <div>
            <h2>{message}</h2>
        </div>
    );
};

export default Activate;
