import React from 'react';
import GlobalSearchBar from '../GlobalSearchBar/GlobalSearchBar.jsx';
import './LandingPage.css';
import { projectsData } from '../../data/projects.js';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1 className="google-heading">
          <img src="/google-logo.png" alt="google logo" width="300px" className='google-logo'/>
        </h1>
      </header>

      <main className="landing-main">
        <GlobalSearchBar variant="landing" />

        <div className="most-visited-container">
          {projectsData.map((project) => (
            <div 
              key={project.id} 
              className="most-visited-item" 
              role="button"
              tabIndex="0"
              onClick={() => window.location.href = `/projects/${project.id}`}
            >
              <div className="project-image-container">
                <img src={project.imageSrc || '/placeholder-project.png'} alt={project.name} className="project-image" />
              </div>
              <a 
                href={project.liveDemoLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link-wrapper"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="project-name">{project.name}</p>
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
