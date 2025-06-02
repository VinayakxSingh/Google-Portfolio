import React from 'react';
import './about.css'; // Styles for this component

const About = () => {
  // Data adapted from your Portfolio/src/components/aboutme.jsx
  const aboutData = {
    name: "Vinayak Singh",
    intro: "A passionate developer crafting meaningful digital experiences.",
    description: "I'm a full-stack web developer with a strong foundation in the MERN stack, currently enhancing my skills at Masai School. I combine technical expertise with creative problem-solving to build applications that are both functional and user-friendly.",
    profileImageUrl: "/profile.jpg", // Make sure this image is in your public folder
    highlights: [
      {
        title: "MERN Stack Developer",
        description: "Specializing in building modern web applications with the MERN stack (MongoDB, Express, React, Node.js).",
      },
      {
        title: "Clean Code Advocate",
        description: "Passionate about writing maintainable, efficient, and well-documented code following best practices.",
      },
      {
        title: "Problem Solver",
        description: "Enjoy tackling complex challenges and finding elegant solutions to technical problems.",
      },
      {
        title: "Badminton Champion",
        description: "State-level badminton gold medalist with a competitive spirit that carries into my development work.",
      },
    ],
    cta: [
      { text: "View My Work", link: "/projects" }, // You might want to update these links to actual routes
      { text: "Get In Touch", link: "/contact" },
    ]
  };

  return (
    <div className="about-page-google">
      <header className="about-header-google">
        <div className="about-profile-image-container-google">
          <img src={aboutData.profileImageUrl} alt={aboutData.name} className="about-profile-image-google" />
        </div>
        <div className="about-title-section-google">
          <h1 className="about-name-google">{aboutData.name}</h1>
          <p className="about-intro-google">{aboutData.intro}</p>
        </div>
      </header>

      <main className="about-main-content-google">
        <section className="about-description-section-google">
          <h2 className="about-section-title-google">About</h2>
          <p>{aboutData.description}</p>
        </section>

        <section className="about-highlights-section-google">
          <h2 className="about-section-title-google">Key Highlights</h2>
          <div className="about-highlights-grid-google">
            {aboutData.highlights.map((item, index) => (
              <div key={index} className="about-highlight-item-google">
                <h3 className="about-highlight-title-google">{item.title}</h3>
                <p className="about-highlight-description-google">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-cta-section-google">
          {aboutData.cta.map((action, index) => (
            <a key={index} href={action.link} className="about-cta-link-google">
              {action.text}
            </a>
          ))}
        </section>
      </main>
    </div>
  );
};

export default About;