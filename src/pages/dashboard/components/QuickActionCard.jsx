import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, action, route, color = 'primary' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    } else if (action) {
      action();
    }
  };

  const getColorClasses = () => {
    const colorMap = {
      primary: 'bg-primary-50 text-primary border-primary-200',
      success: 'bg-success-50 text-success border-success-200',
      warning: 'bg-warning-50 text-warning border-warning-200',
      accent: 'bg-accent-50 text-accent border-accent-200'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 card-elevation hover:shadow-lg transition-all duration-150">
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses()}`}>
          <Icon name={icon} size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-text-primary text-sm mb-1">{title}</h4>
          <p className="text-text-secondary text-xs mb-3 line-clamp-2">{description}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClick}
            className="text-primary hover:text-primary-600 p-0 h-auto min-h-0"
          >
            Get Started →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;