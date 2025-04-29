import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ResumeUpload.css';
import axios from 'axios';

const ResumeUpload = ({ onAnalysisComplete }) => {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUpload = async () => {
    // Validation
    if (!resume) {
      setError('Please select a resume file');
      return;
    }
    if (!jobDesc.trim()) {
      setError('Please enter a job description');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Create form data
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('job_desc', jobDesc);

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Call FastAPI backend
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle successful response
      console.log('Analysis result:', response.data);
      
      // Call the callback function with the analysis data
      if (onAnalysisComplete) {
        onAnalysisComplete(response.data);
      }
    } catch (err) {
      console.error('Error analyzing resume:', err);
      setError(err.response?.data?.detail || 'Failed to analyze resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-box">
      <div className="upload-form">
        <h3>Upload Resume & Job Description</h3>
        
        {error && <div className="error-message">{error}</div>}
        
        <input 
          type="file" 
          accept=".pdf,.doc,.docx,.txt" 
          onChange={(e) => setResume(e.target.files[0])} 
        />
        
        <textarea 
          placeholder="Enter Job Description" 
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)} 
        />
        
        <button 
          onClick={handleUpload} 
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Skills'}
        </button>
      </div>
    </div>
  );
};

export default ResumeUpload;