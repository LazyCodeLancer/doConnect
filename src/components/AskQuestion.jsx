import React, { useState } from 'react';
import axios from '../services/api';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/questions', { title, content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit">Ask</button>
      </form>
    </div>
  );
};

export default AskQuestion;
