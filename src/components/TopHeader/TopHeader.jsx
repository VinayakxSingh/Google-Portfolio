import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdApps } from "react-icons/md";
import { FaLinkedin, FaGithub, FaFilePdf } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import './TopHeader.css';

const profilePicUrl = '/profile.jpg';
const resumeUrl = '/Vinayak_Singh_FullStack_Stylized.pdf';

// Navigation keywords and their corresponding paths
const navigationKeywords = {
  // Home keywords
  'home': '/',
  'portfolio': '/',
  'main': '/',
  'landing': '/',
  'vinayak': '/',
  'vinayak singh': '/',
  
  // About keywords
  'about': '/about',
  'about me': '/about',
  'about vinayak': '/about',
  'who am i': '/about',
  'bio': '/about',
  'biography': '/about',
  
  // Projects keywords
  'projects': '/projects',
  'my projects': '/projects',
  'work': '/projects',
  'portfolio items': '/projects',
  'showcase': '/projects',
  'my work': '/projects',
  
  // Contact keywords
  'contact': '/contact',
  'contact me': '/contact',
  'reach me': '/contact',
  'get in touch': '/contact',
  'email': '/contact',
  'message': '/contact',
  
  // Resume keywords
  'resume': 'resume',
  'cv': 'resume',
  'download resume': 'resume',
  'my resume': 'resume',
  'curriculum vitae': 'resume'
};

const pageTitles = {
  '/': '', // Empty for home page
  '/about': 'About Vinayak',
  '/projects': 'My Projects',
  '/contact': 'Contact Me'
};

const TopHeader = () => {
  const [showAppsDropdown, setShowAppsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const appsDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Menu items for apps dropdown
  const appsMenuItems = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/vinayak-singh-8ab2442ab/', type: 'link', icon: <FaLinkedin /> },
    { name: 'GitHub', href: 'https://github.com/VinayakxSingh', type: 'link', icon: <FaGithub /> },
    { name: 'Email', href: 'mailto:vinayaksinghforyou@gmail.com', type: 'link', icon: <MdEmail /> },
    { name: 'Resume', href: resumeUrl, type: 'download', downloadName: 'Vinayak_Singh_Resume.pdf', icon: <FaFilePdf /> },
  ];

  // Menu items for profile dropdown
  const profileMenuItems = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Resume', path: resumeUrl, downloadName: 'Vinayak_Singh_Resume.pdf', isDownload: true }
  ];

  // Set initial search query based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const currentKeyword = Object.entries(navigationKeywords).find(
      ([_, path]) => path === currentPath || (typeof path === 'string' && currentPath.startsWith(path))
    );

    if (currentKeyword) {
      setSearchQuery(currentKeyword[0].charAt(0).toUpperCase() + currentKeyword[0].slice(1));
    } else if (currentPath === '/') {
      setSearchQuery('Home');
    } else if (currentPath.startsWith('/projects/')) {
      setSearchQuery('Project Details');
    } else {
      setSearchQuery('');
    }
  }, [location.pathname]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    
    // Filter suggestions based on input (case insensitive)
    const searchTerm = query.toLowerCase();
    const matched = Object.entries(navigationKeywords)
      .filter(([keyword]) => keyword.includes(searchTerm))
      .map(([keyword, path]) => ({
        keyword,
        path,
        display: keyword.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      }))
      .sort((a, b) => a.keyword.localeCompare(b.keyword));
    
    setSuggestions(matched);
    setShowDropdown(matched.length > 0);
  };
  
  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) return;
    
    // Try to find exact match first
    if (navigationKeywords[query]) {
      navigateToPage(navigationKeywords[query]);
      return;
    }
    
    // Try to find partial match
    const matched = Object.entries(navigationKeywords).find(([keyword]) => 
      keyword.includes(query)
    );
    
    if (matched) {
      navigateToPage(matched[1]);
    } else {
      // No match found, navigate to 404 with the search query
      navigate('/not-found', { state: { searchQuery: query } });
    }
    
    setShowDropdown(false);
  };
  
  // Navigate to the specified path
  const navigateToPage = (path) => {
    if (path === 'resume') {
      // Handle resume download
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.setAttribute('download', 'Vinayak_Singh_Resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      navigate(path);
    }
    setSearchQuery('');
  };
  
  // Handle clicking on a suggestion
  const handleSuggestionClick = (suggestion) => {
    navigateToPage(suggestion.path);
    setShowDropdown(false);
  };

  // Handle keyboard navigation in search
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleSuggestionClick(suggestions[0]);
      } else {
        handleSearchSubmit(e);
      }
    } else if (e.key === 'ArrowDown' && suggestions.length > 0) {
      e.preventDefault();
      const firstSuggestion = document.querySelector('.suggestion-item');
      if (firstSuggestion) firstSuggestion.focus();
    }
  };

  // Handle keyboard navigation in suggestions
  const handleSuggestionKeyDown = (e, suggestion, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSuggestionClick(suggestion);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextSuggestion = document.querySelectorAll('.suggestion-item')[index + 1];
      if (nextSuggestion) nextSuggestion.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) {
        searchRef.current?.querySelector('input')?.focus();
      } else {
        const prevSuggestion = document.querySelectorAll('.suggestion-item')[index - 1];
        if (prevSuggestion) prevSuggestion.focus();
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      searchRef.current?.querySelector('input')?.focus();
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (appsDropdownRef.current && !appsDropdownRef.current.contains(event.target)) {
        setShowAppsDropdown(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [appsDropdownRef, profileDropdownRef, searchRef]);

  return (
    <header className="top-header">
      <div className="header-left">
        <Link to="/" className="header-logo-link">
          <img src="/google-logo.png" alt="Google" className="google-logo-img" />
        </Link>
      </div>
      
      <div className="header-middle">
        <form className="search-form" onSubmit={handleSearchSubmit} ref={searchRef}>
          <svg 
            className="search-icon" 
            focusable="false" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"></path>
          </svg>
          <input
            type="text"
            className="header-search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => searchQuery.trim() !== '' && setShowDropdown(true)}
            placeholder={pageTitles[location.pathname] || 'Search...'}
            aria-label="Search"
            aria-haspopup="listbox"
            aria-expanded={showDropdown}
            role="combobox"
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            autoComplete="off"
            spellCheck="false"
          />
          {showDropdown && suggestions.length > 0 && (
            <div 
              className="search-suggestions"
              role="listbox"
              aria-label="Search suggestions"
              id="search-suggestions"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.keyword}
                  className={`suggestion-item ${index === 0 ? 'highlighted' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onKeyDown={(e) => handleSuggestionKeyDown(e, suggestion, index)}
                  role="option"
                  tabIndex={-1}
                  aria-selected={index === 0}
                >
                  {suggestion.display}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
      
      <div className="header-right">
        <div className="apps-icon-container" ref={appsDropdownRef}>
          <button 
            onClick={() => setShowAppsDropdown(!showAppsDropdown)} 
            className="header-icon-button"
            aria-label="Google apps"
            aria-expanded={showAppsDropdown}
            aria-haspopup="true"
          >
            <MdApps size={24} />
          </button>
          {showAppsDropdown && (
            <ul className="apps-dropdown-menu">
              {appsMenuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apps-dropdown-item-link"
                    download={item.downloadName}
                  >
                    <span className="apps-dropdown-item-icon">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="profile-container" ref={profileDropdownRef}>
          <button 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)} 
            className="profile-button"
            aria-label="Google Account"
            aria-expanded={showProfileDropdown}
            aria-haspopup="true"
          >
            <img 
              src={profilePicUrl} 
              alt="Profile" 
              className="profile-picture" 
              onError={(e) => { 
                e.target.onerror = null;
                e.target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'profile-picture-fallback';
                fallback.textContent = 'V';
                e.target.parentNode.appendChild(fallback);
              }} 
            />
          </button>
          {showProfileDropdown && (
            <ul className="profile-dropdown-menu">
              {profileMenuItems.map((item) => (
                <li key={item.name}>
                  {item.isDownload ? (
                    <a
                      href={item.path}
                      download={item.downloadName}
                      className="profile-dropdown-item-link"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="profile-dropdown-item-link"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
