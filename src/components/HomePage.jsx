import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Question List</h1>
      <ul>
        {questions.map(question => (
          <li key={question.id}>{question.title}: {question.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
