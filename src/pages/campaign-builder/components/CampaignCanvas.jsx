import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CampaignCanvas = ({ elements, onElementSelect, selectedElement, onElementUpdate, onElementDelete }) => {
  const [draggedElement, setDraggedElement] = useState(null);
  const [connections, setConnections] = useState([]);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - canvasPosition.x) / zoom;
    const y = (e.clientY - rect.top - canvasPosition.y) / zoom;
    
    if (draggedElement) {
      const newElement = {
        id: Date.now().toString(),
        type: draggedElement.type,
        x,
        y,
        width: 200,
        height: 80,
        config: draggedElement.config || {}
      };
      
      onElementUpdate?.(newElement);
      setDraggedElement(null);
    }
  };

  const handleElementDragStart = (e, element) => {
    setDraggedElement(element);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handlePanStart = (e) => {
    if (e.target === canvasRef.current) {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handlePanMove = (e) => {
    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      setCanvasPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handlePanEnd = () => {
    setIsPanning(false);
  };

  const renderElement = (element) => {
    const isSelected = selectedElement?.id === element.id;
    
    return (
      <div
        key={element.id}
        className={`absolute bg-surface border-2 rounded-lg p-4 cursor-move shadow-sm transition-all duration-200 ${
          isSelected ? 'border-primary shadow-lg' : 'border-border hover:border-border-muted'
        }`}
        style={{
          left: element.x,
          top: element.y,
          width: element.width,
          height: element.height
        }}
        onClick={() => onElementSelect?.(element)}
        draggable
        onDragStart={(e) => handleElementDragStart(e, element)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name={getElementIcon(element.type)} size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-text-primary">{element.type}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onElementDelete?.(element.id);
            }}
            className="text-text-muted hover:text-error"
          >
            <Icon name="X" size={12} />
          </Button>
        </div>
        <p className="text-xs text-text-secondary">{getElementDescription(element.type)}</p>
        
        {/* Connection points */}
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-surface cursor-pointer"></div>
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-surface cursor-pointer"></div>
      </div>
    );
  };

  const getElementIcon = (type) => {
    const icons = {
      'Email': 'Mail',
      'WhatsApp': 'MessageCircle',
      'SMS': 'MessageSquare',
      'Social Media': 'Share2',
      'Form Submit': 'FileText',
      'Date Trigger': 'Calendar',
      'Behavior': 'Activity',
      'Condition': 'GitBranch',
      'Delay': 'Clock',
      'A/B Test': 'Split'
    };
    return icons[type] || 'Circle';
  };

  const getElementDescription = (type) => {
    const descriptions = {
      'Email': 'Send email campaign',
      'WhatsApp': 'Send WhatsApp message',
      'SMS': 'Send SMS message',
      'Social Media': 'Post to social platforms',
      'Form Submit': 'Trigger on form submission',
      'Date Trigger': 'Schedule based trigger',
      'Behavior': 'User behavior trigger',
      'Condition': 'Conditional logic',
      'Delay': 'Add time delay',
      'A/B Test': 'Split test audience'
    };
    return descriptions[type] || 'Campaign element';
  };

  return (
    <div className="relative w-full h-full bg-muted border border-border rounded-lg overflow-hidden">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleZoomOut}
          iconName="ZoomOut"
          className="bg-surface"
        />
        <span className="text-sm font-medium text-text-primary bg-surface px-2 py-1 rounded">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleZoomIn}
          iconName="ZoomIn"
          className="bg-surface"
        />
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseDown={handlePanStart}
        onMouseMove={handlePanMove}
        onMouseUp={handlePanEnd}
        onMouseLeave={handlePanEnd}
        style={{
          transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="pointer-events-none">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-border)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Campaign Elements */}
        {elements?.map(renderElement)}

        {/* Connection Lines */}
        {connections.map((connection, index) => (
          <svg key={index} className="absolute inset-0 pointer-events-none">
            <line
              x1={connection.from.x}
              y1={connection.from.y}
              x2={connection.to.x}
              y2={connection.to.y}
              stroke="var(--color-primary)"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        ))}
      </div>

      {/* Empty State */}
      {(!elements || elements.length === 0) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Zap" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">Start Building Your Campaign</h3>
            <p className="text-text-secondary max-w-md">
              Drag campaign elements from the sidebar to create your marketing flow. 
              Connect elements to build automated sequences.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignCanvas;