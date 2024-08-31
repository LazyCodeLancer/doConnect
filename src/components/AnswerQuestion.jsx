import React, { useState } from 'react';
import axios from '../services/api';

const AnswerQuestion = ({ questionId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/answers', { content, questionId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setContent('');
    } catch (error) {
      console.error('Error answering question:', error);
    }
  };

  return (
    <div>
      <h2>Answer Question</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your answer"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AnswerQuestion;
