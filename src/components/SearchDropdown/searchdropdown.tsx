import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../../supabaseClient';


interface SearchDropdownProps {
  className?: string;   // اضافه شد
}

const SearchDropdown: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleSearch = () => {
    setShowSearch(prev => !prev);
    setSearchTerm('');
    setSearchResults([]);
    setHighlightIndex(-1);
  };

  useEffect(() => {
    const fetchResults = async () => {
      const term = searchTerm.trim();
      if (!term) {
        setSearchResults([]);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('id, name, image_url')
        .or(`name.ilike.%${term}%,keywords.ilike.%${term}%`)
        .limit(5);

      if (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } else {
        setSearchResults(Array.isArray(data) ? data : []);
        setHighlightIndex(-1);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(prev => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < searchResults.length) {
        const selected = searchResults[highlightIndex];
        navigate(`/product/${selected?.id}`);
        setShowSearch(false);
      }
    } else if (e.key === 'Escape') {
      setShowSearch(false);
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <button onClick={toggleSearch} className="search-button" aria-label="Toggle Search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      {showSearch && (
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            onKeyDown={handleKeyDown}
            aria-activedescendant={highlightIndex >= 0 ? `search-item-${highlightIndex}` : undefined}
            aria-controls="search-results"
            aria-autocomplete="list"
            role="combobox"
            style={{ boxSizing: 'border-box' }}
          />

          {searchResults.length > 0 ? (
            <ul
              id="search-results"
              className="search-dropdown-results"
              role="listbox"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: 8,
                zIndex: 1000,
                margin: '3px 0 0 0',
                padding: '8px 12px',       // اصلاح شده
                listStyle: 'none',
                width: '215px',     // عرض دسکتاپ
                maxWidth: '90vw',   // محدودیت موبایل             // ← سقف دسکتاپ
                boxSizing: 'border-box',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                fontSize: 10,
                color: '#333',
                maxHeight: 400,
                overflowY: 'auto',
                overflowX: 'hidden',
                height: 'auto',
                display: 'block',
              }}
            >


              {searchResults.map((item, index) => (
                <li
                  key={item.id}
                  id={`search-item-${index}`}
                  role="option"
                  aria-selected={highlightIndex === index}
                  onMouseDown={() => {
                    navigate(`/product/${item.id}`);
                    setShowSearch(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    backgroundColor: highlightIndex === index ? '#e6f0ff' : 'transparent',
                    gap: '12px',
                    whiteSpace: 'normal',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <img
                    src={item.image_url || '/placeholder.png'}
                    alt={item.name}
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: 'cover',
                      borderRadius: 4,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ overflowWrap: 'break-word', flex: 1 }}>{item.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            searchTerm.trim() !== '' && (
              <ul
                id="search-results"
                className="search-dropdown-results"
                role="listbox"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  zIndex: 1000,
                  margin: '3px 0 50px 0',
                  padding: '5px 5px',
                  listStyle: 'none',
                  color: '#888',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: 320,
                  boxSizing: 'border-box',
                  height: 'auto',
                  overflow: 'visible',
                  fontSize: 14,
                }}
              >
                <li className="no-results" style={{ cursor: 'default' }}>No matches.
                </li>
              </ul>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
