import React, { useState } from 'react';
import Navbar from "../components/UI/Navbar.jsx";
import Footer from "../components/UI/Footer.jsx";
import ResumeUpload from "../components/UI/ResumeUpload.jsx";
import SkillResult from "../components/UI/SkillResult.jsx";
import '../styles/Home.css';

const Home = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  
  const handleAnalysisComplete = (data) => {
    setAnalysisResult(data);
    // Scroll to results
    setTimeout(() => {
      document.querySelector('.result-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="home-container">
          <ResumeUpload onAnalysisComplete={handleAnalysisComplete} />
          {analysisResult && <SkillResult analysisData={analysisResult} />}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
