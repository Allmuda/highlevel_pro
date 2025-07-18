import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TeamPerformanceChart = () => {
  const performanceData = [
    { month: 'Jan', sales: 45, leads: 120, conversion: 37.5 },
    { month: 'Feb', sales: 52, leads: 135, conversion: 38.5 },
    { month: 'Mar', sales: 48, leads: 128, conversion: 37.5 },
    { month: 'Apr', sales: 61, leads: 145, conversion: 42.1 },
    { month: 'May', sales: 55, leads: 132, conversion: 41.7 },
    { month: 'Jun', sales: 67, leads: 158, conversion: 42.4 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}:</span> {entry.value}
              {entry.dataKey === 'conversion' ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Team Performance</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-text-secondary">Sales</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-text-secondary">Leads</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-sm text-text-secondary">Conversion</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#64748B' }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748B' }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name="Sales"
            />
            <Line 
              type="monotone" 
              dataKey="leads" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="Leads"
            />
            <Line 
              type="monotone" 
              dataKey="conversion" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              name="Conversion Rate"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeamPerformanceChart;