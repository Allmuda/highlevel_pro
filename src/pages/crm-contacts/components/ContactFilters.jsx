import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  contactsCount,
  onAddContact
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const segments = [
    { value: 'all', label: 'All Contacts', count: contactsCount },
    { value: 'leads', label: 'Leads', count: 45 },
    { value: 'customers', label: 'Customers', count: 32 },
    { value: 'prospects', label: 'Prospects', count: 28 },
    { value: 'inactive', label: 'Inactive', count: 15 }
  ];

  const tags = [
    { value: 'vip', label: 'VIP', color: 'bg-accent-100 text-accent-600' },
    { value: 'hot-lead', label: 'Hot Lead', color: 'bg-error-100 text-error-600' },
    { value: 'follow-up', label: 'Follow Up', color: 'bg-warning-100 text-warning-600' },
    { value: 'qualified', label: 'Qualified', color: 'bg-success-100 text-success-600' },
    { value: 'cold', label: 'Cold', color: 'bg-secondary-100 text-secondary-600' }
  ];

  const lifecycleStages = [
    { value: 'subscriber', label: 'Subscriber' },
    { value: 'lead', label: 'Lead' },
    { value: 'marketing-qualified', label: 'Marketing Qualified Lead' },
    { value: 'sales-qualified', label: 'Sales Qualified Lead' },
    { value: 'opportunity', label: 'Opportunity' },
    { value: 'customer', label: 'Customer' },
    { value: 'evangelist', label: 'Evangelist' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.segment !== 'all') count++;
    if (filters.tags.length > 0) count++;
    if (filters.lifecycleStage !== 'all') count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.leadScoreRange.min > 0 || filters.leadScoreRange.max < 100) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-surface rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full font-medium">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onAddContact}
            iconName="Plus"
            className="bg-primary hover:bg-primary-600"
          >
            Add Contact
          </Button>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              className="text-text-secondary hover:text-error"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            className="text-text-secondary hover:text-text-primary"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>

      {/* Basic Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Segment Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Segment</label>
          <select
            value={filters.segment}
            onChange={(e) => handleFilterChange('segment', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {segments.map((segment) => (
              <option key={segment.value} value={segment.value}>
                {segment.label} ({segment.count})
              </option>
            ))}
          </select>
        </div>

        {/* Lifecycle Stage Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Lifecycle Stage</label>
          <select
            value={filters.lifecycleStage}
            onChange={(e) => handleFilterChange('lifecycleStage', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Stages</option>
            {lifecycleStages.map((stage) => (
              <option key={stage.value} value={stage.value}>
                {stage.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        {/* Quick Search */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Quick Search</label>
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <Input
              type="search"
              placeholder="Search by name, email..."
              value={filters.quickSearch}
              onChange={(e) => handleFilterChange('quickSearch', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                  className="text-sm"
                />
                <Input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Lead Score Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Lead Score Range ({filters.leadScoreRange.min} - {filters.leadScoreRange.max})
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.leadScoreRange.min}
                  onChange={(e) => handleFilterChange('leadScoreRange', { ...filters.leadScoreRange, min: parseInt(e.target.value) || 0 })}
                  placeholder="Min"
                />
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.leadScoreRange.max}
                  onChange={(e) => handleFilterChange('leadScoreRange', { ...filters.leadScoreRange, max: parseInt(e.target.value) || 100 })}
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Industry</label>
              <select
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Industries</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.value}
                  onClick={() => {
                    const newTags = filters.tags.includes(tag.value)
                      ? filters.tags.filter(t => t !== tag.value)
                      : [...filters.tags, tag.value];
                    handleFilterChange('tags', newTags);
                  }}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                    filters.tags.includes(tag.value)
                      ? `${tag.color} ring-2 ring-offset-1 ring-current`
                      : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                  }`}
                >
                  {tag.label}
                  {filters.tags.includes(tag.value) && (
                    <Icon name="X" size={12} className="ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Last Interaction Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Last Interaction Type</label>
              <select
                value={filters.lastInteractionType}
                onChange={(e) => handleFilterChange('lastInteractionType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Types</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="sms">SMS</option>
                <option value="call">Phone Call</option>
                <option value="meeting">Meeting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Source</label>
              <select
                value={filters.source}
                onChange={(e) => handleFilterChange('source', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Sources</option>
                <option value="website">Website</option>
                <option value="social-media">Social Media</option>
                <option value="referral">Referral</option>
                <option value="advertisement">Advertisement</option>
                <option value="import">Import</option>
                <option value="manual">Manual Entry</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactFilters;