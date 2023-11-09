import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import RedirectPage from './RedirectPage';
import ButtonList from './ButtonList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:gistId" element={<RedirectPage />} />
        <Route path="/" element={<ButtonList />} />
      </Routes>
    </Router>
  );
}

export default App;
