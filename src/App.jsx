import React from 'react';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import About from './components/about.jsx';
import ProjectsPage from './components/ProjectsPage/ProjectsPage.jsx'; 
import ProjectDetailPage from './components/ProjectDetailPage/ProjectDetailPage.jsx'; 
import TopHeader from './components/TopHeader/TopHeader';
import ContactPage from './components/ContactPage/ContactPage.jsx';
import Footer from './components/Footer/Footer.jsx';
import NotFound from './components/NotFound/NotFound.jsx';

const Layout = ({ children }) => {
    const location = useLocation();
    const showTopHeader = location.pathname !== '/';

    return (
      <>
        {showTopHeader && <TopHeader />}
        <main style={{ paddingTop: showTopHeader ? '60px' : '0px' }}>
          {children}
        </main>
        <Footer />
      </>
    );
  };

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ProjectsPage />} /> 
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} /> 
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
