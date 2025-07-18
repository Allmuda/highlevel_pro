import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentOverviewCards = () => {
  const overviewData = [
    {
      id: 1,
      title: 'Daily Revenue',
      value: 'IDR 15.750.000',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      id: 2,
      title: 'Pending Payments',
      value: 'IDR 3.250.000',
      change: '-8.2%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'warning'
    },
    {
      id: 3,
      title: 'Successful Transactions',
      value: '1,247',
      change: '+15.8%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 4,
      title: 'Failed Attempts',
      value: '23',
      change: '-5.4%',
      changeType: 'negative',
      icon: 'XCircle',
      color: 'error'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: 'bg-success-50 text-success-600',
      warning: 'bg-warning-50 text-warning-600',
      error: 'bg-error-50 text-error-600',
      primary: 'bg-primary-50 text-primary-600'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewData.map((item) => (
        <div key={item.id} className="bg-surface border border-border rounded-lg p-6 card-elevation">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(item.color)}`}>
              <Icon name={item.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              item.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={item.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{item.change}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{item.value}</h3>
            <p className="text-text-secondary text-sm">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentOverviewCards;