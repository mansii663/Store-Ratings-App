import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/global.css';

function StoreListPage() {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchStores = async () => {
    try {
      const res = await api.get('/stores');
      setStores(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load stores. Please log in again.');
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleRate = (id) => {
    navigate(`/rate/${id}`);
  };

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Store Listings</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className="store-list">
        {stores.length === 0 ? (
          <p>No stores found.</p>
        ) : (
          stores.map((store) => (
            <div key={store.id} className="store-card">
              <h3>{store.name}</h3>
              <p>Email: {store.email}</p>
              <p>Address: {store.address}</p>
              <p>
                    Average Rating:{' '}
                <strong>{store.averageRating || 'Not rated yet'}</strong>
              </p>
              <button onClick={() => handleRate(store.id)}>Rate Store</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StoreListPage;
