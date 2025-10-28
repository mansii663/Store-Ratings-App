import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import '../styles/global.css';

function AddRatingPage() {
  const [ratingValue, setRatingValue] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await api.post('/ratings', {
        storeId: id,
        ratingValue,
        comment,
      });

      setMessage(res.data.message);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error(err);
      setMessage('Failed to add rating. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Rate This Store</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>Rating (1–5)</label>
        <select
          value={ratingValue}
          onChange={(e) => setRatingValue(parseInt(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        <label>Comment (optional)</label>
        <textarea
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback..."
        />

        <button type="submit">Submit Rating</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      <p
        onClick={() => navigate('/')}
        style={{ color: '#007bff', cursor: 'pointer', marginTop: '15px' }}
      >
        ← Back to Store List
      </p>
    </div>
  );
}

export default AddRatingPage;
