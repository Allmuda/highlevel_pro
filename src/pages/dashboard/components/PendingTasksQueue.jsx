import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingTasksQueue = () => {
  const tasks = [
    {
      id: 1,
      title: 'Follow up with John Smith',
      description: 'Demo call scheduled for tomorrow at 2 PM',
      priority: 'high',
      dueDate: 'Today',
      type: 'call',
      assignee: 'You'
    },
    {
      id: 2,
      title: 'Review campaign performance',
      description: 'Analyze Q1 email marketing metrics',
      priority: 'medium',
      dueDate: 'Tomorrow',
      type: 'review',
      assignee: 'Marketing Team'
    },
    {
      id: 3,
      title: 'Update contact segments',
      description: 'Reorganize leads based on recent activity',
      priority: 'low',
      dueDate: 'This Week',
      type: 'data',
      assignee: 'Sarah Johnson'
    },
    {
      id: 4,
      title: 'Setup WhatsApp automation',
      description: 'Configure auto-replies for customer support',
      priority: 'medium',
      dueDate: 'Next Week',
      type: 'automation',
      assignee: 'Tech Team'
    }
  ];

  const getPriorityColor = (priority) => {
    const colorMap = {
      high: 'bg-error-50 text-error border-error-200',
      medium: 'bg-warning-50 text-warning border-warning-200',
      low: 'bg-success-50 text-success border-success-200'
    };
    return colorMap[priority] || colorMap.medium;
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      call: 'Phone',
      review: 'BarChart3',
      data: 'Database',
      automation: 'Zap'
    };
    return iconMap[type] || 'CheckSquare';
  };

  const handleTaskClick = (task) => {
    console.log('Open task:', task.title);
  };

  const handleCompleteTask = (taskId, event) => {
    event.stopPropagation();
    console.log('Complete task:', taskId);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Pending Tasks</h3>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-accent-100 text-accent-600 text-xs rounded-full font-medium">
            {tasks.length} pending
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id}
            onClick={() => handleTaskClick(task)}
            className="p-4 border border-border rounded-lg hover:bg-muted transition-colors duration-150 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name={getTypeIcon(task.type)} size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-text-primary text-sm">{task.title}</h4>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-text-secondary text-xs mb-2 line-clamp-1">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted text-xs">{task.dueDate}</span>
                    <span className="text-text-muted text-xs">{task.assignee}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleCompleteTask(task.id, e)}
                className="text-success hover:text-success-600 p-1 h-auto min-h-0"
              >
                <Icon name="Check" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="ghost" size="sm" fullWidth>
          View All Tasks
        </Button>
      </div>
    </div>
  );
};

export default PendingTasksQueue;