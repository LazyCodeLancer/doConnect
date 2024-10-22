import React, { useState } from 'react';
import axios from '../services/api';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length < 5 || content.trim().length < 15) {
      setErrorMessage('Title must be at least 5 characters and content at least 15 characters.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    
    try {
      await axios.post('/questions', { title, content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTitle('');
      setContent('');
      setSuccessMessage('Your question has been posted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);  // Clear message after 3 seconds
    } catch (error) {
      setErrorMessage('Error posting question. Please try again.');
      console.error('Error asking question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md font-semibold 
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Ask'}
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;
