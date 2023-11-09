import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RedirectPage from './RedirectPage';
import ButtonList from './ButtonList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:gistId" element={<RedirectPage />} />
        <Route path="/" element={<ButtonList />} /> {/* Optional: If you want a default behavior */}
      </Routes>
    </Router>
  );
}

export default App;
