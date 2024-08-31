import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AnswerQuestion from './components/AnswerQuestion';
import AskQuestion from './components/AskQuestion';
import Chat from './components/Chat';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/answer-question/:id" element={<AnswerQuestion />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
