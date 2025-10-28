import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StoreListPage from './pages/StoreListPage';
import AddRatingPage from './pages/AddRatingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoreListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/rate/:id" element={<AddRatingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
