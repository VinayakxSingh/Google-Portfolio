import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projects.js';
import './ProjectsPage.css';

const ProjectsPage = () => {
  return (
    <div className="projects-page-container">
      <h1 className="projects-page-title">My Projects</h1>
      <div className="projects-grid">
        {projectsData.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id} className="project-card-link">
            <div className="project-card">
              <div className="project-card-image-container">
                <img src={project.imageSrc || '/placeholder-project.png'} alt={project.name} className="project-card-image" />
              </div>
              <h2 className="project-card-name">{project.name}</h2>
              <p className="project-card-description">
                {project.description.substring(0, 100)}...
              </p>
              <div className="project-card-technologies">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
                {project.technologies.length > 3 && <span className="tech-tag\">...</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage