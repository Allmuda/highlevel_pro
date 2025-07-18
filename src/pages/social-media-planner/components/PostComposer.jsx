import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PostComposer = ({ 
  isOpen, 
  onClose, 
  onSchedule, 
  platforms, 
  selectedPost,
  contentLibrary 
}) => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [crossPostOptions, setCrossPostOptions] = useState({
    adaptContent: true,
    optimizeForPlatform: true,
    autoHashtags: true
  });

  // Hashtag suggestions based on content
  const hashtagSuggestions = [
    '#marketing', '#socialmedia', '#business', '#digital', '#content',
    '#branding', '#strategy', '#growth', '#engagement', '#social',
    '#online', '#community', '#innovation', '#technology', '#success'
  ];

  useEffect(() => {
    if (selectedPost) {
      setContent(selectedPost.content || '');
      setSelectedPlatforms(selectedPost.platforms || []);
      if (selectedPost.scheduledTime) {
        const date = new Date(selectedPost.scheduledTime);
        setScheduledDate(date.toISOString().split('T')[0]);
        setScheduledTime(date.toTimeString().slice(0, 5));
      }
      setHashtags(selectedPost.hashtags || []);
    }
  }, [selectedPost]);

  useEffect(() => {
    if (isOpen && !selectedPost) {
      // Set default date and time for new posts
      const now = new Date();
      now.setHours(now.getHours() + 1);
      setScheduledDate(now.toISOString().split('T')[0]);
      setScheduledTime(now.toTimeString().slice(0, 5));
    }
  }, [isOpen, selectedPost]);

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleHashtagAdd = (hashtag) => {
    if (hashtag && !hashtags.includes(hashtag)) {
      setHashtags(prev => [...prev, hashtag]);
      setHashtagInput('');
    }
  };

  const handleHashtagRemove = (hashtag) => {
    setHashtags(prev => prev.filter(h => h !== hashtag));
  };

  const handleHashtagInputKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      let tag = hashtagInput.trim();
      if (tag && !tag.startsWith('#')) {
        tag = '#' + tag;
      }
      handleHashtagAdd(tag);
    }
  };

  const handleMediaSelect = (media) => {
    setSelectedMedia(media);
    setShowMediaLibrary(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!content.trim() || selectedPlatforms.length === 0 || !scheduledDate || !scheduledTime) {
      alert('Please fill in all required fields');
      return;
    }

    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    
    onSchedule({
      content: content.trim(),
      platforms: selectedPlatforms,
      scheduledTime: scheduledDateTime,
      hashtags,
      media: selectedMedia,
      crossPostOptions
    });
    
    // Reset form
    setContent('');
    setSelectedPlatforms([]);
    setScheduledDate('');
    setScheduledTime('');
    setHashtags([]);
    setSelectedMedia(null);
  };

  const getCharacterCount = (platformId) => {
    const limits = {
      twitter: 280,
      instagram: 2200,
      facebook: 63206,
      linkedin: 1300,
      tiktok: 150
    };
    return limits[platformId] || 2200;
  };

  const connectedPlatforms = platforms.filter(p => p.connected);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg border border-border max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border-muted">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              {selectedPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Post Content *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              required
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-text-muted">
                {content.length} characters
              </span>
              {selectedPlatforms.length > 0 && (
                <div className="flex items-center space-x-2">
                  {selectedPlatforms.map(platformId => {
                    const limit = getCharacterCount(platformId);
                    const isOverLimit = content.length > limit;
                    const platform = platforms.find(p => p.id === platformId);
                    return (
                      <span
                        key={platformId}
                        className={`text-xs ${isOverLimit ? 'text-error' : 'text-text-muted'}`}
                      >
                        {platform?.name}: {limit - content.length}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Select Platforms *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {connectedPlatforms.map(platform => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-primary bg-primary-50 text-primary' :'border-border bg-muted hover:bg-border'
                  }`}
                >
                  <div className={`w-6 h-6 ${platform.color} rounded-full flex items-center justify-center`}>
                    <Icon name={platform.icon} size={14} color="white" />
                  </div>
                  <span className="text-sm font-medium">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Media */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Media
            </label>
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowMediaLibrary(!showMediaLibrary)}
                iconName="Image"
              >
                {selectedMedia ? 'Change Media' : 'Add Media'}
              </Button>
              {selectedMedia && (
                <div className="flex items-center space-x-2">
                  <Icon name="Image" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-primary">{selectedMedia.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => setSelectedMedia(null)}
                    iconName="X"
                  />
                </div>
              )}
            </div>
            
            {showMediaLibrary && (
              <div className="mt-3 p-3 bg-muted rounded-lg max-h-40 overflow-y-auto">
                <div className="grid grid-cols-3 gap-2">
                  {contentLibrary.map(media => (
                    <button
                      key={media.id}
                      type="button"
                      onClick={() => handleMediaSelect(media)}
                      className="flex flex-col items-center space-y-1 p-2 bg-surface rounded-lg hover:bg-border transition-colors"
                    >
                      <Icon 
                        name={media.type === 'image' ? 'Image' : 'Video'} 
                        size={24} 
                        className="text-text-muted" 
                      />
                      <span className="text-xs text-text-primary truncate max-w-full">
                        {media.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hashtags */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Hashtags
            </label>
            <div className="space-y-2">
              <Input
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyPress={handleHashtagInputKeyPress}
                placeholder="Add hashtags (press Enter or Space to add)"
                className="w-full"
              />
              
              {/* Current hashtags */}
              {hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {hashtags.map(hashtag => (
                    <span
                      key={hashtag}
                      className="inline-flex items-center space-x-1 bg-primary-100 text-primary px-2 py-1 rounded text-sm"
                    >
                      <span>{hashtag}</span>
                      <button
                        type="button"
                        onClick={() => handleHashtagRemove(hashtag)}
                        className="hover:text-error"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              {/* Hashtag suggestions */}
              <div className="flex flex-wrap gap-1">
                {hashtagSuggestions
                  .filter(suggestion => !hashtags.includes(suggestion))
                  .slice(0, 8)
                  .map(suggestion => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleHashtagAdd(suggestion)}
                      className="text-xs bg-muted hover:bg-border text-text-secondary px-2 py-1 rounded transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Schedule *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
              />
              <Input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Cross-post Options */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Cross-post Options
            </label>
            <div className="space-y-2">
              {Object.entries(crossPostOptions).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setCrossPostOptions(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">
                    {key === 'adaptContent' && 'Adapt content for each platform'}
                    {key === 'optimizeForPlatform' && 'Optimize for platform requirements'}
                    {key === 'autoHashtags' && 'Auto-suggest relevant hashtags'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border-muted">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!content.trim() || selectedPlatforms.length === 0}
            >
              {selectedPost ? 'Update Post' : 'Schedule Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostComposer;