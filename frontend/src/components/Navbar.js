import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Student Team App
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/members" className="nav-link">View Members</Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">Add Member</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; 