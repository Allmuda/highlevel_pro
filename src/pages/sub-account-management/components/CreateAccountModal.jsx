import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CreateAccountModal = ({ isOpen, onClose, onCreateAccount }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    domain: '',
    tier: 'starter',
    userLimit: 5,
    features: {
      crm: true,
      workflows: true,
      payments: false,
      whitelabel: false,
      api: false
    },
    branding: {
      logo: null,
      primaryColor: '#2563EB',
      secondaryColor: '#64748B'
    }
  });

  const steps = [
    { id: 1, title: 'Basic Information', icon: 'Info' },
    { id: 2, title: 'Plan & Features', icon: 'Settings' },
    { id: 3, title: 'Branding Setup', icon: 'Palette' },
    { id: 4, title: 'Review & Create', icon: 'Check' }
  ];

  const tiers = [
    { id: 'starter', name: 'Starter', price: 'IDR 1,000,000', users: 5, features: ['CRM', 'Basic Workflows'] },
    { id: 'professional', name: 'Professional', price: 'IDR 2,500,000', users: 15, features: ['CRM', 'Advanced Workflows', 'Payments'] },
    { id: 'enterprise', name: 'Enterprise', price: 'IDR 5,000,000', users: 50, features: ['All Features', 'White-label', 'API Access'] }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
  };

  const handleBrandingChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    onCreateAccount(formData);
    onClose();
    setCurrentStep(1);
    setFormData({
      name: '',
      company: '',
      email: '',
      domain: '',
      tier: 'starter',
      userLimit: 5,
      features: {
        crm: true,
        workflows: true,
        payments: false,
        whitelabel: false,
        api: false
      },
      branding: {
        logo: null,
        primaryColor: '#2563EB',
        secondaryColor: '#64748B'
      }
    });
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Account Name *
        </label>
        <Input
          type="text"
          placeholder="Enter account name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Company Name *
        </label>
        <Input
          type="text"
          placeholder="Enter company name"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Admin Email *
        </label>
        <Input
          type="email"
          placeholder="admin@company.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Custom Domain
        </label>
        <Input
          type="text"
          placeholder="app.yourcompany.com"
          value={formData.domain}
          onChange={(e) => handleInputChange('domain', e.target.value)}
        />
        <p className="text-xs text-text-muted mt-1">Optional: Custom domain for white-label setup</p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-4">Select Plan</h3>
        <div className="space-y-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-150 ${
                formData.tier === tier.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
              }`}
              onClick={() => handleInputChange('tier', tier.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">{tier.name}</h4>
                  <p className="text-sm text-text-secondary">{tier.price}/month</p>
                  <p className="text-xs text-text-muted">Up to {tier.users} users</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  formData.tier === tier.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {formData.tier === tier.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {tier.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-text-primary mb-4">Feature Permissions</h3>
        <div className="space-y-3">
          {Object.entries(formData.features).map(([feature, enabled]) => (
            <div key={feature} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary capitalize">
                  {feature === 'crm' ? 'CRM Access' : 
                   feature === 'workflows' ? 'Workflow Automation' :
                   feature === 'payments' ? 'Payment Processing' :
                   feature === 'whitelabel'? 'White-label Branding' : 'API Access'}
                </p>
                <p className="text-xs text-text-muted">
                  {feature === 'crm' ? 'Contact management and sales pipeline' :
                   feature === 'workflows' ? 'Automated marketing workflows' :
                   feature === 'payments' ? 'Payment processing and invoicing' :
                   feature === 'whitelabel' ? 'Custom branding and domain' :
                   'REST API access for integrations'}
                </p>
              </div>
              <button
                onClick={() => handleFeatureToggle(feature)}
                className={`w-10 h-6 rounded-full transition-colors duration-150 ${
                  enabled ? 'bg-primary' : 'bg-secondary-300'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-150 ${
                  enabled ? 'translate-x-5' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-4">Brand Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={formData.branding.primaryColor}
                onChange={(e) => handleBrandingChange('primaryColor', e.target.value)}
                className="w-10 h-10 rounded border border-border"
              />
              <Input
                type="text"
                value={formData.branding.primaryColor}
                onChange={(e) => handleBrandingChange('primaryColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Secondary Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={formData.branding.secondaryColor}
                onChange={(e) => handleBrandingChange('secondaryColor', e.target.value)}
                className="w-10 h-10 rounded border border-border"
              />
              <Input
                type="text"
                value={formData.branding.secondaryColor}
                onChange={(e) => handleBrandingChange('secondaryColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Logo Upload
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <Icon name="Upload" size={24} className="mx-auto text-text-muted mb-2" />
          <p className="text-sm text-text-secondary mb-2">Drop your logo here or click to browse</p>
          <p className="text-xs text-text-muted">PNG, JPG up to 2MB. Recommended: 200x60px</p>
          <Button variant="outline" size="sm" className="mt-3">
            Choose File
          </Button>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h4 className="text-sm font-medium text-text-primary mb-2">Preview</h4>
        <div className="bg-surface p-4 rounded border" style={{ borderColor: formData.branding.primaryColor }}>
          <div className="flex items-center space-x-2 mb-3">
            <div 
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: formData.branding.primaryColor }}
            >
              <Icon name="Building" size={16} className="text-white" />
            </div>
            <span className="font-semibold" style={{ color: formData.branding.primaryColor }}>
              {formData.company || 'Your Company'}
            </span>
          </div>
          <Button 
            variant="primary" 
            size="sm"
            style={{ backgroundColor: formData.branding.primaryColor }}
          >
            Sample Button
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="text-lg font-semibold text-primary mb-2">Account Summary</h3>
        <p className="text-sm text-text-secondary">Review the details before creating the account</p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2">Basic Information</h4>
          <div className="bg-muted p-3 rounded-lg space-y-1">
            <p className="text-sm"><span className="font-medium">Name:</span> {formData.name}</p>
            <p className="text-sm"><span className="font-medium">Company:</span> {formData.company}</p>
            <p className="text-sm"><span className="font-medium">Email:</span> {formData.email}</p>
            {formData.domain && <p className="text-sm"><span className="font-medium">Domain:</span> {formData.domain}</p>}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2">Plan & Features</h4>
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm mb-2">
              <span className="font-medium">Plan:</span> {tiers.find(t => t.id === formData.tier)?.name} 
              ({tiers.find(t => t.id === formData.tier)?.price}/month)
            </p>
            <div className="flex flex-wrap gap-1">
              {Object.entries(formData.features)
                .filter(([, enabled]) => enabled)
                .map(([feature]) => (
                  <span key={feature} className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded capitalize">
                    {feature}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2">Branding</h4>
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: formData.branding.primaryColor }}
                ></div>
                <span className="text-sm">Primary: {formData.branding.primaryColor}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: formData.branding.secondaryColor }}
                ></div>
                <span className="text-sm">Secondary: {formData.branding.secondaryColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1050">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Create New Sub-Account</h2>
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>
          
          <div className="flex items-center space-x-4 mt-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.id 
                    ? 'bg-primary text-white' :'bg-secondary-200 text-text-muted'
                }`}>
                  {currentStep > step.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                <span className={`text-sm ${
                  currentStep >= step.id ? 'text-text-primary' : 'text-text-muted'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <Icon name="ChevronRight" size={16} className="text-text-muted ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        <div className="p-6 border-t border-border flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {currentStep < 4 ? (
              <Button
                variant="primary"
                onClick={() => setCurrentStep(currentStep + 1)}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                iconName="Check"
              >
                Create Account
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountModal;