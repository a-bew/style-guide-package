import React, { useState } from 'react';
import s from './InputSection.module.scss';
import CheckBox from '@/components/ui/CheckBox';
import Toggle from '@/components/ui/toggle/Toggle';
import DateInput from '@/components/ui/DateInput';
import TextAreaExpand from '@/components/ui/TextAreaExpand';
import CustomNumberInput from '@/components/ui/CustomNumberInput';

const InputSection: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    number: 0,
    date: '',
    textarea: '',
    checkbox1: false,
    checkbox2: true,
    toggle1: false,
    toggle2: true
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    <div className={s.inputSection}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>Inputs & Forms</h2>
        <p className={s.sectionDescription}>
          Form input components including text fields, checkboxes, toggles, and specialized inputs.
        </p>
      </div>

      <div className={s.componentsGrid}>
        <ComponentCard
          title="Text Input"
          description="Standard text input with label, placeholder, and error state support"
          code={`<input
  type="text"
  placeholder="Enter your email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Basic Text Input</h5>
            <div className={s.inputRow}>
              <div className={s.inputWrapper}>
                <label className={s.inputLabel}>Email Address</label>
                <input
                  type="email"
                  className={s.textInput}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Password Input</h5>
            <div className={s.inputRow}>
              <div className={s.inputWrapper}>
                <label className={s.inputLabel}>Password</label>
                <input
                  type="password"
                  className={s.textInput}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Input States</h5>
            <div className={s.inputRow}>
              <div className={s.inputWrapper}>
                <label className={s.inputLabel}>Normal State</label>
                <input
                  type="text"
                  className={s.textInput}
                  placeholder="Normal input"
                />
              </div>
              <div className={s.inputWrapper}>
                <label className={s.inputLabel}>Disabled State</label>
                <input
                  type="text"
                  className={`${s.textInput} ${s.disabled}`}
                  placeholder="Disabled input"
                  disabled
                />
              </div>
              <div className={s.inputWrapper}>
                <label className={s.inputLabel}>Error State</label>
                <input
                  type="text"
                  className={`${s.textInput} ${s.error}`}
                  placeholder="Error input"
                  value="invalid@email"
                />
                <p className={s.errorText}>Please enter a valid email address</p>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Custom Number Input"
          description="Specialized number input with increment/decrement controls"
          code={`<CustomNumberInput
  value={number}
  onChange={(value) => setNumber(value)}
  min={0}
  max={100}
/>`}
        >
          <div className={s.demoGroup}>
            <div className={s.inputRow}>
              <div className={s.inputWrapper}>
                <label className={s.inputLabel}>Quantity</label>
                <CustomNumberInput
                  name="quantity"
                  defaultValue={formData.number}
                  onChange={(value) => updateField('number', parseInt(value.value))}
                  upperbound={100}
                />
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Date Input"
          description="Date picker component with calendar interface"
          code={`<DateInput
  value={date}
  onChange={(date) => setDate(date)}
  placeholder="Select a date"
/>`}
        >
          <div className={s.demoGroup}>
            <div className={s.inputRow}>
              <div className={s.inputWrapper}>
                <label className={s.inputLabel}>Select Date</label>
                <DateInput
                  name="date"
                  value={formData.date}
                  onChange={(value) => updateField('date', value.value)}
                />
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Text Area"
          description="Auto-expanding textarea for longer text input"
          code={`<TextAreaExpand
  value={text}
  onChange={(value) => setText(value)}
  placeholder="Enter your message"
/>`}
        >
          <div className={s.demoGroup}>
            <div className={s.inputRow}>
              <div className={s.inputWrapper}>
                <label className={s.inputLabel}>Message</label>
                <TextAreaExpand
                  name="textarea"
                  value={formData.textarea}
                  onChange={(e) => updateField('textarea', e.target.value)}
                  placeholder="Enter your message here..."
                />
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Checkbox"
          description="Custom checkbox with theme integration and various states"
          code={`<CheckBox
  id="checkbox1"
  label="Accept terms and conditions"
  checked={checked}
  onChange={(checked) => setChecked(checked)}
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Checkbox States</h5>
            <div className={s.checkboxRow}>
              <CheckBox
                id="checkbox1"
                label="Unchecked state"
                checked={formData.checkbox1}
                onChange={(checked: boolean) => updateField('checkbox1', checked)}
              />
              <CheckBox
                id="checkbox2"
                label="Checked state"
                checked={formData.checkbox2}
                onChange={(checked: boolean) => updateField('checkbox2', checked)}
              />
              <CheckBox
                id="checkbox3"
                label="Disabled unchecked"
                checked={false}
                disabled
                onChange={() => {}}
              />
              <CheckBox
                id="checkbox4"
                label="Disabled checked"
                checked={true}
                disabled
                onChange={() => {}}
              />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Toggle Switch"
          description="Toggle switch component for boolean settings"
          code={`<Toggle
  checked={enabled}
  onChange={(checked) => setEnabled(checked)}
  label="Enable notifications"
/>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Toggle States</h5>
            <div className={s.toggleRow}>
              <div className={s.toggleWrapper}>
                <Toggle
                  toggled={formData.toggle1}
                  active={true}
                  onChange={() => updateField('toggle1', !formData.toggle1)}
                  leftLabel="Off"
                  rightLabel="On"
                />
                <label className={s.toggleLabel}>Toggle 1</label>
              </div>
              <div className={s.toggleWrapper}>
                <Toggle
                  toggled={formData.toggle2}
                  active={true}
                  onChange={() => updateField('toggle2', !formData.toggle2)}
                  leftLabel="Off"
                  rightLabel="On"
                />
                <label className={s.toggleLabel}>Toggle 2</label>
              </div>
              <div className={s.toggleWrapper}>
                <Toggle
                  toggled={false}
                  active={false}
                  onChange={() => {}}
                  leftLabel="Off"
                  rightLabel="On"
                />
                <label className={s.toggleLabel}>Disabled</label>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Form Layout"
          description="Common form layouts and groupings"
          code={`<form className="form-layout">
  <div className="form-group">
    <input type="text" />
    <input type="email" />
  </div>
</form>`}
        >
          <div className={s.demoGroup}>
            <h5 className={s.demoTitle}>Form Group Example</h5>
            <div className={s.formLayout}>
              <div className={s.formRow}>
                <div className={s.inputWrapper}>
                  <label className={s.inputLabel}>First Name</label>
                  <input
                    type="text"
                    className={s.textInput}
                    placeholder="John"
                  />
                </div>
                <div className={s.inputWrapper}>
                  <label className={s.inputLabel}>Last Name</label>
                  <input
                    type="text"
                    className={s.textInput}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className={s.formRow}>
                <div className={s.inputWrapper}>
                  <label className={s.inputLabel}>Email Address</label>
                  <input
                    type="email"
                    className={s.textInput}
                    placeholder="john.doe@example.com"
                  />
                </div>
              </div>
              <div className={s.formRow}>
                <CheckBox
                  id="newsletter"
                  label="Subscribe to newsletter"
                  checked={false}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>

      <div className={s.usageGuidelines}>
        <h3 className={s.guidelinesTitle}>Form Design Guidelines</h3>
        <div className={s.guidelinesList}>
          <div className={s.guideline}>
            <h4>Input Labels</h4>
            <p>Always provide clear, descriptive labels for all form inputs.</p>
          </div>
          <div className={s.guideline}>
            <h4>Placeholder Text</h4>
            <p>Use placeholder text as examples, not as substitutes for labels.</p>
          </div>
          <div className={s.guideline}>
            <h4>Error States</h4>
            <p>Provide clear, actionable error messages near the affected input.</p>
          </div>
          <div className={s.guideline}>
            <h4>Form Layout</h4>
            <p>Group related fields together and maintain consistent spacing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;