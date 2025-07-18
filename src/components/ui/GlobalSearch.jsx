import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const GlobalSearch = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  const searchCategories = [
    { id: 'contacts', label: 'Contacts', icon: 'Users', color: 'text-primary' },
    { id: 'workflows', label: 'Workflows', icon: 'Zap', color: 'text-accent' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard', color: 'text-success' },
    { id: 'accounts', label: 'Accounts', icon: 'Building', color: 'text-secondary' },
  ];

  const mockResults = [
    { id: 1, title: 'John Smith', category: 'contacts', description: 'john.smith@email.com • Last contacted 2 days ago', path: '/crm-contacts' },
    { id: 2, title: 'Welcome Email Sequence', category: 'workflows', description: 'Automated email workflow • 85% completion rate', path: '/workflow-automation' },
    { id: 3, title: 'Invoice #INV-2024-001', category: 'payments', description: 'IDR 2,500,000 • Paid on Jan 15, 2024', path: '/payment-processing' },
    { id: 4, title: 'PT Digital Solutions', category: 'accounts', description: 'Sub-account • 15 active users', path: '/sub-account-management' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filtered = mockResults.filter(result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Global search for:', query);
      setIsOpen(false);
    }
  };

  const handleResultClick = (result) => {
    console.log('Navigate to:', result.path);
    setIsOpen(false);
    setQuery('');
  };

  const getCategoryInfo = (categoryId) => {
    return searchCategories.find(cat => cat.id === categoryId) || searchCategories[0];
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {!isOpen ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 text-text-secondary hover:text-text-primary border border-border hover:border-primary-200 transition-all duration-150"
        >
          <Icon name="Search" size={16} />
          <span className="hidden sm:inline text-sm">Search...</span>
          <div className="hidden sm:flex items-center space-x-1 ml-2">
            <kbd className="px-1.5 py-0.5 text-xs bg-muted border border-border rounded">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-xs bg-muted border border-border rounded">K</kbd>
          </div>
        </Button>
      ) : (
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <Input
                type="search"
                placeholder="Search contacts, workflows, payments..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10 w-full"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Search Results Dropdown */}
          {(isOpen && (query || results.length > 0)) && (
            <div className="absolute top-12 left-0 right-0 bg-surface border border-border rounded-lg shadow-xl z-1010 animate-slide-down max-h-96 overflow-hidden">
              {isLoading ? (
                <div className="p-4 flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Searching...</span>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="py-2">
                  {results.map((result) => {
                    const categoryInfo = getCategoryInfo(result.category);
                    return (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-150 flex items-start space-x-3"
                      >
                        <Icon name={categoryInfo.icon} size={16} className={`mt-0.5 ${categoryInfo.color}`} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-text-primary text-sm truncate">{result.title}</h4>
                          <p className="text-text-secondary text-xs mt-1 line-clamp-2">{result.description}</p>
                          <span className="text-text-muted text-xs mt-1 capitalize">{categoryInfo.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : query ? (
                <div className="p-4 text-center">
                  <Icon name="Search" size={24} className="mx-auto text-text-muted mb-2" />
                  <p className="text-text-secondary text-sm">No results found for "{query}"</p>
                  <p className="text-text-muted text-xs mt-1">Try different keywords or check spelling</p>
                </div>
              ) : (
                <div className="p-4">
                  <h3 className="font-medium text-text-primary text-sm mb-3">Search Categories</h3>
                  <div className="space-y-2">
                    {searchCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name={category.icon} size={14} className={category.color} />
                        <span>{category.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;