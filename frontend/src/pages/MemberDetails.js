import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MemberDetails.css';

function MemberDetails() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching member details:', error);
        setError('Failed to load member details');
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error || !member) {
    return (
      <div className="member-not-found">
        <h2>Member Not Found</h2>
        <Link to="/members" className="btn btn-primary">Back to Members</Link>
      </div>
    );
  }

  return (
    <div className="member-details">
      <div className="member-card-detailed">
        <div className="member-image-large">
          <img 
            src={member.imageUrl.startsWith('http') 
              ? member.imageUrl 
              : `http://localhost:5000${member.imageUrl}`}
            alt={member.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300?text=No+Image';
            }}
          />
        </div>
        <div className="member-info-detailed">
          <h2>{member.name}</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Roll Number:</strong>
              <span>{member.rollNumber}</span>
            </div>
            <div className="info-item">
              <strong>Role:</strong>
              <span>{member.role}</span>
            </div>
            <div className="info-item">
              <strong>Year:</strong>
              <span>{member.year}</span>
            </div>
            <div className="info-item">
              <strong>Degree:</strong>
              <span>{member.degree}</span>
            </div>
          </div>

          <div className="social-links">
            {member.github && (
              <a 
                href={member.github.startsWith('http') ? member.github : `https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
              >
                GitHub Profile
              </a>
            )}
            {member.linkedin && (
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                LinkedIn Profile
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="about-section">
        <h3>About</h3>
        <p>{member.aboutYourself}</p>
      </div>

      <div className="about-section">
        <h3>About Project</h3>
        <p>{member.aboutProject}</p>
      </div>

      {member.certificate && (
        <div className="about-section">
          <h3>Certificates</h3>
          <p>{member.certificate}</p>
        </div>
      )}

      <div className="member-actions">
        <Link to="/members" className="btn btn-secondary">Back to Members</Link>
      </div>
    </div>
  );
}

export default MemberDetails; 