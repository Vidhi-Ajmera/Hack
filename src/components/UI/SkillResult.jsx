import React from 'react';
import '../../styles/SkillResult.css';

const SkillResult = ({ analysisData }) => {
  // If no data is provided, show default or empty state
  if (!analysisData || !analysisData.simplified_skills) {
    return null;
  }

  const { 
    match_percentage, 
    simplified_skills, 
    feedback, 
    missing_skills 
  } = analysisData;

  return (
    <div className="result-section">
      <div className="skill-match-container">
        <h3 className="skill-match-heading">Skill Match Results</h3>
        
        <div className="match-percentage">
          Overall Match: <strong>{match_percentage || 0}%</strong>
        </div>
        
        <p className="feedback">{feedback}</p>
        
        {simplified_skills && simplified_skills.length > 0 ? (
          <>
            <h4>Skills Analysis:</h4>
            <ul>
              {simplified_skills.map((skill, i) => (
                <li key={i} className="skill-item">
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-metrics">
                    <span>Proficiency: {skill.proficiency}%</span>
                    <span>Learning Opportunity: {skill.learning}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No matching skills found.</p>
        )}
        
        {missing_skills && missing_skills.length > 0 && (
          <>
            <h4>Missing Skills:</h4>
            <p>{missing_skills.join(', ')}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillResult;