import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = ({ className = '', customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/crm-contacts': { label: 'CRM Contacts', icon: 'Users' },
    '/workflow-automation': { label: 'Workflow Automation', icon: 'Zap' },
    '/payment-processing': { label: 'Payment Processing', icon: 'CreditCard' },
    '/sub-account-management': { label: 'Sub-Account Management', icon: 'Settings' },
    '/login': { label: 'Login', icon: 'LogIn' }
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Always start with Dashboard for authenticated routes
    if (location.pathname !== '/login' && location.pathname !== '/') {
      breadcrumbs.push({
        label: 'Dashboard',
        path: '/dashboard',
        icon: 'LayoutDashboard',
        clickable: location.pathname !== '/dashboard'
      });
    }

    // Add current page if not dashboard
    if (location.pathname !== '/dashboard' && location.pathname !== '/login' && location.pathname !== '/') {
      const currentRoute = routeMap[location.pathname];
      if (currentRoute) {
        breadcrumbs.push({
          label: currentRoute.label,
          path: location.pathname,
          icon: currentRoute.icon,
          clickable: false
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render breadcrumbs on login page or if no breadcrumbs
  if (location.pathname === '/login' || breadcrumbs.length === 0) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path && path !== location.pathname) {
      navigate(path);
    }
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <div className="flex items-center space-x-2">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.path || index}>
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-text-muted" />
            )}
            
            <div className="flex items-center space-x-1.5">
              {item.clickable ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center space-x-1.5 text-text-secondary hover:text-primary transition-colors duration-150 px-2 py-1 h-auto min-h-0"
                >
                  {item.icon && <Icon name={item.icon} size={14} />}
                  <span>{item.label}</span>
                </Button>
              ) : (
                <div className="flex items-center space-x-1.5 px-2 py-1">
                  {item.icon && <Icon name={item.icon} size={14} className="text-primary" />}
                  <span className="font-medium text-text-primary">{item.label}</span>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile: Show only current page */}
      <div className="sm:hidden flex items-center space-x-2">
        {breadcrumbs.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-1 text-text-secondary hover:text-primary px-2 py-1 h-auto min-h-0"
          >
            <Icon name="ArrowLeft" size={14} />
            <span>Back</span>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Breadcrumb;