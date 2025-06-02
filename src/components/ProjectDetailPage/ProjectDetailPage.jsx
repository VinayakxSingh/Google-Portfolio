import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../../data/projects.js';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="project-detail-container project-not-found">
        <h2>Project Not Found</h2>
        <p>The project you are looking for does not exist.</p>
        <Link to="/projects" className="back-to-projects-link">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <Link to="/projects" className="back-to-projects-link breadcrumb-link">‹ Projects</Link>
      <h1 className="project-detail-name">{project.name}</h1>
      <div className="project-detail-content">
        <div className="project-detail-image-container">
          <img src={project.imageSrc || '/placeholder-project.png'} alt={project.name} className="project-detail-image" />
        </div>
        <div className="project-detail-info">
          <p className="project-detail-description">{project.description}</p>
          <h3>Technologies Used:</h3>
          <div className="project-detail-technologies">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag-detail">{tech}</span>
            ))}
          </div>
          <div className="project-detail-links">
            {project.githubLink &&
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-action-button">View on GitHub</a>
            }
            {project.liveDemoLink &&
              <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="project-action-button live-demo-button">View Live Demo</a>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectDetailPage;