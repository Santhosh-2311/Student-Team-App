import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddMember() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    year: '',
    degree: '',
    role: '',
    aboutProject: '',
    certificate: '',
    aboutYourself: '',
    github: '',
    linkedin: '',
    image: null
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing in LinkedIn field
    if (name === 'linkedin' && error && error.includes('LinkedIn')) {
      setError('');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      setFormData({
        ...formData,
        image: file
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateLinkedInUrl = (url) => {
    if (!url) return true; // Optional field
    // Remove any trailing slashes
    url = url.replace(/\/$/, '');
    // Check if it's a valid LinkedIn profile URL
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedinRegex.test(url);
  };

  const formatLinkedInUrl = (url) => {
    if (!url) return '';
    // Remove trailing slashes
    url = url.replace(/\/$/, '');
    // Add https:// if not present
    if (!/^https?:\/\//.test(url)) {
      url = 'https://' + url;
    }
    // Add www. if not present
    if (!/^https?:\/\/www\./.test(url)) {
      url = url.replace(/^(https?:\/\/)/, '$1www.');
    }
    return url;
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.rollNumber.trim()) return 'Roll Number is required';
    if (!formData.year.trim()) return 'Year is required';
    if (!formData.degree.trim()) return 'Degree is required';
    if (!formData.role.trim()) return 'Role is required';
    if (!formData.aboutProject.trim()) return 'Project description is required';
    if (!formData.aboutYourself.trim()) return 'About yourself is required';
    if (formData.github && !formData.github.match(/^(https:\/\/github\.com\/)?[a-zA-Z0-9-]+$/)) {
      return 'Invalid GitHub username or URL';
    }
    if (formData.linkedin && !validateLinkedInUrl(formData.linkedin)) {
      return 'Invalid LinkedIn URL. Please use format: linkedin.com/in/username';
    }
    if (!formData.image) return 'Profile image is required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'image') {
        submitData.append('image', formData.image);
      } else if (key === 'linkedin' && formData[key]) {
        submitData.append(key, formatLinkedInUrl(formData[key]));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/members', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data) {
        navigate('/members');
      }
    } catch (error) {
      console.error('Error adding member:', error);
      let errorMessage = 'Failed to add member. ';
      
      if (error.response) {
        // The server responded with an error
        errorMessage += error.response.data.message || error.response.data.error || '';
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage += 'No response from server. Please check your connection.';
      } else {
        // Something happened in setting up the request
        errorMessage += error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-member">
      <h2>Add New Team Member</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="member-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number *</label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year *</label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="degree">Degree *</label>
          <select
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          >
            <option value="">Select Degree</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="M.Sc">M.Sc</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Researcher">Researcher</option>
            <option value="Documentation">Documentation</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="aboutProject">About Project *</label>
          <textarea
            id="aboutProject"
            name="aboutProject"
            value={formData.aboutProject}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe your project and your contributions"
          />
        </div>

        <div className="form-group">
          <label htmlFor="certificate">Certificates</label>
          <textarea
            id="certificate"
            name="certificate"
            value={formData.certificate}
            onChange={handleChange}
            rows="2"
            placeholder="List your relevant certificates"
          />
        </div>

        <div className="form-group">
          <label htmlFor="aboutYourself">About Yourself *</label>
          <textarea
            id="aboutYourself"
            name="aboutYourself"
            value={formData.aboutYourself}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Tell us about yourself, your interests, and your goals"
          />
        </div>

        <div className="form-group">
          <label htmlFor="github">GitHub Profile</label>
          <input
            type="text"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="GitHub username or profile URL"
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn Profile</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="e.g., linkedin.com/in/username"
          />
          <small>Format: linkedin.com/in/username</small>
        </div>

        <div className="form-group">
          <label htmlFor="image">Profile Image *</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <small>Maximum file size: 5MB</small>
        </div>

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Adding Member...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
}

export default AddMember; 