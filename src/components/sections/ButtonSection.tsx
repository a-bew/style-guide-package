import React, { useState } from 'react';
import s from './ButtonSection.module.scss';
import Button from '@/components/ui/button/Button';
import BorderedButton from '@/components/ui/button/BorderedButton';
import LoadingButton from '@/components/ui/button/LoadingButton';
import { FiDownload, FiPlus, FiArrowRight, FiHeart } from 'react-icons/fi';

const ButtonSection: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});

  const toggleLoading = (buttonId: string) => {
    setLoadingStates(prev => ({
      ...prev,
      [buttonId]: !prev[buttonId]
    }));
  };

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
    <div className={s.buttonSection}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>Buttons</h2>
        <p className={s.sectionDescription}>
          Interactive button components with various states, sizes, and styling options.
        </p>
      </div>

      <div className={s.componentsGrid}>
        <ComponentCard
          title="Primary Button"
          description="Main action button with theme integration and size variants"
          code={`<Button 
  text="Click me" 
  size="md" 
  onClick={() => console.log('clicked')}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Sizes</h5>
            <div className={s.buttonRow}>
              <Button text="Small" size="sm" onClick={() => {}} />
              <Button text="Medium" size="md" onClick={() => {}} />
              <Button text="Large" size="lg" onClick={() => {}} />
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>With Icons</h5>
            <div className={s.buttonRow}>
              <Button text="Download" size="md" icon={<FiDownload />} onClick={() => {}} />
              <Button 
                text="Add Item" 
                size="md" 
                icon={<FiPlus />} 
                iconPosition="left" 
                onClick={() => {}} 
              />
              <Button 
                text="Continue" 
                size="md" 
                icon={<FiArrowRight />} 
                iconPosition="right" 
                onClick={() => {}} 
              />
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>States</h5>
            <div className={s.buttonRow}>
              <Button text="Normal" size="md" onClick={() => {}} />
              <Button text="Disabled" size="md" disabled onClick={() => {}} />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Bordered Button"
          description="Secondary button with outlined styling and theme integration"
          code={`<BorderedButton 
  text="Secondary Action" 
  size="md" 
  onClick={() => console.log('clicked')}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Basic Usage</h5>
            <div className={s.buttonRow}>
              <BorderedButton text="Cancel" onClick={() => {}} />
              <BorderedButton text="Secondary Action" onClick={() => {}} />
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>With Icons</h5>
            <div className={s.buttonRow}>
              <BorderedButton 
                text="Like" 
                icon={<FiHeart />} 
                iconLeftPrRight="left"
                onClick={() => {}} 
              />
              <BorderedButton 
                text="Add to Cart" 
                icon={<FiPlus />} 
                iconLeftPrRight="right" 
                onClick={() => {}} 
              />
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>States</h5>
            <div className={s.buttonRow}>
              <BorderedButton text="Normal" onClick={() => {}} />
              <BorderedButton text="Disabled" disabled onClick={() => {}} />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Loading Button"
          description="Button with loading state and spinner animation"
          code={`<LoadingButton 
  text="Save Changes" 
  isLoading={loading}
  loadingText="Saving..."
  onClick={() => setLoading(true)}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Loading States</h5>
            <div className={s.buttonRow}>
              <LoadingButton 
                text={loadingStates.save ? "Saving..." : "Save"}
                loading={loadingStates.save || false}
                onClick={() => toggleLoading('save')}
              />
              <LoadingButton 
                text={loadingStates.submit ? "Submitting..." : "Submit"}
                loading={loadingStates.submit || false}
                size={18}
                onClick={() => toggleLoading('submit')}
              />
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>With Icons</h5>
            <div className={s.buttonRow}>
              <LoadingButton 
                text={loadingStates.upload ? "Uploading..." : "Upload File"}
                icon={<FiDownload />}
                loading={loadingStates.upload || false}
                onClick={() => toggleLoading('upload')}
              />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Button Combinations"
          description="Common button groupings and layouts"
          code={`<div className="button-group">
  <Button text="Primary" />
  <BorderedButton text="Secondary" />
</div>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Button Groups</h5>
            <div className={s.buttonGroup}>
              <Button text="Save" size="md" onClick={() => {}} />
              <BorderedButton text="Cancel" onClick={() => {}} />
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Action Toolbar</h5>
            <div className={s.buttonToolbar}>
              <Button text="New" icon={<FiPlus />} size="sm" onClick={() => {}} />
              <BorderedButton text="Edit" onClick={() => {}} />
              <BorderedButton text="Delete" onClick={() => {}} />
            </div>
          </div>
        </ComponentCard>
      </div>

      <div className={s.usageGuidelines}>
        <h3 className={s.guidelinesTitle}>Usage Guidelines</h3>
        <div className={s.guidelinesList}>
          <div className={s.guideline}>
            <h4>Primary Buttons</h4>
            <p>Use for the main action in a section. Limit to one primary button per view.</p>
          </div>
          <div className={s.guideline}>
            <h4>Secondary Buttons</h4>
            <p>Use for secondary actions. Can be used multiple times in a single view.</p>
          </div>
          <div className={s.guideline}>
            <h4>Loading States</h4>
            <p>Always provide feedback for actions that take time to complete.</p>
          </div>
          <div className={s.guideline}>
            <h4>Icon Usage</h4>
            <p>Use icons to reinforce the action. Keep icons simple and universally understood.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonSection;