import React, { useState } from 'react';
import axios from '../services/api';

const AnswerQuestion = ({ questionId }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim().length < 10) {
      setErrorMessage('Answer must be at least 10 characters long.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      await axios.post('/answers', { content, questionId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setContent('');
      setSuccessMessage('Your answer has been submitted!');
      setTimeout(() => setSuccessMessage(''), 3000);  // Clear message after 3 seconds
    } catch (error) {
      setErrorMessage('Error submitting answer. Please try again.');
      console.error('Error answering question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Answer Question</h2>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your answer"
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
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AnswerQuestion;
