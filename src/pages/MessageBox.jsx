import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MessageBox = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { authTokens, user } = useAuth();

  useEffect(() => {
    if (currentUser && selectedUser) {
      axios.get('http://127.0.0.1:8000/api/messages/', {
        params: {
          sender: currentUser.id,
          receiver: selectedUser.id,
        },
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
        },
      })
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
    }
  }, [authTokens, currentUser, selectedUser]);

  const sendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      axios.post('http://127.0.0.1:8000/api/messages/', {
        text: newMessage,
        receiver: selectedUser.id,
      }, {
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
        },
      })
      .then(response => {
        setMessages([...messages, response.data]);
        setNewMessage('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
    }
  };

  useEffect(() => {
    const pusher = new Pusher('YOUR_PUSHER_APP_KEY', {
      cluster: 'YOUR_PUSHER_APP_CLUSTER',
      authEndpoint: 'http://127.0.0.1:8000/pusher/auth/',
      auth: {
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
        },
      },
    });

    const channel = pusher.subscribe('private-messages');

    channel.bind('new-message', function(data) {
      if (data.receiver === user.id || data.sender === user.id) {
        setMessages(prevMessages => [...prevMessages, data]);
      }
    });

    return () => {
      pusher.unsubscribe('private-messages');
    };
  }, [authTokens, user.id]);

  if (!currentUser || !selectedUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div>
        <strong>Selected User ID: {selectedUser.id}</strong>
      </div>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 p-2 rounded ${message.sender === user.id ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}>
            <p>{message.text}</p>
            <span className="text-xs">{new Date(message.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <textarea
          className="flex-1 p-2 border rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
