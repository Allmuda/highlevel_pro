import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  isSameDay,
  addDays,
  subDays
} from 'date-fns';
import Icon from '../../../components/AppIcon';

const CalendarView = ({ 
  selectedDate, 
  calendarView, 
  posts, 
  onDateSelect, 
  onPostEdit, 
  onPostDelete, 
  onPostReschedule,
  onDragStart,
  onDragEnd,
  onDateDrop,
  draggedPost,
  getPostsForDate,
  platforms 
}) => {
  const [hoveredDate, setHoveredDate] = useState(null);

  const generateCalendarDays = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const generateWeekDays = () => {
    const weekStart = startOfWeek(selectedDate);
    return eachDayOfInterval({ 
      start: weekStart, 
      end: addDays(weekStart, 6) 
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, date) => {
    e.preventDefault();
    onDateDrop(date);
    setHoveredDate(null);
  };

  const handleDragEnter = (date) => {
    setHoveredDate(date);
  };

  const handleDragLeave = () => {
    setHoveredDate(null);
  };

  const PostPreview = ({ post }) => {
    const postPlatforms = platforms.filter(p => post.platforms.includes(p.id));
    
    return (
      <div
        draggable
        onDragStart={() => onDragStart(post)}
        onDragEnd={onDragEnd}
        className="bg-surface border border-border rounded-lg p-2 mb-2 cursor-move hover:shadow-md transition-shadow group"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-text-primary truncate">
              {post.content}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              {postPlatforms.map(platform => (
                <div
                  key={platform.id}
                  className={`w-4 h-4 ${platform.color} rounded-full flex items-center justify-center`}
                >
                  <Icon name={platform.icon} size={10} color="white" />
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-1">
              {format(new Date(post.scheduledTime), 'HH:mm')}
            </p>
          </div>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPostEdit(post);
              }}
              className="p-1 hover:bg-muted rounded"
            >
              <Icon name="Edit" size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPostDelete(post.id);
              }}
              className="p-1 hover:bg-muted rounded text-error"
            >
              <Icon name="Trash2" size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DayCell = ({ date, isCurrentMonth = true }) => {
    const dayPosts = getPostsForDate(date);
    const isSelectedDate = isSameDay(date, selectedDate);
    const isTodayDate = isToday(date);
    const isHovered = hoveredDate && isSameDay(date, hoveredDate);

    return (
      <div
        className={`min-h-32 p-2 border-r border-b border-border-muted transition-colors ${
          isCurrentMonth ? 'bg-surface' : 'bg-muted'
        } ${isSelectedDate ? 'ring-2 ring-primary' : ''} ${
          isHovered ? 'bg-primary-50' : ''
        } ${isTodayDate ? 'bg-accent-50' : ''}`}
        onClick={() => onDateSelect(date)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, date)}
        onDragEnter={() => handleDragEnter(date)}
        onDragLeave={handleDragLeave}
      >
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${
            isTodayDate ? 'text-accent' : isCurrentMonth ?'text-text-primary' : 'text-text-muted'
          }`}>
            {format(date, 'd')}
          </span>
          {dayPosts.length > 0 && (
            <span className="text-xs text-text-muted">
              {dayPosts.length} post{dayPosts.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          {dayPosts.slice(0, 3).map(post => (
            <PostPreview key={post.id} post={post} />
          ))}
          {dayPosts.length > 3 && (
            <div className="text-xs text-text-muted text-center p-1">
              +{dayPosts.length - 3} more
            </div>
          )}
        </div>
      </div>
    );
  };

  if (calendarView === 'month') {
    const days = generateCalendarDays();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-surface rounded-lg border border-border card-elevation">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-border-muted">
          {weekDays.map(day => (
            <div key={day} className="p-4 text-center">
              <span className="text-sm font-medium text-text-secondary">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map(date => (
            <DayCell
              key={date.toISOString()}
              date={date}
              isCurrentMonth={isSameMonth(date, selectedDate)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (calendarView === 'week') {
    const days = generateWeekDays();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-surface rounded-lg border border-border card-elevation">
        {/* Week Header */}
        <div className="grid grid-cols-7 border-b border-border-muted">
          {days.map((date, index) => (
            <div key={date.toISOString()} className="p-4 text-center">
              <div className="text-sm font-medium text-text-secondary">{weekDays[index]}</div>
              <div className={`text-lg font-semibold ${
                isToday(date) ? 'text-accent' : 'text-text-primary'
              }`}>
                {format(date, 'd')}
              </div>
            </div>
          ))}
        </div>

        {/* Week Grid */}
        <div className="grid grid-cols-7">
          {days.map(date => (
            <DayCell
              key={date.toISOString()}
              date={date}
              isCurrentMonth={true}
            />
          ))}
        </div>
      </div>
    );
  }

  if (calendarView === 'day') {
    const dayPosts = getPostsForDate(selectedDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="bg-surface rounded-lg border border-border card-elevation">
        {/* Day Header */}
        <div className="p-6 border-b border-border-muted">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h3>
              <p className="text-text-muted">
                {dayPosts.length} post{dayPosts.length !== 1 ? 's' : ''} scheduled
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onDateSelect(subDays(selectedDate, 1))}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button
                onClick={() => onDateSelect(addDays(selectedDate, 1))}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Day Schedule */}
        <div className="p-6">
          <div className="space-y-4">
            {dayPosts.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Calendar" size={48} className="mx-auto text-text-muted mb-4" />
                <p className="text-text-muted">No posts scheduled for this day</p>
              </div>
            ) : (
              dayPosts
                .sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime))
                .map(post => (
                  <div
                    key={post.id}
                    className="bg-muted rounded-lg p-4 hover:bg-border transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-text-primary">
                            {format(new Date(post.scheduledTime), 'HH:mm')}
                          </span>
                          <div className="flex items-center space-x-1">
                            {post.platforms.map(platformId => {
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
                        </div>
                        <p className="text-text-primary mb-2">{post.content}</p>
                        {post.hashtags && (
                          <div className="flex flex-wrap gap-1">
                            {post.hashtags.map(tag => (
                              <span
                                key={tag}
                                className="text-xs bg-primary-100 text-primary px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onPostEdit(post)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Icon name="Edit" size={16} />
                        </button>
                        <button
                          onClick={() => onPostDelete(post.id)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors text-error"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CalendarView;