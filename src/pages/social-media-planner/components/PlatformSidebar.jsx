import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlatformSidebar = ({ 
  platforms, 
  selectedPlatforms, 
  onPlatformToggle, 
  draftPosts, 
  contentLibrary, 
  onEditDraft,
  onDeleteDraft 
}) => {
  const [activeTab, setActiveTab] = useState('platforms');

  const connectedPlatforms = platforms.filter(p => p.connected);
  const disconnectedPlatforms = platforms.filter(p => !p.connected);

  const handleConnectPlatform = (platformId) => {
    console.log('Connect platform:', platformId);
    // Implement platform connection logic
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-surface rounded-lg border border-border card-elevation">
      {/* Tab Navigation */}
      <div className="border-b border-border-muted">
        <div className="flex">
          {[
            { id: 'platforms', label: 'Platforms', icon: 'Share2' },
            { id: 'drafts', label: 'Drafts', icon: 'FileText' },
            { id: 'library', label: 'Library', icon: 'Image' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 h-96 overflow-y-auto custom-scrollbar">
        {/* Platforms Tab */}
        {activeTab === 'platforms' && (
          <div className="space-y-4">
            {/* Platform Filter */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-text-primary mb-3">Filter by Platform</h3>
              <button
                onClick={() => onPlatformToggle('all')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  selectedPlatforms.includes('all')
                    ? 'bg-primary-50 border border-primary-200 text-primary' :'bg-muted hover:bg-border'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <Icon name="Globe" size={16} color="white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">All Platforms</div>
                  <div className="text-xs text-text-muted">
                    {connectedPlatforms.length} connected
                  </div>
                </div>
              </button>
            </div>

            {/* Connected Platforms */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-text-primary">Connected</h4>
              {connectedPlatforms.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => onPlatformToggle(platform.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    selectedPlatforms.includes(platform.id)
                      ? 'bg-primary-50 border border-primary-200 text-primary' :'bg-muted hover:bg-border'
                  }`}
                >
                  <div className={`w-8 h-8 ${platform.color} rounded-full flex items-center justify-center`}>
                    <Icon name={platform.icon} size={16} color="white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-xs text-text-muted">
                      {platform.followers.toLocaleString()} followers
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-success">Connected</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Disconnected Platforms */}
            {disconnectedPlatforms.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-text-primary">Available</h4>
                {disconnectedPlatforms.map(platform => (
                  <div
                    key={platform.id}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg bg-muted opacity-60"
                  >
                    <div className={`w-8 h-8 ${platform.color} rounded-full flex items-center justify-center`}>
                      <Icon name={platform.icon} size={16} color="white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{platform.name}</div>
                      <div className="text-xs text-text-muted">Not connected</div>
                    </div>
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => handleConnectPlatform(platform.id)}
                    >
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Drafts Tab */}
        {activeTab === 'drafts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text-primary">Draft Posts</h3>
              <span className="text-xs text-text-muted">{draftPosts.length} drafts</span>
            </div>
            
            {draftPosts.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="FileText" size={48} className="mx-auto text-text-muted mb-4" />
                <p className="text-text-muted">No drafts yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {draftPosts.map(draft => (
                  <div
                    key={draft.id}
                    className="bg-muted rounded-lg p-3 hover:bg-border transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {draft.content}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          {draft.platforms.map(platformId => {
                            const platform = platforms.find(p => p.id === platformId);
                            return platform ? (
                              <div
                                key={platformId}
                                className={`w-5 h-5 ${platform.color} rounded-full flex items-center justify-center`}
                              >
                                <Icon name={platform.icon} size={12} color="white" />
                              </div>
                            ) : null;
                          })}
                        </div>
                        <p className="text-xs text-text-muted mt-1">
                          Modified {draft.lastModified.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => onEditDraft(draft)}
                          iconName="Edit"
                        />
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => onDeleteDraft(draft.id)}
                          iconName="Trash2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Library Tab */}
        {activeTab === 'library' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text-primary">Content Library</h3>
              <span className="text-xs text-text-muted">{contentLibrary.length} items</span>
            </div>
            
            {contentLibrary.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Image" size={48} className="mx-auto text-text-muted mb-4" />
                <p className="text-text-muted">No content yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {contentLibrary.map(item => (
                  <div
                    key={item.id}
                    className="bg-muted rounded-lg p-3 hover:bg-border transition-colors cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-border rounded-lg flex items-center justify-center">
                        {item.type === 'image' ? (
                          <Icon name="Image" size={20} className="text-text-muted" />
                        ) : (
                          <Icon name="Video" size={20} className="text-text-muted" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-text-muted">
                          {item.type === 'image' ? item.dimensions : item.duration}
                        </p>
                        <p className="text-xs text-text-muted">
                          {item.size || formatFileSize(item.fileSize || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformSidebar;