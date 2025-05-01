import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Student Team Management</h1>
      <p>Manage your student team members efficiently</p>
      <div className="home-buttons">
        <Link to="/add" className="btn btn-primary">
          Add New Member
        </Link>
        <Link to="/members" className="btn btn-secondary">
          View All Members
        </Link>
      </div>
    </div>
  );
}

export default Home; 