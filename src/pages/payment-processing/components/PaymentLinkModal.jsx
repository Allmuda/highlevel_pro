import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentLinkModal = ({ isOpen, onClose }) => {
  const [linkData, setLinkData] = useState({
    title: '',
    description: '',
    amount: '',
    currency: 'IDR',
    expiryDate: '',
    maxUses: '',
    allowCustomAmount: false,
    collectCustomerInfo: true,
    redirectUrl: '',
    webhookUrl: ''
  });

  const [generatedLink, setGeneratedLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const linkId = Math.random().toString(36).substr(2, 9);
      setGeneratedLink(`https://pay.highlevel.pro/link/${linkId}`);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      // You could add a toast notification here
      console.log('Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const resetForm = () => {
    setLinkData({
      title: '',
      description: '',
      amount: '',
      currency: 'IDR',
      expiryDate: '',
      maxUses: '',
      allowCustomAmount: false,
      collectCustomerInfo: true,
      redirectUrl: '',
      webhookUrl: ''
    });
    setGeneratedLink('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1020 p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Create Payment Link</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {!generatedLink ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Payment Title *
                  </label>
                  <Input
                    type="text"
                    value={linkData.title}
                    onChange={(e) => setLinkData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Website Development Service"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Description
                  </label>
                  <textarea
                    value={linkData.description}
                    onChange={(e) => setLinkData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the payment"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Amount (IDR) *
                    </label>
                    <Input
                      type="number"
                      value={linkData.amount}
                      onChange={(e) => setLinkData(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="0"
                      min="1000"
                      step="1000"
                      required={!linkData.allowCustomAmount}
                      disabled={linkData.allowCustomAmount}
                    />
                    {linkData.amount && (
                      <p className="text-sm text-text-secondary mt-1">
                        {formatCurrency(parseInt(linkData.amount))}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Expiry Date
                    </label>
                    <Input
                      type="datetime-local"
                      value={linkData.expiryDate}
                      onChange={(e) => setLinkData(prev => ({ ...prev, expiryDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Advanced Options</h3>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Maximum Uses
                  </label>
                  <Input
                    type="number"
                    value={linkData.maxUses}
                    onChange={(e) => setLinkData(prev => ({ ...prev, maxUses: e.target.value }))}
                    placeholder="Leave empty for unlimited"
                    min="1"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    How many times this link can be used
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="allowCustomAmount"
                      checked={linkData.allowCustomAmount}
                      onChange={(e) => setLinkData(prev => ({ ...prev, allowCustomAmount: e.target.checked }))}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <label htmlFor="allowCustomAmount" className="text-sm text-text-primary">
                      Allow customers to enter custom amount
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="collectCustomerInfo"
                      checked={linkData.collectCustomerInfo}
                      onChange={(e) => setLinkData(prev => ({ ...prev, collectCustomerInfo: e.target.checked }))}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <label htmlFor="collectCustomerInfo" className="text-sm text-text-primary">
                      Collect customer information
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Redirect URL (after payment)
                  </label>
                  <Input
                    type="url"
                    value={linkData.redirectUrl}
                    onChange={(e) => setLinkData(prev => ({ ...prev, redirectUrl: e.target.value }))}
                    placeholder="https://yourwebsite.com/thank-you"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Webhook URL
                  </label>
                  <Input
                    type="url"
                    value={linkData.webhookUrl}
                    onChange={(e) => setLinkData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                    placeholder="https://yourapi.com/webhook"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    Receive payment notifications at this URL
                  </p>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="CheckCircle" size={32} className="text-success" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Payment Link Created!
                </h3>
                <p className="text-text-secondary">
                  Your payment link is ready to share with customers
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-3">
                    <p className="text-sm font-medium text-text-primary mb-1">Payment Link</p>
                    <p className="text-sm text-text-secondary break-all">{generatedLink}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-surface border border-border rounded-lg">
                  <Icon name="QrCode" size={24} className="mx-auto text-text-secondary mb-2" />
                  <p className="text-sm font-medium text-text-primary">QR Code</p>
                  <p className="text-xs text-text-secondary">Generate QR for easy sharing</p>
                </div>
                <div className="text-center p-4 bg-surface border border-border rounded-lg">
                  <Icon name="Share" size={24} className="mx-auto text-text-secondary mb-2" />
                  <p className="text-sm font-medium text-text-primary">Share Link</p>
                  <p className="text-xs text-text-secondary">Send via email or social media</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-end space-x-3">
          {!generatedLink ? (
            <>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSubmit}
                disabled={isGenerating}
                loading={isGenerating}
              >
                {isGenerating ? 'Creating...' : 'Create Payment Link'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={resetForm}>
                Create Another
              </Button>
              <Button variant="primary" onClick={onClose}>
                Done
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentLinkModal;