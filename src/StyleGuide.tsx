import React, { useState, useMemo } from 'react';
import s from './style-guide.module.scss';
import DesignSystemSection from './components/sections/DesignSystemSection';
import ButtonSection from './components/sections/ButtonSection';
import InputSection from './components/sections/InputSection';
import DropdownSection from './components/sections/DropdownSection';
import NavigationSection from './components/sections/NavigationSection';
import MediaSection from './components/sections/MediaSection';
import UtilitySection from './components/sections/UtilitySection';

const StyleGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState('design-system');
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    { 
      id: 'design-system', 
      name: 'Design System', 
      icon: '🎨',
      keywords: ['colors', 'typography', 'spacing', 'breakpoints', 'fonts', 'palette']
    },
    { 
      id: 'buttons', 
      name: 'Buttons', 
      icon: '🔘',
      keywords: ['button', 'click', 'primary', 'secondary', 'loading', 'disabled', 'icon']
    },
    { 
      id: 'inputs', 
      name: 'Inputs & Forms', 
      icon: '📝',
      keywords: ['input', 'form', 'text', 'password', 'email', 'checkbox', 'toggle', 'textarea', 'date']
    },
    { 
      id: 'dropdowns', 
      name: 'Dropdowns', 
      icon: '📋',
      keywords: ['dropdown', 'select', 'search', 'filter', 'option', 'multi-select', 'typeahead']
    },
    { 
      id: 'navigation', 
      name: 'Navigation', 
      icon: '🧭',
      keywords: ['nav', 'tab', 'menu', 'progress', 'banner', 'sheet', 'modal']
    },
    { 
      id: 'media', 
      name: 'Media', 
      icon: '🖼️',
      keywords: ['image', 'photo', 'video', 'media', 'loader', 'gallery', 'slider']
    },
    { 
      id: 'utility', 
      name: 'Utility', 
      icon: '⚙️',
      keywords: ['spinner', 'loading', 'error', 'tooltip', 'animation', 'separator', 'avatar']
    }
  ];

  // Filter sections based on search term
  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return sections;
    
    const searchLower = searchTerm.toLowerCase();
    return sections.filter(section => 
      section.name.toLowerCase().includes(searchLower) ||
      section.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
    );
  }, [searchTerm, sections]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'design-system':
        return <DesignSystemSection />;
      case 'buttons':
        return <ButtonSection />;
      case 'inputs':
        return <InputSection />;
      case 'dropdowns':
        return <DropdownSection />;
      case 'navigation':
        return <NavigationSection />;
      case 'media':
        return <MediaSection />;
      case 'utility':
        return <UtilitySection />;
      default:
        return <DesignSystemSection />;
    }
  };

  return (
    <div className={s.styleGuide}>
      <header className={s.header}>
        <div className={s.headerContent}>
          <h1 className={s.title}>Design System</h1>
          <p className={s.subtitle}>Visual style guide and component library</p>
          
          <div className={s.searchContainer}>
            <div className={s.searchInputWrapper}>
              <input
                type="text"
                placeholder="Search components... (try: button, color, input, etc.)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={s.searchInput}
              />
              {searchTerm && (
                <button
                  className={s.searchClear}
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            {searchTerm && filteredSections.length > 0 && (
              <div className={s.searchResults}>
                Found {filteredSections.length} section{filteredSections.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className={s.container}>
        <nav className={s.sidebar}>
          <ul className={s.navigation}>
            {filteredSections.map((section) => (
              <li key={section.id} className={s.navItem}>
                <button
                  className={`${s.navButton} ${activeSection === section.id ? s.active : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className={s.navIcon}>{section.icon}</span>
                  <span className={s.navText}>{section.name}</span>
                  {searchTerm && (
                    <span className={s.matchIndicator}>
                      {section.keywords.some(keyword => 
                        keyword.toLowerCase().includes(searchTerm.toLowerCase())
                      ) ? '🔍' : ''}
                    </span>
                  )}
                </button>
              </li>
            ))}
            {filteredSections.length === 0 && searchTerm && (
              <li className={s.noResults}>
                <div className={s.noResultsText}>
                  <span>No components found for "{searchTerm}"</span>
                  <button 
                    className={s.clearSearch}
                    onClick={() => setSearchTerm('')}
                  >
                    Clear search
                  </button>
                </div>
              </li>
            )}
          </ul>
        </nav>

        <main className={s.content}>
          <div className={s.sectionWrapper}>
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StyleGuide;