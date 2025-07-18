import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkScheduler = ({ isOpen, onClose, onSchedule, platforms }) => {
  const [csvData, setCsvData] = useState('');
  const [parsedPosts, setParsedPosts] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [schedulingOption, setSchedulingOption] = useState('specific'); // specific, spread, optimal
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [validationErrors, setValidationErrors] = useState([]);

  const csvTemplate = `content,platforms,scheduled_date,scheduled_time,hashtags
"Exciting product launch announcement! 🚀","instagram,facebook,twitter","2025-07-16","10:00","#productlaunch,#innovation" "Behind the scenes of our latest campaign","instagram,linkedin","2025-07-16","14:30","#behindthescenes,#team" "Weekly industry insights and trends","linkedin,twitter","2025-07-17","09:00","#insights,#trends"`;

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setCsvData(content);
        parseCsvData(content);
      };
      reader.readAsText(file);
    }
  };

  const parseCsvData = (csvContent) => {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const posts = [];
    const errors = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      
      if (values.length !== headers.length) {
        errors.push(`Line ${i + 1}: Incorrect number of columns`);
        continue;
      }

      const post = {};
      headers.forEach((header, index) => {
        post[header] = values[index];
      });

      // Validate required fields
      if (!post.content) {
        errors.push(`Line ${i + 1}: Content is required`);
        continue;
      }

      if (!post.platforms) {
        errors.push(`Line ${i + 1}: Platforms are required`);
        continue;
      }

      // Process platforms
      post.platforms = post.platforms.split(',').map(p => p.trim());
      
      // Process hashtags
      if (post.hashtags) {
        post.hashtags = post.hashtags.split(',').map(h => h.trim());
      }

      // Process scheduled time
      if (post.scheduled_date && post.scheduled_time) {
        post.scheduledTime = new Date(`${post.scheduled_date}T${post.scheduled_time}`);
      }

      posts.push(post);
    }

    setParsedPosts(posts);
    setValidationErrors(errors);
  };

  const handleManualInput = (value) => {
    setCsvData(value);
    if (value.trim()) {
      parseCsvData(value);
    } else {
      setParsedPosts([]);
      setValidationErrors([]);
    }
  };

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const generateSchedule = () => {
    if (schedulingOption === 'specific') {
      return parsedPosts; // Use times from CSV
    }

    const posts = [...parsedPosts];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (schedulingOption === 'spread') {
      // Spread posts evenly between start and end dates
      const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const postsPerDay = Math.ceil(posts.length / daysDiff);
      
      posts.forEach((post, index) => {
        const dayIndex = Math.floor(index / postsPerDay);
        const timeSlot = (index % postsPerDay) + 1;
        const scheduleDate = new Date(start);
        scheduleDate.setDate(start.getDate() + dayIndex);
        scheduleDate.setHours(9 + (timeSlot * 2), 0, 0, 0); // Start at 9 AM, spread 2 hours apart
        
        post.scheduledTime = scheduleDate;
      });
    } else if (schedulingOption === 'optimal') {
      // Use optimal posting times
      const optimalTimes = {
        default: [9, 12, 15, 18], // 9 AM, 12 PM, 3 PM, 6 PM
        instagram: [11, 14, 17],
        facebook: [10, 13, 16],
        twitter: [8, 12, 17],
        linkedin: [9, 12, 17]
      };

      posts.forEach((post, index) => {
        const scheduleDate = new Date(start);
        const dayOffset = Math.floor(index / 4); // 4 posts per day max
        const timeSlot = index % 4;
        
        scheduleDate.setDate(start.getDate() + dayOffset);
        scheduleDate.setHours(optimalTimes.default[timeSlot], 0, 0, 0);
        
        post.scheduledTime = scheduleDate;
      });
    }

    return posts;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (parsedPosts.length === 0) {
      alert('Please add posts to schedule');
      return;
    }

    if (validationErrors.length > 0) {
      alert('Please fix validation errors before scheduling');
      return;
    }

    const scheduledPosts = generateSchedule();
    
    // Apply selected platforms if using platform override
    if (selectedPlatforms.length > 0) {
      scheduledPosts.forEach(post => {
        post.platforms = selectedPlatforms;
      });
    }

    onSchedule(scheduledPosts);
  };

  const connectedPlatforms = platforms.filter(p => p.connected);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg border border-border max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border-muted">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Bulk Scheduler</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* CSV Upload */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Upload CSV or Enter Data
            </label>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('csv-upload').click()}
                  iconName="Upload"
                >
                  Upload CSV
                </Button>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const blob = new Blob([csvTemplate], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'social_media_template.csv';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  iconName="Download"
                >
                  Download Template
                </Button>
              </div>
              
              <textarea
                value={csvData}
                onChange={(e) => handleManualInput(e.target.value)}
                placeholder="Paste CSV data here or upload a file..."
                rows={8}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm"
              />
            </div>
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="bg-error-50 border border-error-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <span className="text-sm font-medium text-error">Validation Errors</span>
              </div>
              <ul className="text-sm text-error space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Parsed Posts Preview */}
          {parsedPosts.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">
                Posts to Schedule ({parsedPosts.length})
              </h3>
              <div className="max-h-40 overflow-y-auto border border-border rounded-lg">
                {parsedPosts.map((post, index) => (
                  <div key={index} className="p-3 border-b border-border-muted last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {post.content}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-text-muted">
                            Platforms: {post.platforms.join(', ')}
                          </span>
                          {post.scheduledTime && (
                            <span className="text-xs text-text-muted">
                              {post.scheduledTime.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Platform Override */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Platform Override (Optional)
            </label>
            <p className="text-sm text-text-muted mb-3">
              Select platforms to override the ones specified in your CSV
            </p>
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

          {/* Scheduling Options */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Scheduling Method
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="scheduling"
                  value="specific"
                  checked={schedulingOption === 'specific'}
                  onChange={(e) => setSchedulingOption(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-primary">Use specific times from CSV</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="scheduling"
                  value="spread"
                  checked={schedulingOption === 'spread'}
                  onChange={(e) => setSchedulingOption(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-primary">Spread evenly across date range</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="scheduling"
                  value="optimal"
                  checked={schedulingOption === 'optimal'}
                  onChange={(e) => setSchedulingOption(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-primary">Use optimal posting times</span>
              </label>
            </div>
          </div>

          {/* Date Range (for spread and optimal) */}
          {(schedulingOption === 'spread' || schedulingOption === 'optimal') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-text-muted mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>
          )}

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
              disabled={parsedPosts.length === 0 || validationErrors.length > 0}
            >
              Schedule {parsedPosts.length} Posts
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkScheduler;