import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InvoiceModal = ({ isOpen, onClose }) => {
  const [invoiceData, setInvoiceData] = useState({
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    taxRate: 11,
    dueDate: '',
    notes: ''
  });

  const [selectedTemplate, setSelectedTemplate] = useState('standard');

  const templates = [
    { id: 'standard', name: 'Standard Invoice', preview: 'Clean and professional' },
    { id: 'modern', name: 'Modern Invoice', preview: 'Contemporary design' },
    { id: 'minimal', name: 'Minimal Invoice', preview: 'Simple and elegant' }
  ];

  if (!isOpen) return null;

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (index) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * invoiceData.taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating invoice:', invoiceData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1020 p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Create Invoice</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Invoice Template
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-150 ${
                      selectedTemplate === template.id
                        ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
                    }`}
                  >
                    <h4 className="font-medium text-text-primary">{template.name}</h4>
                    <p className="text-sm text-text-secondary mt-1">{template.preview}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Customer Name *
                </label>
                <Input
                  type="text"
                  value={invoiceData.customerName}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Customer Email *
                </label>
                <Input
                  type="email"
                  value={invoiceData.customerEmail}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, customerEmail: e.target.value }))}
                  placeholder="customer@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Customer Address
              </label>
              <textarea
                value={invoiceData.customerAddress}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, customerAddress: e.target.value }))}
                placeholder="Enter customer address"
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            {/* Invoice Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-text-primary">
                  Invoice Items *
                </label>
                <Button type="button" variant="ghost" size="sm" onClick={addItem}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-end">
                    <div className="col-span-12 md:col-span-5">
                      <Input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        placeholder="Item description"
                        required
                      />
                    </div>
                    <div className="col-span-6 md:col-span-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        placeholder="Qty"
                        min="1"
                        required
                      />
                    </div>
                    <div className="col-span-6 md:col-span-3">
                      <Input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                        placeholder="Price (IDR)"
                        min="0"
                        step="1000"
                        required
                      />
                    </div>
                    <div className="col-span-12 md:col-span-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-text-primary">
                        {formatCurrency(item.quantity * item.price)}
                      </span>
                      {invoiceData.items.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-error hover:text-error-600"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tax and Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Tax Rate (%)
                </label>
                <Input
                  type="number"
                  value={invoiceData.taxRate}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                  placeholder="11"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Due Date *
                </label>
                <Input
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Notes
              </label>
              <textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes or terms"
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            {/* Invoice Summary */}
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium text-text-primary mb-3">Invoice Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal:</span>
                  <span className="text-text-primary">{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Tax ({invoiceData.taxRate}%):</span>
                  <span className="text-text-primary">{formatCurrency(calculateTax())}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold">
                  <span className="text-text-primary">Total:</span>
                  <span className="text-text-primary">{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleSubmit}>
            <Icon name="Eye" size={16} className="mr-2" />
            Preview
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            <Icon name="Send" size={16} className="mr-2" />
            Create & Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;