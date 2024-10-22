import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMessages = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get('/messages');
      setMessages(response.data);
    } catch (error) {
      setErrorMessage('Error fetching messages. Please try again.');
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      setErrorMessage('Message cannot be empty.');
      return;
    }
    
    setIsSending(true);
    setErrorMessage('');
    try {
      await axios.post('/messages', { content: newMessage }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      setErrorMessage('Error sending message. Please try again.');
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>

      <div className="mb-4 h-64 overflow-y-scroll bg-gray-100 p-2 rounded-md">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : (
          <>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg.id} className="p-2 bg-blue-100 rounded-md mb-2">
                  {msg.content}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No messages yet.</div>
            )}
          </>
        )}
      </div>

      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}

      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <button
        onClick={handleSendMessage}
        className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md font-semibold 
          ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        disabled={isSending}
      >
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default Chat;
