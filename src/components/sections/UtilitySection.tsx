import React, { useState } from 'react';
import s from './ButtonSection.module.scss';
import OverlaySpinner from '@/components/ui/OverlaySpinner';
import AnimatedCheckmark from '@/components/ui/animationcheckmark/AnimationCheckmark';
import ToolTip from '@/components/ui/ToolTip';
import Separator from '@/components/ui/Seperator';
import SomethingWentWrong from '@/components/ui/SomethingWentWrong';
import RemoveDialogBox from '@/components/ui/RemoveDialogBox';

const UtilitySection: React.FC = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const handleSpinnerDemo = () => {
    setShowSpinner(true);
    setTimeout(() => setShowSpinner(false), 3000);
  };

  const handleCheckmarkDemo = () => {
    setShowCheckmark(true);
    setTimeout(() => setShowCheckmark(false), 3000);
  };

  const handleErrorDemo = () => {
    setShowErrorPage(true);
  };

  const handleRemoveDemo = () => {
    setShowRemoveDialog(true);
  };

  const handleRemoveAction = () => {
    console.log('Item removed');
    setShowRemoveDialog(false);
  };

  const handleCancelAction = () => {
    setShowRemoveDialog(false);
  };

  const handleErrorGoBack = () => {
    setShowErrorPage(false);
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

  if (showErrorPage) {
    return <SomethingWentWrong onClick={handleErrorGoBack} text="This is a demo error page" />;
  }

  return (
    <div className={s.buttonSection}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>Utility Components</h2>
        <p className={s.sectionDescription}>
          Utility and helper components including spinners, tooltips, animations, and feedback elements.
        </p>
      </div>

      <div className={s.componentsGrid}>
        <ComponentCard
          title="OverlaySpinner"
          description="Loading overlay component for async operations and background processes"
          code={`<OverlaySpinner />

// Usage with overlay
<div style={{ position: 'relative' }}>
  <Content />
  {loading && (
    <div className="overlay">
      <OverlaySpinner />
    </div>
  )}
</div>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Basic Usage</h5>
            <div style={{ position: 'relative', height: '120px', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#f9f9f9' }}>
              <p>Content behind spinner</p>
              <p>More content here...</p>
              {showSpinner && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                  <OverlaySpinner />
                </div>
              )}
            </div>
            <div className={s.buttonRow} style={{ marginTop: '1rem' }}>
              <button 
                style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: showSpinner ? '#ccc' : '#007bff', color: showSpinner ? '#666' : 'white', cursor: showSpinner ? 'not-allowed' : 'pointer' }}
                onClick={handleSpinnerDemo} 
                disabled={showSpinner}
              >
                {showSpinner ? 'Loading...' : 'Show Spinner (3s)'}
              </button>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="AnimationCheckmark"
          description="Animated success checkmark for positive feedback and completion states"
          code={`<AnimatedCheckmark />

// Usage in success states
{isSuccess && <AnimatedCheckmark />}`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Success Animation</h5>
            <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
              {showCheckmark ? <AnimatedCheckmark /> : <p style={{ color: '#666' }}>Click button to show animation</p>}
            </div>
            <div className={s.buttonRow} style={{ marginTop: '1rem' }}>
              <button 
                style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: showCheckmark ? '#ccc' : '#28a745', color: showCheckmark ? '#666' : 'white', cursor: showCheckmark ? 'not-allowed' : 'pointer' }}
                onClick={handleCheckmarkDemo} 
                disabled={showCheckmark}
              >
                {showCheckmark ? 'Playing...' : 'Show Animation (3s)'}
              </button>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="ToolTip"
          description="Interactive tooltip system with multiple themes, positions, and icon types"
          code={`<ToolTip 
  message="Helpful information" 
  icon="info" 
  position="top" 
  theme="default" 
/>

<ToolTip 
  message="Warning message" 
  icon="alert" 
  position="bottom" 
  theme="warning" 
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Different Icon Types</h5>
            <div className={s.buttonRow}>
              <ToolTip message="Information tooltip" icon="info" position="top" />
              <ToolTip message="Help tooltip" icon="help" position="top" />
              <ToolTip message="Alert tooltip" icon="alert" position="top" />
              <ToolTip message="Success tooltip" icon="success" position="top" />
              <ToolTip message="Error tooltip" icon="error" position="top" />
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Different Themes</h5>
            <div className={s.buttonRow}>
              <ToolTip message="Default theme" icon="info" position="bottom" theme="default" />
              <ToolTip message="Info theme" icon="info" position="bottom" theme="info" />
              <ToolTip message="Success theme" icon="success" position="bottom" theme="success" />
              <ToolTip message="Warning theme" icon="alert" position="bottom" theme="warning" />
              <ToolTip message="Error theme" icon="error" position="bottom" theme="error" />
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Different Positions</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', justifyItems: 'center', padding: '2rem' }}>
              <ToolTip message="Top position" icon="info" position="top" />
              <ToolTip message="Right position" icon="info" position="right" />
              <ToolTip message="Bottom position" icon="info" position="bottom" />
              <ToolTip message="Left position" icon="info" position="left" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Separator"
          description="Visual dividers for content sections with horizontal and vertical orientations"
          code={`<Separator orientation="horizontal" />

<Separator orientation="vertical" />

// With custom className
<Separator 
  orientation="horizontal" 
  className="custom-separator" 
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Horizontal Separator</h5>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
              <p>Content above separator</p>
              <Separator orientation="horizontal" />
              <p>Content below separator</p>
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Vertical Separator</h5>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
              <span>Left content</span>
              <Separator orientation="vertical" />
              <span>Middle content</span>
              <Separator orientation="vertical" />
              <span>Right content</span>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="SomethingWentWrong"
          description="Error state component with customizable message and action button"
          code={`<SomethingWentWrong 
  onClick={handleGoBack}
  text="Custom error message"
/>

// Default usage
<SomethingWentWrong 
  onClick={() => window.history.back()}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Error Page Demo</h5>
            <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
              <p style={{ marginBottom: '1rem', color: '#666' }}>Click to see the full-screen error page component</p>
              <button 
                style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', background: '#dc3545', color: 'white', cursor: 'pointer' }}
                onClick={handleErrorDemo}
              >
                Show Error Page (Full Screen)
              </button>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="RemoveDialogBox"
          description="Confirmation dialog for destructive actions with loading states"
          code={`<RemoveDialogBox
  onRemove={handleRemove}
  onCancel={handleCancel}
  text="Are you sure you want to remove this item?"
  removeText="Delete"
/>

// Custom remove text
<RemoveDialogBox
  onRemove={handleRemove}
  onCancel={handleCancel}
  text="This action cannot be undone."
  removeText="Permanently Delete"
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Confirmation Dialog</h5>
            <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
              <p style={{ marginBottom: '1rem', color: '#666' }}>Click to show the removal confirmation dialog</p>
              <button 
                style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', background: '#dc3545', color: 'white', cursor: 'pointer' }}
                onClick={handleRemoveDemo}
              >
                Show Remove Dialog
              </button>
            </div>
            {showRemoveDialog && (
              <div style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                background: 'rgba(0,0,0,0.5)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <RemoveDialogBox
                  onRemove={handleRemoveAction}
                  onCancel={handleCancelAction}
                  text="Are you sure you want to remove this item? This action cannot be undone."
                  removeText="Delete"
                />
              </div>
            )}
          </div>
        </ComponentCard>
      </div>

      <div className={s.usageGuidelines}>
        <h3 className={s.guidelinesTitle}>Usage Guidelines</h3>
        <div className={s.guidelinesList}>
          <div className={s.guideline}>
            <h4>Loading States</h4>
            <p>Use OverlaySpinner for operations that take more than 500ms. Always provide visual feedback for user actions.</p>
          </div>
          <div className={s.guideline}>
            <h4>Success Feedback</h4>
            <p>Use AnimationCheckmark sparingly for important completions like form submissions or successful payments.</p>
          </div>
          <div className={s.guideline}>
            <h4>Tooltips</h4>
            <p>Keep tooltip messages concise. Use appropriate themes to match the context and severity of information.</p>
          </div>
          <div className={s.guideline}>
            <h4>Separators</h4>
            <p>Use to create visual hierarchy and group related content. Don't overuse - white space is often better.</p>
          </div>
          <div className={s.guideline}>
            <h4>Error Handling</h4>
            <p>Always provide a way to recover from errors. Use clear, actionable error messages.</p>
          </div>
          <div className={s.guideline}>
            <h4>Destructive Actions</h4>
            <p>Always confirm destructive actions with RemoveDialogBox. Make the consequences clear to users.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilitySection;