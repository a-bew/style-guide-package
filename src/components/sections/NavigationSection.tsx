import React, { useState } from 'react';
import s from './NavigationSection.module.scss';
import Banner from '@/components/ui/banner/Banner';
import BottomSheet from '@/components/ui/bottomsheet/BottomSheet';
import ProgressBar from '@/components/ui/progressbar/ProgressBar';
import PaginatedTab from '@/components/ui/Tabs/PaginatedTab';
import { Tabs } from '../ui/Tabs/Tabs';

export type ActiveTabInterface = {
  text: string;
  index: number;
};

const NavigationSection: React.FC = () => {
  // const [activeTab, setActiveTab] = useState<ActiveTabInterface>({ text: 'Tab 1', index: 0 });
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [progressStep, setProgressStep] = useState(1);

  // Sample data for tabs
  const tabItems = [
    { text: 'Overview', index: 0, icon: 'RiDashboardLine' },
    { text: 'Analytics', index: 1, icon: 'RiBarChartLine' },
    { text: 'Reports', index: 2, icon: 'RiFileTextLine' },
    { text: 'Settings', index: 3, icon: 'RiSettingsLine' }
  ];

  const paginatedItems = [
    { text: 'Technology', index: 0, icon: 'RiComputerLine' },
    { text: 'Design', index: 1, icon: 'RiPaintBrushLine' },
    { text: 'Marketing', index: 2, icon: 'RiMegaphoneLine' },
    { text: 'Finance', index: 3, icon: 'RiMoneyDollarCircleLine' },
    { text: 'Operations', index: 4, icon: 'RiSettings3Line' },
    { text: 'Sales', index: 5, icon: 'RiLineChartLine' },
    { text: 'Support', index: 6, icon: 'RiCustomerServiceLine' },
    { text: 'HR', index: 7, icon: 'RiTeamLine' }
  ];

  const progressSteps = [
    'Basic Info',
    'Details',
    'Media',
    'Review',
    'Complete'
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
    <div className={s.navigationSection}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>Navigation & Layout</h2>
        <p className={s.sectionDescription}>
          Navigation components, tabs, progress bars, banners, and layout elements used throughout the application.
        </p>
      </div>

      <div className={s.componentsGrid}>
        <ComponentCard
          title="Tab Components"
          description="Standard tab navigation with icon support and theme integration"
          code={`<Tab
  activeTab={activeTab}
  label="Analytics"
  onClick={(tab) => setActiveTab(tab)}
  disabled={false}
  icon="RiBarChartLine"
  index={1}
  onKeyDown={(e) => handleKeyDown(e)}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Standard Tabs</h5>
            {/* <div className={s.tabContainer}>
              <ul className={s.tabList}>
                {tabItems.map((item, index) => (
                  <Tab
                    key={index}
                    activeTab={activeTab}
                    label={item.text}
                    onClick={(tab: ActiveTabInterface) => setActiveTab(tab)}
                    disabled={false}
                    icon={item.icon}
                    index={item.index}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveTab({ text: item.text, index: item.index });
                      }
                    }}
                  />
                ))}
              </ul>
            </div> */}

            <Tabs defaultIndex={0}>
                <Tabs.List>
                  {tabItems.map((item, i) => (
                    <Tabs.Tab key={i} disabled={false}>
                      <span className={s.icon}>{item.icon}</span> {item.text}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>

                {tabItems.map((item, i) => (
                  <Tabs.Panel key={i}>
                    <p>{item.text} content here</p>
                  </Tabs.Panel>
                ))}
              </Tabs>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>TabItem Variant</h5>
            {/* <div className={s.tabItemContainer}>
              {tabItems.slice(0, 3).map((item, index) => (
                <TabItem
                  key={index}
                  activeTab={activeTab}
                  label={item.text}
                  onClick={(tab: ActiveTabInterface) => setActiveTab(tab)}
                  disabled={false}
                  icon={item.icon}
                  index={item.index}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveTab({ text: item.text, index: item.index });
                    }
                  }}
                />
              ))}
            </div> */}
            <Tabs defaultIndex={0}>
                <Tabs.List>
                  {tabItems.slice(0, 3).map((item, i) => (
                    <Tabs.Tab key={i}>
                      <span className={s.icon}>{item.icon}</span> {item.text}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>

                {tabItems.slice(0, 3).map((item, i) => (
                  <Tabs.Panel key={i}>
                    <p>{item.text} details</p>
                  </Tabs.Panel>
                ))}
            </Tabs>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Disabled Tab</h5>
            {/* <div className={s.tabContainer}>
              <ul className={s.tabList}>
                <Tab
                  activeTab={activeTab}
                  label="Disabled Tab"
                  onClick={() => {}}
                  disabled={true}
                  index={99}
                  onKeyDown={() => {}}
                />
                <Tab
                  activeTab={activeTab}
                  label="Active Tab"
                  onClick={(tab: ActiveTabInterface) => setActiveTab(tab)}
                  disabled={false}
                  index={0}
                  onKeyDown={() => {}}
                />
              </ul>
            </div> */}
            <Tabs defaultIndex={1}>
                <Tabs.List>
                  <Tabs.Tab disabled>Disabled Tab</Tabs.Tab>
                  <Tabs.Tab>Active Tab</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel>
                  <p>Disabled tab has no content</p>
                </Tabs.Panel>
                <Tabs.Panel>
                  <p>Active tab content</p>
                </Tabs.Panel>
              </Tabs>
          </div>
        </ComponentCard>

        <ComponentCard
          title="PaginatedTab"
          description="Horizontal scrolling tab navigation with arrow controls for large datasets"
          code={`<PaginatedTab
  title="Categories"
  items={categories}
  itemsPerPage={4}
  disabled={false}
  state={state}
  onClickTabItem={(tab) => handleTabClick(tab)}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Scrollable Categories</h5>
            <div className={s.paginatedContainer}>
              <PaginatedTab
  items={[
    { label: "Home", value: "home" },
    { label: "Products", value: "products" },
    { label: "Blog", value: "blog" },
    { label: "Contact", value: "contact" },
    // ...more
  ]}
  itemsPerPage={4}
  onClickTabItem={(tab) => {
    console.log("Navigate to:", tab.value);
    // e.g. router.push(`/${tab.value}`)
  }}
/>

            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="ProgressBar"
          description="Multi-step progress indicator with field names and step navigation"
          code={`<ProgressBar
  step={currentStep}
  setStep={setCurrentStep}
  fieldNames={stepNames}
  totalSteps={5}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Multi-Step Progress</h5>
            <div className={s.progressContainer}>
              <ProgressBar
                step={progressStep}
                setStep={setProgressStep}
                fieldNames={progressSteps}
                totalSteps={progressSteps.length}
              />
              <div className={s.progressControls}>
                <button 
                  className={s.progressButton}
                  onClick={() => setProgressStep(Math.max(1, progressStep - 1))}
                  disabled={progressStep <= 1}
                >
                  Previous
                </button>
                <span className={s.stepInfo}>
                  Step {progressStep} of {progressSteps.length}: {progressSteps[progressStep - 1]}
                </span>
                <button 
                  className={s.progressButton}
                  onClick={() => setProgressStep(Math.min(progressSteps.length, progressStep + 1))}
                  disabled={progressStep >= progressSteps.length}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Banner"
          description="Simple notification banner for displaying important messages"
          code={`<Banner text="Important notification message here" />`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Notification Banners</h5>
            <div className={s.bannerContainer}>
              <Banner text="✓ Your changes have been saved successfully" />
              <Banner text="⚠️ Please review your information before submitting" />
              <Banner text="ℹ️ New features are now available in the dashboard" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="BottomSheet"
          description="Mobile-friendly modal that slides up from the bottom with touch gesture support"
          code={`<BottomSheet
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  defaultHeight={300}
  style={{zIndex: 1000}}
>
  {/* Content */}
</BottomSheet>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Bottom Sheet Modal</h5>
            <div className={s.bottomSheetDemo}>
              <button 
                className={s.openSheetButton}
                onClick={() => setBottomSheetOpen(true)}
              >
                Open Bottom Sheet
              </button>
              
              <BottomSheet
                isOpen={bottomSheetOpen}
                setIsOpen={setBottomSheetOpen}
                defaultHeight={300}
                style={{zIndex: 1000}}
              >
                <div className={s.sheetContent}>
                  <h3>Bottom Sheet Content</h3>
                  <p>This is a mobile-friendly modal that slides up from the bottom.</p>
                  <ul>
                    <li>Touch gestures supported</li>
                    <li>Backdrop click to close</li>
                    <li>Keyboard escape support</li>
                    <li>Custom height configuration</li>
                  </ul>
                  <button 
                    className={s.closeSheetButton}
                    onClick={() => setBottomSheetOpen(false)}
                  >
                    Close Sheet
                  </button>
                </div>
              </BottomSheet>
            </div>
          </div>
        </ComponentCard>

              </div>

      <div className={s.usageGuidelines}>
        <h3 className={s.guidelinesTitle}>Navigation Design Guidelines</h3>
        <div className={s.guidelinesList}>
          <div className={s.guideline}>
            <h4>Tab Navigation</h4>
            <p>Use tabs for organizing related content. Limit to 5-7 tabs for optimal usability.</p>
          </div>
          <div className={s.guideline}>
            <h4>PaginatedTab</h4>
            <p>Use for categories or filters when you have many options that don't fit horizontally.</p>
          </div>
          <div className={s.guideline}>
            <h4>ProgressBar</h4>
            <p>Use for multi-step processes to show users their progress and remaining steps.</p>
          </div>
          <div className={s.guideline}>
            <h4>Banner</h4>
            <p>Use for important notifications, success messages, or system-wide announcements.</p>
          </div>
          <div className={s.guideline}>
            <h4>BottomSheet</h4>
            <p>Use for mobile interactions like filters, options, or secondary content without full page navigation.</p>
          </div>
          <div className={s.guideline}>
            <h4>Accessibility</h4>
            <p>All navigation components support keyboard navigation and proper focus management.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSection;