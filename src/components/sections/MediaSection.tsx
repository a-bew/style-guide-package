import React, { useState } from 'react';
import s from './MediaSection.module.scss';
import ImageLoader, { Spinner } from '@/components/ui/imageloader/ImageLoader';
import TagCard from '@/components/ui/tagcard/TagCard';
import StarMaker from '@/components/ui/starmaker/StarMaker';
import OverlaySpinner from '@/components/ui/OverlaySpinner';
import AnimationCheckmark from '@/components/ui/animationcheckmark/AnimationCheckmark';
import ToolTip from '@/components/ui/ToolTip';
import QuestionIconWithToolTip from '@/components/ui/ToolTip/QuestionIconWithToolTip';
import Separator from '@/components/ui/Seperator';
import SomethingWentWrong from '@/components/ui/SomethingWentWrong';
import RemoveDialogBox from '@/components/ui/RemoveDialogBox';
import UserAvatarThumbnail from '@/components/ui/thumbnail/UserAvatarThumbnail';

const MediaSection: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false);

  // Sample data for components
  const sampleImages = [
    { image: "https://picsum.photos/400/300?random=1", tag: "landscape", id: "1" },
    { image: "https://picsum.photos/400/300?random=2", tag: "portrait", id: "2" },
    { image: "https://picsum.photos/400/300?random=3", tag: "nature", id: "3" }
  ];

  const avatarUsers = [
    {
      imageUrl: "https://picsum.photos/80/80?random=10",
      firstName: "John",
      lastName: "Doe",
      isOnline: true
    },
    {
      imageUrl: "https://picsum.photos/80/80?random=11", 
      firstName: "Jane",
      lastName: "Smith",
      isOnline: false
    },
    {
      imageUrl: "https://picsum.photos/80/80?random=12",
      firstName: "Mike",
      lastName: "Johnson", 
      isOnline: true
    }
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
    <div className={s.mediaSection}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>Media & Utility Components</h2>
        <p className={s.sectionDescription}>
          Media display components, utility elements, feedback components, and interactive elements used throughout the application.
        </p>
      </div>

      <div className={s.componentsGrid}>
        <ComponentCard
          title="ImageLoader"
          description="Asynchronous image loading with loading states and error handling"
          code={`<ImageLoader 
  slide={{image: "https://example.com/image.jpg", tag: "example", id: "1"}}
  height={200}
  width={300}
  onClick={handleClick}
  onLoad={handleLoad}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Image Loading</h5>
            <div className={s.imageGrid}>
              {sampleImages.map((slide, index) => (
                <div key={index} className={s.imageWrapper}>
                  <ImageLoader
                    slide={slide}
                    height={150}
                    width={200}
                    onClick={() => console.log(`Clicked image: ${slide.tag}`)}
                    onLoad={() => console.log(`Loaded image: ${slide.tag}`)}
                  />
                  <p className={s.imageLabel}>{slide.tag}</p>
                </div>
              ))}
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Spinner Component"
          description="Loading spinner with different sizes and refresh functionality"
          code={`<Spinner 
  type="large" 
  refresh={true} 
  onClick={refreshHandler}
/>

<Spinner 
  type="small" 
  style={{margin: "10px"}}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Spinner Variants</h5>
            <div className={s.spinnerRow}>
              <div className={s.spinnerItem}>
                <Spinner type="small" />
                <span>Small</span>
              </div>
              <div className={s.spinnerItem}>
                <Spinner type="large" />
                <span>Large</span>
              </div>
              <div className={s.spinnerItem}>
                <Spinner 
                  type="large" 
                  refresh={true} 
                  onClick={() => console.log('Refresh clicked')}
                />
                <span>With Refresh</span>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="TagCard"
          description="Animated tag cards with random colors and fade-in effects"
          code={`<TagCard text="Technology" id={1}>
  <IconComponent />
</TagCard>

<TagCard text="Design" id={2} />`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Tag Cards</h5>
            <div className={s.tagGrid}>
              <TagCard text="React" id={1} />
              <TagCard text="TypeScript" id={2} />
              <TagCard text="JavaScript" id={3} />
              <TagCard text="CSS" id={4} />
              <TagCard text="HTML" id={5} />
              <TagCard text="Node.js" id={6} />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="StarMaker (Rating)"
          description="5-star rating display based on percentage with customizable size"
          code={`<StarMaker percentage={75} size={20} />
<StarMaker percentage={60} size={15} />
<StarMaker percentage={100} size={25} />`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Rating Examples</h5>
            <div className={s.ratingGrid}>
              <div className={s.ratingItem}>
                <StarMaker percentage={20} size={15} />
                <span>20% (1 star)</span>
              </div>
              <div className={s.ratingItem}>
                <StarMaker percentage={40} size={15} />
                <span>40% (2 stars)</span>
              </div>
              <div className={s.ratingItem}>
                <StarMaker percentage={60} size={15} />
                <span>60% (3 stars)</span>
              </div>
              <div className={s.ratingItem}>
                <StarMaker percentage={80} size={15} />
                <span>80% (4 stars)</span>
              </div>
              <div className={s.ratingItem}>
                <StarMaker percentage={100} size={15} />
                <span>100% (5 stars)</span>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="User Avatar Thumbnail"
          description="User avatar with online status and fallback initials"
          code={`<UserAvatarThumbnail
  imageUrl="https://example.com/avatar.jpg"
  altText="User Avatar"
  firstName="John"
  lastName="Doe"
  isOnline={true}
  onClick={handleClick}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Avatar Examples</h5>
            <div className={s.avatarGrid}>
              {avatarUsers.map((user, index) => (
                <div key={index} className={s.avatarItem}>
                  <UserAvatarThumbnail
                    imageUrl={user.imageUrl}
                    altText={`${user.firstName} ${user.lastName}`}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    isOnline={user.isOnline}
                    onClick={() => console.log(`Clicked ${user.firstName}`)}
                  />
                  <span>{user.firstName}</span>
                  <span className={user.isOnline ? s.online : s.offline}>
                    {user.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="ToolTip Component"
          description="Informational tooltips with different themes and positions"
          code={`<ToolTip 
  message="This is a helpful tooltip" 
  icon="help" 
  position="top"
  theme="info"
/>

<QuestionIconWithToolTip 
  message="More detailed information here"
  position="top"
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Tooltip Variants</h5>
            <div className={s.tooltipGrid}>
              <div className={s.tooltipItem}>
                <ToolTip 
                  message="Default tooltip" 
                  icon="info"
                  position="top"
                  theme="default"
                />
                <span>Info Tooltip</span>
              </div>
              <div className={s.tooltipItem}>
                <ToolTip 
                  message="Success message" 
                  icon="success"
                  position="top"
                  theme="success"
                />
                <span>Success Tooltip</span>
              </div>
              <div className={s.tooltipItem}>
                <ToolTip 
                  message="Warning message" 
                  icon="alert"
                  position="top"
                  theme="warning"
                />
                <span>Warning Tooltip</span>
              </div>
              <div className={s.tooltipItem}>
                <QuestionIconWithToolTip 
                  message="This is a question icon with detailed information about this feature"
                  position="top"
                />
                <span>Question Icon</span>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Utility Components"
          description="Overlay spinner, animated checkmark, and separators"
          code={`<OverlaySpinner />

<AnimationCheckmark />

<Separator orientation="horizontal" />
<Separator orientation="vertical" />`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Overlay Spinner</h5>
            <div className={s.utilityDemo}>
              <button 
                className={s.demoButton}
                onClick={() => {
                  setShowOverlay(true);
                  setTimeout(() => setShowOverlay(false), 2000);
                }}
              >
                Show Overlay Spinner (2s)
              </button>
              {showOverlay && <OverlaySpinner />}
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Animated Checkmark</h5>
            <div className={s.utilityDemo}>
              <button 
                className={s.demoButton}
                onClick={() => {
                  setShowCheckmark(true);
                  setTimeout(() => setShowCheckmark(false), 3000);
                }}
              >
                Show Success Animation
              </button>
              {showCheckmark && (
                <div className={s.checkmarkContainer}>
                  <AnimationCheckmark />
                </div>
              )}
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Separators</h5>
            <div className={s.separatorDemo}>
              <div className={s.separatorExample}>
                <span>Content above</span>
                <Separator orientation="horizontal" />
                <span>Content below</span>
              </div>
              <div className={s.separatorVertical}>
                <span>Left</span>
                <Separator orientation="vertical" />
                <span>Right</span>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Feedback Components"
          description="Error states and confirmation dialogs"
          code={`<SomethingWentWrong 
  onClick={handleRetry}
  text="Custom error message"
/>

<RemoveDialogBox
  onRemove={handleRemove}
  onCancel={handleCancel}
  text="Are you sure you want to delete this item?"
  removeText="Delete"
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Error State</h5>
            <div className={s.feedbackDemo}>
              <button 
                className={s.demoButton}
                onClick={() => setShowErrorState(!showErrorState)}
              >
                Toggle Error State
              </button>
              {showErrorState && (
                <div className={s.errorContainer}>
                  <SomethingWentWrong 
                    onClick={() => setShowErrorState(false)}
                    text="Something went wrong. Click to retry."
                  />
                </div>
              )}
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Remove Dialog</h5>
            <div className={s.feedbackDemo}>
              <button 
                className={s.demoButton}
                onClick={() => setShowRemoveDialog(true)}
              >
                Show Remove Dialog
              </button>
              {showRemoveDialog && (
                <div className={s.dialogOverlay}>
                  <RemoveDialogBox
                    onRemove={() => {
                      console.log('Item removed');
                      setShowRemoveDialog(false);
                    }}
                    onCancel={() => setShowRemoveDialog(false)}
                    text="Are you sure you want to delete this item? This action cannot be undone."
                    removeText="Delete"
                  />
                </div>
              )}
            </div>
          </div>
        </ComponentCard>
      </div>

      <div className={s.usageGuidelines}>
        <h3 className={s.guidelinesTitle}>Media & Utility Guidelines</h3>
        <div className={s.guidelinesList}>
          <div className={s.guideline}>
            <h4>ImageLoader</h4>
            <p>Use for lazy loading images with loading states. Always provide alt text and handle errors gracefully.</p>
          </div>
          <div className={s.guideline}>
            <h4>TagCard</h4>
            <p>Use for categories, skills, or any grouped content. Each card gets a unique color automatically.</p>
          </div>
          <div className={s.guideline}>
            <h4>StarMaker</h4>
            <p>Use for ratings and reviews. Pass percentage (0-100) for accurate star representation.</p>
          </div>
          <div className={s.guideline}>
            <h4>ToolTip</h4>
            <p>Use sparingly for additional context. Avoid essential information in tooltips.</p>
          </div>
          <div className={s.guideline}>
            <h4>Spinners</h4>
            <p>Use appropriate sizes for context. Large for page loads, small for inline actions.</p>
          </div>
          <div className={s.guideline}>
            <h4>Feedback Components</h4>
            <p>Provide clear, actionable feedback. Always include retry options for error states.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaSection;