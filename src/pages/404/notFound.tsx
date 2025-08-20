import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css'; // اگر خواستی استایل جدا داشته باشی

const NotFound: React.FC = () => {
  return (
    <div className="notfound">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/">
        <button className="home-btn">Back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
