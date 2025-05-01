import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewMembers.css';

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/members');
        setMembers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching members:', error);
        setError('Failed to load team members. Please try again later.');
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="members-container">
        <div className="loading">Loading team members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="members-container">
        <div className="error-message">{error}</div>
        <Link to="/add" className="btn btn-primary">Add New Member</Link>
      </div>
    );
  }

  return (
    <div className="members-container">
      <h2>Team Members</h2>
      {members.length === 0 ? (
        <div className="no-members">
          <p>No team members found.</p>
          <Link to="/add" className="btn btn-primary">Add New Member</Link>
        </div>
      ) : (
        <div className="members-grid">
          {members.map(member => (
            <div key={member._id} className="member-card">
              <div className="member-image">
                <img 
                  src={member.imageUrl.startsWith('http') 
                    ? member.imageUrl 
                    : `http://localhost:5000${member.imageUrl}`}
                  alt={member.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                  }}
                />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <Link 
                  to={`/members/${member._id}`} 
                  className="btn btn-secondary view-details"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="add-member-button">
        <Link to="/add" className="btn btn-primary">Add New Member</Link>
      </div>
    </div>
  );
}

export default ViewMembers; 