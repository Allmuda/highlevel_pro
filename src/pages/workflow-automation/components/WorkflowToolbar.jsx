import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WorkflowToolbar = ({ 
  workflowName, 
  onWorkflowNameChange, 
  onSave, 
  onTest, 
  onPublish, 
  onVersionHistory,
  isPublished = false,
  isTesting = false,
  hasUnsavedChanges = false,
  className = '' 
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(workflowName);

  const handleNameSubmit = () => {
    onWorkflowNameChange(tempName);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setTempName(workflowName);
    setIsEditingName(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      handleNameCancel();
    }
  };

  return (
    <div className={`bg-surface border-b border-border px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left Section - Workflow Name */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Workflow" size={20} className="text-primary" />
            {isEditingName ? (
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="text-lg font-semibold w-64"
                  autoFocus
                />
                <Button variant="ghost" size="sm" onClick={handleNameSubmit} iconName="Check" />
                <Button variant="ghost" size="sm" onClick={handleNameCancel} iconName="X" />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-semibold text-text-primary">{workflowName}</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingName(true)}
                  iconName="Edit2"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                />
              </div>
            )}
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-1 text-warning">
                <Icon name="AlertCircle" size={14} />
                <span className="text-xs font-medium">Unsaved changes</span>
              </div>
            )}
            
            <div className={`flex items-center space-x-1 ${isPublished ? 'text-success' : 'text-text-muted'}`}>
              <div className={`w-2 h-2 rounded-full ${isPublished ? 'bg-success' : 'bg-text-muted'}`} />
              <span className="text-xs font-medium">{isPublished ? 'Published' : 'Draft'}</span>
            </div>

            {isTesting && (
              <div className="flex items-center space-x-1 text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs font-medium">Testing...</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Version History */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onVersionHistory}
            iconName="History"
            className="text-text-secondary hover:text-text-primary"
          >
            History
          </Button>

          {/* Test Workflow */}
          <Button
            variant="outline"
            size="sm"
            onClick={onTest}
            iconName="Play"
            disabled={isTesting}
            className={isTesting ? 'animate-pulse' : ''}
          >
            {isTesting ? 'Testing...' : 'Test'}
          </Button>

          {/* Save */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onSave}
            iconName="Save"
            disabled={!hasUnsavedChanges}
          >
            Save
          </Button>

          {/* Publish/Unpublish */}
          <Button
            variant={isPublished ? "outline" : "primary"}
            size="sm"
            onClick={onPublish}
            iconName={isPublished ? "Pause" : "Play"}
          >
            {isPublished ? 'Unpublish' : 'Publish'}
          </Button>

          {/* More Actions */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
              className="text-text-secondary hover:text-text-primary"
            />
          </div>
        </div>
      </div>

      {/* Workflow Stats */}
      <div className="flex items-center space-x-6 mt-3 pt-3 border-t border-border-muted">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Zap" size={14} className="text-text-muted" />
          <span className="text-text-muted">Triggers:</span>
          <span className="font-medium text-text-primary">2</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="GitBranch" size={14} className="text-text-muted" />
          <span className="text-text-muted">Actions:</span>
          <span className="font-medium text-text-primary">5</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Clock" size={14} className="text-text-muted" />
          <span className="text-text-muted">Last modified:</span>
          <span className="font-medium text-text-primary">2 hours ago</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Activity" size={14} className="text-text-muted" />
          <span className="text-text-muted">Success rate:</span>
          <span className="font-medium text-success">98.5%</span>
        </div>
      </div>
    </div>
  );
};

export default WorkflowToolbar;