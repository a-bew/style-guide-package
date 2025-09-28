import React, { useState } from 'react';
import s from './DropdownSection.module.scss';
import DropdownInput from '@/components/ui/dropdown/DropdownInput';
import DropdownInputSmall from '@/components/ui/dropdown/DropdownInputSmall';
import SearchableDropdown from '@/components/ui/searchableDropdown/SearchableDropdown';
import MultipleInputDropdown from '@/components/ui/multiinputdropdown/MultipleInputDropdown';
import TypeaheadDropdown from '@/components/ui/dropdown/TypeaheadDropdown';
import { type ItemProps } from '@/components/ui/dropdown/dropdowninputtype';

const DropdownSection: React.FC = () => {
  const [formData, setFormData] = useState({
    basicDropdown: '',
    smallDropdown: '',
    searchDropdown: '',
    multiDropdown: '',
    typeaheadDropdown: ''
  });

  const [typeaheadOpen, setTypeaheadOpen] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Sample data for dropdowns
  const basicOptions: ItemProps[] = [
    { id: 1, word: 'Option 1', key: 'opt1' },
    { id: 2, word: 'Option 2', key: 'opt2' },
    { id: 3, word: 'Option 3', key: 'opt3' },
    { id: 4, word: 'Option 4', key: 'opt4' }
  ];

  const currencyOptions: ItemProps[] = [
    { id: 1, word: 'USD - US Dollar', key: 'usd' },
    { id: 2, word: 'EUR - Euro', key: 'eur' },
    { id: 3, word: 'GBP - British Pound', key: 'gbp' },
    { id: 4, word: 'JPY - Japanese Yen', key: 'jpy' },
    { id: 5, word: 'CAD - Canadian Dollar', key: 'cad' }
  ];

  const categoriesOptions: ItemProps[] = [
    { id: 1, word: 'Technology', key: 'tech', section: 'Popular' },
    { id: 2, word: 'Design', key: 'design', section: 'Popular' },
    { id: 3, word: 'Marketing', key: 'marketing', section: 'Popular' },
    { id: 4, word: 'Finance', key: 'finance', section: 'Business' },
    { id: 5, word: 'Operations', key: 'ops', section: 'Business' },
    { id: 6, word: 'Health', key: 'health', section: 'Lifestyle' },
    { id: 7, word: 'Travel', key: 'travel', section: 'Lifestyle' }
  ];

  const tagsOptions: ItemProps[] = [
    { id: 1, word: 'React', key: 'react' },
    { id: 2, word: 'TypeScript', key: 'typescript' },
    { id: 3, word: 'JavaScript', key: 'javascript' },
    { id: 4, word: 'CSS', key: 'css' },
    { id: 5, word: 'HTML', key: 'html' },
    { id: 6, word: 'Node.js', key: 'nodejs' },
    { id: 7, word: 'Python', key: 'python' },
    { id: 8, word: 'Design', key: 'design' }
  ];

  const ComponentCard = ({ title, description, children, code }: {
    title: string;
    description: string;
    children: React.ReactNode;
    code: string;
  }) => (
    <div className={s.componentCard}>
      <div className={s.componentHeader}>
        <h4 className={s.componentTitle}>{title}</h4>
        <p className={s.componentDescription}>{description}</p>
      </div>
      <div className={s.componentDemo}>
        {children}
      </div>
      <div className={s.componentCode}>
        <details>
          <summary className={s.codeToggle}>Show Code</summary>
          <pre className={s.codeBlock}>
            <code>{code}</code>
          </pre>
        </details>
      </div>
    </div>
  );

  return (
    <div className={s.dropdownSection}>

      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>Dropdowns</h2>
        <p className={s.sectionDescription}>
          Dropdown and selection components including searchable dropdowns, multi-select, and typeahead functionality.
        </p>
      </div>
      <div className={s.componentsGrid}>
        <ComponentCard
          title="DropdownInput (Large)"
          description="Full-featured dropdown with search, keyboard navigation, and mobile support"
          code={`<DropdownInput
  items={options}
  fieldName="currency"
  onChangeForm={({name, value}) => handleChange(name, value)}
  placeholder="Select currency..."
  defaultValue={value}
  label="Currency"
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Basic Usage</h5>
            <div className={s.dropdownRow}>
              <div className={s.dropdownWrapper}>
                <DropdownInput
                  items={currencyOptions}
                  fieldName="basicDropdown"
                  onChangeForm={({name, value}: {name: string, value: string}) => updateField(name, value)}
                  placeholder="Select currency..."
                  defaultValue={formData.basicDropdown}
                  label="Currency"
                  setShowMobileDropdown={setShowMobileDropdown}
                  showMobileDropdown={showMobileDropdown}
                />
              </div>
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>With Sections</h5>
            <div className={s.dropdownRow}>
              <div className={s.dropdownWrapper}>
                <DropdownInput
                  items={categoriesOptions}
                  fieldName="categoriesDropdown"
                  onChangeForm={({name, value}: {name: string, value: string}) => console.log('Selected:', value)}
                  placeholder="Select category..."
                  label="Category"
                />
              </div>
            </div>
          </div>
        </ComponentCard>

      
      {/* 

      
        <ComponentCard
          title="DropdownInputSmall (Compact)"
          description="Compact dropdown with advanced positioning and mobile optimization"
          code={`<DropdownInputSmall
  items={options}
  fieldName="compact"
  onChangeForm={({name, value}) => handleChange(name, value)}
  placeholder="Select option..."
  maxWidth="200px"
  autoDropdownPosition={true}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Size Variants</h5>
            <div className={s.dropdownRow}>
              <div className={s.dropdownWrapper}>
                <label className={s.dropdownLabel}>Compact (Small)</label>
                <DropdownInputSmall
                  items={basicOptions}
                  fieldName="smallDropdown"
                  onChangeForm={({name, value}: {name: string, value: string}) => updateField(name, value)}
                  placeholder="Select..."
                  maxWidth="150px"
                  height={36}
                  autoDropdownPosition={true}
                />
              </div>
              <div className={s.dropdownWrapper}>
                <label className={s.dropdownLabel}>Medium</label>
                <DropdownInputSmall
                  items={basicOptions}
                  fieldName="mediumDropdown"
                  onChangeForm={({name, value}: {name: string, value: string}) => console.log('Selected:', value)}
                  placeholder="Select option..."
                  maxWidth="200px"
                  height={40}
                />
              </div>
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Positioning Options</h5>
            <div className={s.dropdownRow}>
              <div className={s.dropdownWrapper}>
                <label className={s.dropdownLabel}>Left Aligned</label>
                <DropdownInputSmall
                  items={basicOptions}
                  fieldName="leftDropdown"
                  onChangeForm={({name, value}: {name: string, value: string}) => console.log('Selected:', value)}
                  placeholder="Left aligned..."
                  alignDropdownTo="left"
                  maxWidth="180px"
                />
              </div>
              <div className={s.dropdownWrapper}>
                <label className={s.dropdownLabel}>Right Aligned</label>
                <DropdownInputSmall
                  items={basicOptions}
                  fieldName="rightDropdown"
                  onChangeForm={({name, value}: {name: string, value: string}) => console.log('Selected:', value)}
                  placeholder="Right aligned..."
                  alignDropdownTo="right"
                  maxWidth="180px"
                />
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="SearchableDropdown"
          description="Dropdown with real-time search functionality (minimum 3 characters)"
          code={`<SearchableDropdown
  items={searchableOptions}
  fieldName="search"
  onChangeForm={({name, value}) => handleSearch(name, value)}
  placeholder="Type 3+ characters to search..."
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Search Functionality</h5>
            <div className={s.dropdownRow}>
              <div className={s.dropdownWrapper}>
                <label className={s.dropdownLabel}>Search Categories</label>
                <SearchableDropdown
                  items={categoriesOptions}
                  fieldName="searchDropdown"
                  onChangeForm={({name, value}: {name: string, value: string}) => updateField(name, value)}
                  placeholder="Type 3+ characters to search..."
                  maxWidth="250px"
                />
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="MultipleInputDropdown"
          description="Multi-select dropdown with removable chips and clear all functionality"
          code={`<MultipleInputDropdown
  items={options}
  fieldName="tags"
  onChangeForm={({name, value, selectedItems}) => handleMultiSelect(selectedItems)}
  placeholder="Select multiple tags..."
  clear={shouldClear}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Multi-Select</h5>
            <div className={s.dropdownRow}>
              <div className={s.dropdownWrapper}>
                <label className={s.dropdownLabel}>Tags</label>
                <MultipleInputDropdown
                  items={tagsOptions}
                  fieldName="multiDropdown"
                  onChangeForm={({name, value, selectedItems}: {name: string, value: string, selectedItems: any}) => {
                    console.log('Selected items:', selectedItems);
                    updateField(name, value);
                  }}
                  placeholder="Select multiple tags..."
                  maxWidth="300px"
                  clear={false}
                />
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="TypeaheadDropdown"
          description="Controlled dropdown with typeahead functionality and external state management"
          code={`<TypeaheadDropdown
  items={options}
  fieldName="typeahead"
  onChangeForm={({name, value}) => handleTypeahead(name, value)}
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  placeholder="Start typing..."
  autoDropdownPosition={true}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Controlled Typeahead</h5>
            <div className={s.dropdownRow}>
              <div className={s.dropdownWrapper}>
                <label className={s.dropdownLabel}>Skills</label>
                <TypeaheadDropdown
                  items={tagsOptions}
                  fieldName="typeaheadDropdown"
                  onChangeForm={({name, value}: {name: string, value: string}) => updateField(name, value)}
                  placeholder="Start typing to search..."
                  isOpen={typeaheadOpen}
                  setIsOpen={setTypeaheadOpen}
                  autoDropdownPosition={true}
                  maxHeight="200px"
                />
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Dropdown States & Features"
          description="Different states and advanced features of dropdown components"
          code={`// Different dropdown states
<DropdownInput 
  items={options}
  defaultValue="preselected"
  disabled={true}
/>

// With custom styling
<DropdownInputSmall
  displayErrorBorder="red"
  placeholderColor="#999"
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>States & Features</h5>
            <div className={s.statesGrid}>
              <div className={s.stateExample}>
                <h6>Pre-selected Value</h6>
                <DropdownInputSmall
                  items={basicOptions}
                  fieldName="preselected"
                  onChangeForm={() => {}}
                  defaultValue="Option 2"
                  maxWidth="150px"
                />
              </div>
              
              <div className={s.stateExample}>
                <h6>Error State</h6>
                <DropdownInputSmall
                  items={basicOptions}
                  fieldName="error"
                  onChangeForm={() => {}}
                  placeholder="Select option..."
                  displayErrorBorder="red"
                  maxWidth="150px"
                />
              </div>

              <div className={s.stateExample}>
                <h6>Custom Height</h6>
                <DropdownInputSmall
                  items={basicOptions}
                  fieldName="tall"
                  onChangeForm={() => {}}
                  placeholder="Tall dropdown..."
                  height={50}
                  maxWidth="150px"
                />
              </div>
            </div>
          </div>
        </ComponentCard>
    */}

      </div> 

      <div className={s.usageGuidelines}>
        <h3 className={s.guidelinesTitle}>Dropdown Usage Guidelines</h3>
        <div className={s.guidelinesList}>
          <div className={s.guideline}>
            <h4>DropdownInput</h4>
            <p>Use for primary form fields that need full search functionality and mobile support.</p>
          </div>
          <div className={s.guideline}>
            <h4>DropdownInputSmall</h4>
            <p>Use for compact spaces, filters, or secondary form fields where space is limited.</p>
          </div>
          <div className={s.guideline}>
            <h4>SearchableDropdown</h4>
            <p>Use when users need to search through large datasets with real-time filtering.</p>
          </div>
          <div className={s.guideline}>
            <h4>MultipleInputDropdown</h4>
            <p>Use for tag selection, categories, or any multi-select use case with visual chips.</p>
          </div>
          <div className={s.guideline}>
            <h4>TypeaheadDropdown</h4>
            <p>Use when you need external control over the dropdown state or complex interaction logic.</p>
          </div>
          <div className={s.guideline}>
            <h4>Accessibility</h4>
            <p>All dropdowns support keyboard navigation (Enter, Arrow keys) and proper focus management.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownSection;