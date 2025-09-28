import React from 'react';
import s from './DesignSystemSection.module.scss';

const DesignSystemSection: React.FC = () => {
  const colors = [
    { name: 'Primary', value: '#0095fa', usage: 'Main brand color, buttons, links' },
    { name: 'Secondary', value: '#0f2640', usage: 'Secondary elements, headers' },
    { name: 'Background', value: '#000a11', usage: 'Dark backgrounds' },
    { name: 'Error', value: '#ed5151', usage: 'Error states, warnings' },
    { name: 'Success', value: '#0aba6e', usage: 'Success states, confirmations' },
    { name: 'Warning', value: '#3b2811', usage: 'Warning states, alerts' },
    { name: 'Info', value: '#266bd2', usage: 'Information, tooltips' },
  ];

  const grayColors = [
    { name: 'Gray 100', value: '#f8f9fa' },
    { name: 'Gray 200', value: '#e9ecef' },
    { name: 'Gray 300', value: '#FAFAF9' },
    { name: 'Gray 400', value: '#ced4da' },
    { name: 'Gray 500', value: '#adb5bd' },
    { name: 'Gray 600', value: '#6b859e' },
    { name: 'Gray 700', value: '#70757a' },
    { name: 'Gray 800', value: '#343a40' },
    { name: 'Gray 900', value: '#212529' },
  ];

  const typography = [
    { name: 'Display Title L', class: 'displayTitleL', size: '120px', weight: '700', usage: 'Hero titles' },
    { name: 'Heading Macro', class: 'headingMacro', size: '96px', weight: '700', usage: 'Main page titles' },
    { name: 'Heading 1', class: 'heading1', size: '32px', weight: '700', usage: 'Section titles' },
    { name: 'Heading 2', class: 'heading2', size: '28px', weight: '700', usage: 'Subsection titles' },
    { name: 'Heading 3', class: 'heading3', size: '24px', weight: '500', usage: 'Card titles' },
    { name: 'Heading 4', class: 'heading4', size: '20px', weight: '500', usage: 'Component titles' },
    { name: 'Subheading Bold', class: 'subheadingB', size: '20px', weight: '700', usage: 'Important labels' },
    { name: 'Body 1 Regular', class: 'body1R', size: '16px', weight: '400', usage: 'Regular text' },
    { name: 'Body 2 Regular', class: 'body2R', size: '14px', weight: '400', usage: 'Secondary text' },
    { name: 'Micro Regular', class: 'microR', size: '12px', weight: '400', usage: 'Captions, metadata' },
  ];

  const breakpoints = [
    { name: 'Mobile M', value: '375px', usage: 'Small mobile devices' },
    { name: 'Tablet M', value: '576px', usage: 'Large mobile/small tablet' },
    { name: 'Tablet', value: '665px', usage: 'Standard tablet' },
    { name: 'Tablet L', value: '992px', usage: 'Large tablet/small desktop' },
    { name: 'Desktop', value: '1024px', usage: 'Desktop devices' },
    { name: 'Wide', value: '1256px', usage: 'Large desktop' },
    { name: 'Wide L', value: '1440px', usage: 'Extra large screens' },
  ];

  return (
    <div className={s.designSystem}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>Design System</h2>
        <p className={s.sectionDescription}>
          Core design tokens, colors, typography, and spacing used throughout the application.
        </p>
      </div>

      <div className={s.subsection}>
        <h3 className={s.subsectionTitle}>Color Palette</h3>
        <div className={s.colorGrid}>
          {colors.map((color) => (
            <div key={color.name} className={s.colorCard}>
              <div 
                className={s.colorSwatch} 
                style={{ backgroundColor: color.value }}
              />
              <div className={s.colorInfo}>
                <h4 className={s.colorName}>{color.name}</h4>
                <p className={s.colorValue}>{color.value}</p>
                <p className={s.colorUsage}>{color.usage}</p>
              </div>
            </div>
          ))}
        </div>

        <h4 className={s.subsectionSubtitle}>Gray Scale</h4>
        <div className={s.grayScale}>
          {grayColors.map((color) => (
            <div key={color.name} className={s.grayCard}>
              <div 
                className={s.graySwatch} 
                style={{ backgroundColor: color.value }}
              />
              <div className={s.grayInfo}>
                <p className={s.grayName}>{color.name}</p>
                <p className={s.grayValue}>{color.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={s.subsection}>
        <h3 className={s.subsectionTitle}>Typography</h3>
        <div className={s.typographyGrid}>
          {typography.map((type) => (
            <div key={type.name} className={s.typeCard}>
              <div className={s.typeExample}>
                <p className={s[type.class]}>The quick brown fox</p>
              </div>
              <div className={s.typeInfo}>
                <h4 className={s.typeName}>{type.name}</h4>
                <p className={s.typeSpecs}>
                  {type.size} / {type.weight}
                </p>
                <p className={s.typeUsage}>{type.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={s.subsection}>
        <h3 className={s.subsectionTitle}>Responsive Breakpoints</h3>
        <div className={s.breakpointsGrid}>
          {breakpoints.map((bp) => (
            <div key={bp.name} className={s.breakpointCard}>
              <h4 className={s.breakpointName}>{bp.name}</h4>
              <p className={s.breakpointValue}>{bp.value}</p>
              <p className={s.breakpointUsage}>{bp.usage}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={s.subsection}>
        <h3 className={s.subsectionTitle}>Spacing System</h3>
        <div className={s.spacingDemo}>
          <p className={s.spacingDescription}>
            The spacing system uses rem units for responsive design with a scale from 0.25rem to 6rem.
          </p>
          <div className={s.spacingExamples}>
            {[4, 8, 16, 24, 32, 48, 64].map((size) => (
              <div key={size} className={s.spacingExample}>
                <div 
                  className={s.spacingBox} 
                  style={{ width: `${size}px`, height: `${size}px` }}
                />
                <p className={s.spacingLabel}>{size}px ({size/16}rem)</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemSection;