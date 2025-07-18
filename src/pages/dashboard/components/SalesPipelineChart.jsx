import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SalesPipelineChart = () => {
  const pipelineData = [
    { stage: 'Leads', value: 150, color: '#3B82F6' },
    { stage: 'Qualified', value: 89, color: '#10B981' },
    { stage: 'Proposal', value: 45, color: '#F59E0B' },
    { stage: 'Negotiation', value: 23, color: '#EF4444' },
    { stage: 'Closed Won', value: 12, color: '#8B5CF6' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-text-primary">{label}</p>
          <p className="text-sm text-text-secondary">
            <span className="font-medium">{payload[0].value}</span> contacts
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 card-elevation">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Sales Pipeline</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-sm text-text-secondary">This Month</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pipelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="stage" 
              tick={{ fontSize: 12, fill: '#64748B' }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748B' }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {pipelineData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-5 gap-2">
        {pipelineData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs text-text-secondary">{item.stage}</span>
            </div>
            <p className="text-sm font-medium text-text-primary">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesPipelineChart;