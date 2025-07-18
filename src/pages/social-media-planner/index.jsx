import React, { useState, useEffect } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PlatformSidebar from './components/PlatformSidebar';
import CalendarView from './components/CalendarView';
import AnalyticsPanel from './components/AnalyticsPanel';
import PostComposer from './components/PostComposer';
import ContentTemplates from './components/ContentTemplates';
import BulkScheduler from './components/BulkScheduler';

const SocialMediaPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month'); // month, week, day
  const [selectedPlatforms, setSelectedPlatforms] = useState(['all']);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [draftPosts, setDraftPosts] = useState([]);
  const [contentLibrary, setContentLibrary] = useState([]);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isBulkSchedulerOpen, setIsBulkSchedulerOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [draggedPost, setDraggedPost] = useState(null);
  const [collaborationMode, setCollaborationMode] = useState(false);

  // Mock data for platforms
  const platforms = [
    { 
      id: 'instagram', 
      name: 'Instagram', 
      connected: true, 
      color: 'platform-instagram',
      icon: 'Instagram',
      followers: 15420,
      engagement: 4.2,
      posts: scheduledPosts.filter(p => p.platforms.includes('instagram')).length
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      connected: true, 
      color: 'platform-facebook',
      icon: 'Facebook',
      followers: 8930,
      engagement: 3.8,
      posts: scheduledPosts.filter(p => p.platforms.includes('facebook')).length
    },
    { 
      id: 'twitter', 
      name: 'Twitter', 
      connected: true, 
      color: 'platform-twitter',
      icon: 'Twitter',
      followers: 23150,
      engagement: 2.9,
      posts: scheduledPosts.filter(p => p.platforms.includes('twitter')).length
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      connected: true, 
      color: 'platform-linkedin',
      icon: 'Linkedin',
      followers: 5280,
      engagement: 5.1,
      posts: scheduledPosts.filter(p => p.platforms.includes('linkedin')).length
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      connected: false, 
      color: 'platform-tiktok',
      icon: 'Music',
      followers: 0,
      engagement: 0,
      posts: 0
    }
  ];

  // Mock scheduled posts data
  const mockScheduledPosts = [
    {
      id: 1,
      content: 'Exciting product launch announcement! 🚀',
      platforms: ['instagram', 'facebook', 'twitter'],
      scheduledTime: new Date(2025, 6, 15, 10, 0),
      status: 'scheduled',
      image: '/assets/images/no_image.png',
      engagement: { likes: 245, comments: 18, shares: 32 },
      author: 'John Doe',
      hashtags: ['#productlaunch', '#innovation', '#tech']
    },
    {
      id: 2,
      content: 'Behind the scenes of our latest campaign',
      platforms: ['instagram', 'linkedin'],
      scheduledTime: new Date(2025, 6, 15, 14, 30),
      status: 'scheduled',
      image: '/assets/images/no_image.png',
      engagement: { likes: 0, comments: 0, shares: 0 },
      author: 'Sarah Johnson',
      hashtags: ['#behindthescenes', '#team', '#work']
    },
    {
      id: 3,
      content: 'Weekly industry insights and trends',
      platforms: ['linkedin', 'twitter'],
      scheduledTime: new Date(2025, 6, 16, 9, 0),
      status: 'scheduled',
      image: null,
      engagement: { likes: 0, comments: 0, shares: 0 },
      author: 'Mike Chen',
      hashtags: ['#insights', '#trends', '#industry']
    }
  ];

  // Mock draft posts
  const mockDraftPosts = [
    {
      id: 4,
      content: 'Draft post about upcoming event',
      platforms: ['facebook'],
      status: 'draft',
      lastModified: new Date(2025, 6, 14, 16, 45),
      author: 'Lisa Wong'
    },
    {
      id: 5,
      content: 'Customer testimonial post',
      platforms: ['instagram', 'facebook'],
      status: 'draft',
      lastModified: new Date(2025, 6, 14, 11, 20),
      author: 'John Doe'
    }
  ];

  // Mock content library
  const mockContentLibrary = [
    {
      id: 1,
      name: 'Product Image 1',
      type: 'image',
      url: '/assets/images/no_image.png',
      size: '2.4 MB',
      dimensions: '1080x1080',
      uploadDate: new Date(2025, 6, 10)
    },
    {
      id: 2,
      name: 'Brand Logo',
      type: 'image',
      url: '/assets/images/no_image.png',
      size: '156 KB',
      dimensions: '512x512',
      uploadDate: new Date(2025, 6, 8)
    },
    {
      id: 3,
      name: 'Campaign Video',
      type: 'video',
      url: '/assets/videos/campaign.mp4',
      size: '15.8 MB',
      duration: '0:45',
      uploadDate: new Date(2025, 6, 12)
    }
  ];

  const analyticsData = {
    totalReach: 45680,
    totalEngagement: 3420,
    averageEngagementRate: 4.2,
    topPerformingPlatform: 'Instagram',
    totalPosts: 28,
    scheduledPosts: 12,
    optimalPostingTimes: {
      instagram: ['9:00 AM', '1:00 PM', '7:00 PM'],
      facebook: ['10:00 AM', '2:00 PM', '8:00 PM'],
      twitter: ['8:00 AM', '12:00 PM', '6:00 PM'],
      linkedin: ['9:00 AM', '12:00 PM', '5:00 PM']
    },
    weeklyStats: [
      { day: 'Mon', reach: 6420, engagement: 285 },
      { day: 'Tue', reach: 7180, engagement: 334 },
      { day: 'Wed', reach: 5940, engagement: 256 },
      { day: 'Thu', reach: 8230, engagement: 387 },
      { day: 'Fri', reach: 9150, engagement: 445 },
      { day: 'Sat', reach: 4680, engagement: 198 },
      { day: 'Sun', reach: 4080, engagement: 165 }
    ]
  };

  useEffect(() => {
    setScheduledPosts(mockScheduledPosts);
    setDraftPosts(mockDraftPosts);
    setContentLibrary(mockContentLibrary);
  }, []);

  // Filter posts based on selected platforms
  const filteredPosts = scheduledPosts.filter(post => 
    selectedPlatforms.includes('all') || 
    post.platforms.some(platform => selectedPlatforms.includes(platform))
  );

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handlePostSchedule = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData,
      status: 'scheduled',
      author: 'Current User',
      engagement: { likes: 0, comments: 0, shares: 0 }
    };
    setScheduledPosts(prev => [...prev, newPost]);
    setIsComposerOpen(false);
  };

  const handlePostReschedule = (postId, newDate) => {
    setScheduledPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, scheduledTime: newDate }
          : post
      )
    );
  };

  const handlePostDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setScheduledPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const handlePostEdit = (post) => {
    setSelectedPost(post);
    setIsComposerOpen(true);
  };

  const handleDragStart = (post) => {
    setDraggedPost(post);
  };

  const handleDragEnd = () => {
    setDraggedPost(null);
  };

  const handleDateDrop = (date) => {
    if (draggedPost) {
      const newScheduledTime = new Date(date);
      newScheduledTime.setHours(draggedPost.scheduledTime.getHours());
      newScheduledTime.setMinutes(draggedPost.scheduledTime.getMinutes());
      
      handlePostReschedule(draggedPost.id, newScheduledTime);
    }
  };

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev => {
      if (platformId === 'all') {
        return ['all'];
      }
      
      const newSelection = prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev.filter(id => id !== 'all'), platformId];
      
      return newSelection.length === 0 ? ['all'] : newSelection;
    });
  };

  const handleBulkSchedule = (posts) => {
    const newPosts = posts.map(post => ({
      id: Date.now() + Math.random(),
      ...post,
      status: 'scheduled',
      author: 'Current User',
      engagement: { likes: 0, comments: 0, shares: 0 }
    }));
    setScheduledPosts(prev => [...prev, ...newPosts]);
    setIsBulkSchedulerOpen(false);
  };

  const handleTemplateApply = (template) => {
    setSelectedPost(template);
    setIsComposerOpen(true);
    setIsTemplatesOpen(false);
  };

  const formatCurrentDate = () => {
    return format(selectedDate, 'MMMM yyyy');
  };

  const getPostsForDate = (date) => {
    return filteredPosts.filter(post => 
      isSameDay(new Date(post.scheduledTime), date)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="px-6 py-4">
          <Breadcrumb />
        </div>
        
        <div className="px-6 pb-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Social Media Planner</h1>
                <p className="text-text-secondary">
                  Schedule and manage your social media content across multiple platforms
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={() => setIsTemplatesOpen(true)}
                  className="btn-hover bg-surface border border-border text-text-primary px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <span>Templates</span>
                </button>
                <button
                  onClick={() => setIsBulkSchedulerOpen(true)}
                  className="btn-hover bg-surface border border-border text-text-primary px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <span>Bulk Schedule</span>
                </button>
                <button
                  onClick={() => setIsComposerOpen(true)}
                  className="btn-hover bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <span>Create Post</span>
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-text-primary">
                {formatCurrentDate()}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedDate(addDays(selectedDate, -30))}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18L9 12L15 6" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedDate(addDays(selectedDate, 30))}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18L15 12L9 6" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {['month', 'week', 'day'].map(view => (
                <button
                  key={view}
                  onClick={() => setCalendarView(view)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    calendarView === view 
                      ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Main Layout */}
          <div className="flex gap-6">
            {/* Left Sidebar - 25% */}
            <div className="w-1/4">
              <PlatformSidebar
                platforms={platforms}
                selectedPlatforms={selectedPlatforms}
                onPlatformToggle={handlePlatformToggle}
                draftPosts={draftPosts}
                contentLibrary={contentLibrary}
                onEditDraft={handlePostEdit}
                onDeleteDraft={handlePostDelete}
              />
            </div>

            {/* Calendar View - 60% */}
            <div className="flex-1">
              <CalendarView
                selectedDate={selectedDate}
                calendarView={calendarView}
                posts={filteredPosts}
                onDateSelect={handleDateSelect}
                onPostEdit={handlePostEdit}
                onPostDelete={handlePostDelete}
                onPostReschedule={handlePostReschedule}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDateDrop={handleDateDrop}
                draggedPost={draggedPost}
                getPostsForDate={getPostsForDate}
                platforms={platforms}
              />
            </div>

            {/* Right Panel - 15% */}
            <div className="w-60">
              <AnalyticsPanel
                analyticsData={analyticsData}
                platforms={platforms}
                selectedPlatforms={selectedPlatforms}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isComposerOpen && (
        <PostComposer
          isOpen={isComposerOpen}
          onClose={() => {
            setIsComposerOpen(false);
            setSelectedPost(null);
          }}
          onSchedule={handlePostSchedule}
          platforms={platforms}
          selectedPost={selectedPost}
          contentLibrary={contentLibrary}
        />
      )}

      {isTemplatesOpen && (
        <ContentTemplates
          isOpen={isTemplatesOpen}
          onClose={() => setIsTemplatesOpen(false)}
          onApply={handleTemplateApply}
        />
      )}

      {isBulkSchedulerOpen && (
        <BulkScheduler
          isOpen={isBulkSchedulerOpen}
          onClose={() => setIsBulkSchedulerOpen(false)}
          onSchedule={handleBulkSchedule}
          platforms={platforms}
        />
      )}
    </div>
  );
};

export default SocialMediaPlanner;