import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CampaignToolbar = ({ 
  campaignName, 
  onCampaignNameChange, 
  onSave, 
  onPreview, 
  onLaunch,
  isPreviewMode,
  campaignStatus 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(campaignName);

  const handleNameSave = () => {
    onCampaignNameChange?.(tempName);
    setIsEditing(false);
  };

  const handleNameCancel = () => {
    setTempName(campaignName);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'paused': return 'warning';
      case 'draft': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'paused': return 'Pause';
      case 'draft': return 'FileText';
      default: return 'FileText';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-surface border-b border-border">
      <div className="flex items-center space-x-4">
        {/* Campaign Name */}
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-48"
                placeholder="Campaign name"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNameSave}
                iconName="Check"
                className="text-success"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNameCancel}
                iconName="X"
                className="text-error"
              />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-text-primary">
                {campaignName || 'Untitled Campaign'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                iconName="Edit3"
                className="text-text-muted hover:text-text-primary"
              />
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium
          ${campaignStatus === 'active' ? 'bg-success-50 text-success' : ''}
          ${campaignStatus === 'paused' ? 'bg-warning-50 text-warning' : ''}
          ${campaignStatus === 'draft' ? 'bg-secondary-50 text-secondary' : ''}
        `}>
          <Icon name={getStatusIcon(campaignStatus)} size={14} />
          <span className="capitalize">{campaignStatus}</span>
        </div>

        {/* Performance Metrics */}
        <div className="hidden lg:flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>1,247 reached</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MousePointer" size={14} />
            <span>24.8% CTR</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Target" size={14} />
            <span>12.3% conversion</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onSave}
          iconName="Save"
        >
          Save
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={onPreview}
          iconName="Eye"
          className={isPreviewMode ? 'bg-primary-50 text-primary' : ''}
        >
          Preview
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={onLaunch}
          iconName="Play"
          disabled={campaignStatus === 'active'}
        >
          {campaignStatus === 'active' ? 'Running' : 'Launch'}
        </Button>

        {/* More Actions */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreHorizontal"
            className="text-text-muted hover:text-text-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignToolbar;