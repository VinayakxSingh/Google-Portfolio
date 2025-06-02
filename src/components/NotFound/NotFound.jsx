import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NotFound.css";

// External links mapping
const EXTERNAL_LINKS = {
  github: { url: "https://github.com/VinayakxSingh", label: "GitHub Profile" },
  linkedin: { url: "https://linkedin.com/in/vinayak-singh-8ab2442ab/", label: "LinkedIn Profile" },
  mail: { url: "mailto:vinayakSinghforyou@gmail.com", label: "Send Email" },
  email: { url: "mailto:vinayakSinghforyou@gmail.com", label: "Send Email" },
  gmail: { url: "mailto:vinayakSinghforyou@gmail.com", label: "Send Email" },
};

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || "";
  const [searchQuery, setSearchQuery] = React.useState(searchTerm);
  const [isExternalLink, setIsExternalLink] = React.useState(false);
  const [externalLink, setExternalLink] = React.useState(null);

  // Popular search suggestions
  const popularSearches = [
    { term: "projects", label: "Projects" },
    { term: "resume", label: "Resume" },
    { term: "about", label: "About Me" },
    { term: "contact", label: "Contact" },
    { term: "home", label: "Home" },
    { term: "github", label: "GitHub" },
    { term: "linkedin", label: "LinkedIn" },
    { term: "email", label: "Email Me" },
  ];

  // Check if search term matches external links
  useEffect(() => {
    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchedLink = Object.keys(EXTERNAL_LINKS).find(key => 
        key.toLowerCase() === normalizedQuery
      );
      
      if (matchedLink) {
        setIsExternalLink(true);
        setExternalLink(EXTERNAL_LINKS[matchedLink]);
      } else {
        setIsExternalLink(false);
        setExternalLink(null);
      }
    } else {
      setIsExternalLink(false);
      setExternalLink(null);
    }
  }, [searchQuery]);

  // Filter suggestions based on current search term
  const filteredSuggestions = searchQuery
    ? popularSearches.filter(suggestion =>
        suggestion.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suggestion.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularSearches;

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) return;
    
    // Check for external links first
    if (isExternalLink && externalLink) {
      window.open(externalLink.url, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Try to find exact match in popular searches
    const matchedSuggestion = popularSearches.find(
      s => s.term.toLowerCase() === query
    );
    
    if (matchedSuggestion) {
      navigate(`/${matchedSuggestion.term}`);
    } else {
      // If no exact match, try to find partial match
      const partialMatch = popularSearches.find(s => 
        s.term.toLowerCase().includes(query)
      );
      
      if (partialMatch) {
        navigate(`/${partialMatch.term}`);
      } else {
        // If still no match, stay on 404 but update URL with search query
        navigate('/not-found', { state: { searchTerm: searchQuery } });
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const normalizedTerm = suggestion.term.toLowerCase();
    
    // Check if it's an external link
    if (EXTERNAL_LINKS[normalizedTerm]) {
      window.open(EXTERNAL_LINKS[normalizedTerm].url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(`/${suggestion.term}`);
    }
  };

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Page Not Found</h2>
      
      <p className="notfound-message">
        {isExternalLink && externalLink ? (
          <>
            Redirecting to {externalLink.label}...
            <div className="external-redirect">
              <button 
                className="external-link-button" 
                onClick={() => window.open(externalLink.url, '_blank', 'noopener,noreferrer')}
              >
                {externalLink.url}
              </button>
            </div>
          </>
        ) : searchTerm ? (
          `No results found for "${searchTerm}"`
        ) : (
          "The page you're looking for doesn't exist or has been moved."
        )}
      </p>
      
      <div className="notfound-search-container">
        <form onSubmit={handleSearch} className="notfound-search-form">
          <div className="search-input-container">
            <input
              type="text"
              className="notfound-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Try searching for..."
              autoFocus
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
            <button type="submit" className="search-submit-btn" aria-label="Search">
              <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </button>
          </div>
        </form>
        
        <div className="suggestions-container">
          <p className="suggestions-title">
            {searchQuery ? 'Try these searches instead:' : 'Popular searches:'}
          </p>
          <div className="suggestions-list">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion.term}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="notfound-actions">
        <Link to="/" className="notfound-home-link">
          Go to Homepage
        </Link>
        <span className="divider">or</span>
        <Link to="/projects" className="notfound-projects-link">
          View Projects
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
