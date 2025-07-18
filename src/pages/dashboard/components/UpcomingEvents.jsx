import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Demo Call with John Smith',
      time: '2:00 PM',
      date: 'Today',
      type: 'call',
      duration: '30 min',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Team Weekly Standup',
      time: '10:00 AM',
      date: 'Tomorrow',
      type: 'meeting',
      duration: '45 min',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Product Launch Webinar',
      time: '3:00 PM',
      date: 'Jan 20',
      type: 'webinar',
      duration: '60 min',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Client Review Meeting',
      time: '11:00 AM',
      date: 'Jan 22',
      type: 'meeting',
      duration: '90 min',
      status: 'confirmed'
    }
  ];

  const getEventIcon = (type) => {
    const iconMap = {
      call: 'Phone',
      meeting: 'Users',
      webinar: 'Video',
      training: 'BookOpen'
    };
    return iconMap[type] || 'Calendar';
  };

  const getStatusColor = (status) => {
    const colorMap = {
      confirmed: 'bg-success-50 text-success border-success-200',
      pending: 'bg-warning-50 text-warning border-warning-200',
      cancelled: 'bg-error-50 text-error border-error-200'
    };
    return colorMap[status] || colorMap.pending;
  };

  const handleEventClick = (event) => {
    console.log('Open event:', event.title);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Upcoming Events</h3>
        <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-150">
          View Calendar
        </button>
      </div>
      
      <div className="space-y-4">
        {events.map((event) => (
          <div 
            key={event.id}
            onClick={() => handleEventClick(event)}
            className="p-3 border border-border rounded-lg hover:bg-muted transition-colors duration-150 cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                <Icon name={getEventIcon(event.type)} size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary text-sm mb-1">{event.title}</h4>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-text-secondary text-xs flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{event.time}</span>
                  </span>
                  <span className="text-text-secondary text-xs">{event.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted text-xs">{event.date}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full border ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 flex items-center justify-center space-x-2">
          <Icon name="Plus" size={14} />
          <span>Schedule New Event</span>
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;