import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GlobalSearchBar.css';

// External links configuration
const EXTERNAL_LINKS = {
  github: { url: 'https://github.com/yourusername', label: 'GitHub Profile' },
  linkedin: { url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn Profile' },
  mail: { url: 'mailto:youremail@example.com', label: 'Send Email' },
  email: { url: 'mailto:youremail@example.com', label: 'Send Email' },
  gmail: { url: 'mailto:youremail@example.com', label: 'Send Email' },
};

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
  '/': "Vinayak's Portfolio",
  '/about': 'About Vinayak',
  '/projects': 'My Projects',
  '/contact': 'Contact Me',
};

const GlobalSearchBar = ({ variant }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const resumeUrl = "/Vinayak_Singh_FullStack_Stylized.pdf";
  
  // Set current title based on path
  useEffect(() => {
    let title = pageTitles[location.pathname];
    if (title === undefined) {
      title = location.pathname.startsWith('/projects/') 
        ? 'Project Details' 
        : '';
    }
    setSearchQuery(title);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

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
    
    // Match navigation keywords
    const matchedNav = Object.entries(navigationKeywords)
      .filter(([keyword]) => keyword.includes(searchTerm))
      .map(([keyword, path]) => ({
        keyword,
        path,
        display: keyword.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        isExternal: false
      }));
    
    // Match external links
    const matchedExternal = Object.entries(EXTERNAL_LINKS)
      .filter(([keyword, data]) => 
        keyword.includes(searchTerm) || 
        data.label.toLowerCase().includes(searchTerm)
      )
      .map(([keyword, data]) => ({
        keyword,
        path: data.url,
        display: data.label,
        isExternal: true
      }));
    
    // Combine and sort all matches
    const matched = [...matchedNav, ...matchedExternal]
      .sort((a, b) => a.keyword.localeCompare(b.keyword));
    
    setSuggestions(matched);
    setShowDropdown(matched.length > 0);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleSuggestionClick(suggestions[0]);
      } else if (searchQuery.trim() !== '') {
        // Check if it's an external link
        const query = searchQuery.trim().toLowerCase();
        const externalLink = Object.entries(EXTERNAL_LINKS).find(([key]) => 
          key === query || key.includes(query)
        );
        
        if (externalLink) {
          window.open(EXTERNAL_LINKS[externalLink[0]].url, '_blank', 'noopener,noreferrer');
        } else {
          handleSearchSubmit(e);
        }
      }
    }
  };
  
  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) return;
    
    // Check for external links first
    if (EXTERNAL_LINKS[query]) {
      window.open(EXTERNAL_LINKS[query].url, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Try to find exact match in navigation keywords
    if (navigationKeywords[query]) {
      navigateToPage(navigationKeywords[query]);
      return;
    }
    
    // Try to find partial match in navigation keywords
    const matchedNav = Object.entries(navigationKeywords).find(([keyword]) => 
      keyword.includes(query)
    );
    
    if (matchedNav) {
      navigateToPage(matchedNav[1]);
    } else {
      // Try to find in external links by partial match
      const matchedExternal = Object.entries(EXTERNAL_LINKS).find(([key]) => 
        key.includes(query)
      );
      
      if (matchedExternal) {
        window.open(EXTERNAL_LINKS[matchedExternal[0]].url, '_blank', 'noopener,noreferrer');
      } else {
        // No match found, navigate to 404 with the search query
        navigate('/not-found', { state: { searchQuery: query } });
      }
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
    setShowDropdown(false);
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.display);
    
    // Check if it's an external link
    if (EXTERNAL_LINKS[suggestion.keyword]) {
      window.open(EXTERNAL_LINKS[suggestion.keyword].url, '_blank', 'noopener,noreferrer');
    } else {
      navigateToPage(suggestion.path);
    }
  };

  return (
    <div 
      className={`search-bar ${variant === 'landing' ? 'landing' : ''}`}
      ref={searchRef}
    >
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div 
          className="search-input-container"
          onFocus={() => searchQuery.trim() !== '' && setShowDropdown(true)}
        >
          <svg 
            className="search-icon" 
            focusable="false" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search or navigate..."
            aria-label="Search or navigate"
            autoComplete="off"
            aria-haspopup="listbox"
            aria-expanded={showDropdown}
          />
          {searchQuery && (
            <button 
              type="button" 
              className="clear-search-btn"
              onClick={() => {
                setSearchQuery('');
                setShowDropdown(false);
              }}
              aria-label="Clear search"
            >
              <svg focusable="false" viewBox="0 0 24 24" width="24" height="24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </button>
          )}
        </div>
      </form>
      
      {showDropdown && suggestions.length > 0 && (
        <div className="search-suggestions" role="listbox">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`suggestion-item ${index === 0 ? 'highlighted' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
              onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(suggestion)}
              role="option"
              tabIndex={0}
              aria-selected={index === 0}
            >
              {suggestion.display}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
