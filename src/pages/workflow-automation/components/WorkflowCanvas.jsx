import React, { useState, useRef, useCallback, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkflowCanvas = ({ 
  nodes, 
  connections, 
  onNodeAdd, 
  onNodeSelect, 
  onNodeDelete, 
  onConnectionAdd, 
  onConnectionDelete,
  selectedNode,
  className = '' 
}) => {
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef(null);
  const svgRef = useRef(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - canvasOffset.x) / zoom;
    const y = (e.clientY - rect.top - canvasOffset.y) / zoom;
    
    try {
      const dragData = JSON.parse(e.dataTransfer.getData('application/json'));
      if (dragData.type === 'node') {
        const newNode = {
          id: `${dragData.nodeId}-${Date.now()}`,
          type: dragData.nodeType,
          nodeId: dragData.nodeId,
          label: dragData.label,
          icon: dragData.icon,
          description: dragData.description,
          position: { x, y },
          config: {},
          inputs: dragData.nodeType === 'triggers' ? [] : ['input'],
          outputs: ['output']
        };
        onNodeAdd(newNode);
      }
    } catch (error) {
      console.error('Error parsing drop data:', error);
    }
  }, [canvasOffset, zoom, onNodeAdd]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (e.target === canvasRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y });
    }
  }, [canvasOffset]);

  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    if (isDragging) {
      setCanvasOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (isConnecting) {
      setIsConnecting(false);
      setConnectionStart(null);
    }
  }, [isConnecting]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.1, Math.min(3, prev * delta)));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      return () => canvas.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  const handleNodeClick = (node) => {
    onNodeSelect(node);
  };

  const handleOutputClick = (nodeId, outputIndex) => {
    if (isConnecting && connectionStart) {
      // Complete connection
      const connection = {
        id: `${connectionStart.nodeId}-${nodeId}-${Date.now()}`,
        from: connectionStart.nodeId,
        to: nodeId,
        fromOutput: connectionStart.outputIndex,
        toInput: 0
      };
      onConnectionAdd(connection);
      setIsConnecting(false);
      setConnectionStart(null);
    } else {
      // Start connection
      setIsConnecting(true);
      setConnectionStart({ nodeId, outputIndex });
    }
  };

  const handleInputClick = (nodeId, inputIndex) => {
    if (isConnecting && connectionStart) {
      const connection = {
        id: `${connectionStart.nodeId}-${nodeId}-${Date.now()}`,
        from: connectionStart.nodeId,
        to: nodeId,
        fromOutput: connectionStart.outputIndex,
        toInput: inputIndex
      };
      onConnectionAdd(connection);
      setIsConnecting(false);
      setConnectionStart(null);
    }
  };

  const getNodeColor = (type) => {
    const colors = {
      triggers: 'border-success bg-success-50',
      actions: 'border-primary bg-primary-50',
      logic: 'border-accent bg-accent-50',
      integrations: 'border-secondary bg-secondary-50'
    };
    return colors[type] || 'border-border bg-surface';
  };

  const renderConnections = () => {
    return connections.map((connection) => {
      const fromNode = nodes.find(n => n.id === connection.from);
      const toNode = nodes.find(n => n.id === connection.to);
      
      if (!fromNode || !toNode) return null;

      const fromX = (fromNode.position.x + 120) * zoom + canvasOffset.x;
      const fromY = (fromNode.position.y + 40) * zoom + canvasOffset.y;
      const toX = toNode.position.x * zoom + canvasOffset.x;
      const toY = (toNode.position.y + 40) * zoom + canvasOffset.y;

      const midX = (fromX + toX) / 2;

      return (
        <g key={connection.id}>
          <path
            d={`M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`}
            stroke="var(--color-primary)"
            strokeWidth="2"
            fill="none"
            className="hover:stroke-primary-600 cursor-pointer"
            onClick={() => onConnectionDelete(connection.id)}
          />
          <circle
            cx={toX}
            cy={toY}
            r="4"
            fill="var(--color-primary)"
          />
        </g>
      );
    });
  };

  const renderTempConnection = () => {
    if (!isConnecting || !connectionStart) return null;

    const fromNode = nodes.find(n => n.id === connectionStart.nodeId);
    if (!fromNode) return null;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const fromX = (fromNode.position.x + 120) * zoom + canvasOffset.x;
    const fromY = (fromNode.position.y + 40) * zoom + canvasOffset.y;
    const toX = mousePosition.x - rect.left;
    const toY = mousePosition.y - rect.top;

    const midX = (fromX + toX) / 2;

    return (
      <path
        d={`M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`}
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeDasharray="5,5"
        fill="none"
        opacity="0.6"
      />
    );
  };

  return (
    <div className={`relative bg-muted overflow-hidden ${className}`}>
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <div className="bg-surface border border-border rounded-lg p-2 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(prev => Math.max(0.1, prev * 0.9))}
            iconName="Minus"
          />
          <span className="text-sm font-medium text-text-primary min-w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(prev => Math.min(3, prev * 1.1))}
            iconName="Plus"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setZoom(1);
            setCanvasOffset({ x: 0, y: 0 });
          }}
          iconName="RotateCcw"
        >
          Reset View
        </Button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          backgroundImage: `radial-gradient(circle, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`
        }}
      >
        {/* SVG for connections */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          {renderConnections()}
          {renderTempConnection()}
        </svg>

        {/* Nodes */}
        <div className="relative" style={{ zIndex: 2 }}>
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute bg-surface border-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer ${
                getNodeColor(node.type)
              } ${selectedNode?.id === node.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              style={{
                left: node.position.x * zoom + canvasOffset.x,
                top: node.position.y * zoom + canvasOffset.y,
                width: 120 * zoom,
                minHeight: 80 * zoom,
                transform: `scale(${zoom})`,
                transformOrigin: 'top left'
              }}
              onClick={() => handleNodeClick(node)}
            >
              <div className="p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={node.icon} size={16} />
                  <span className="font-medium text-sm text-text-primary truncate">{node.label}</span>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2">{node.description}</p>
              </div>

              {/* Input connection point */}
              {node.inputs.length > 0 && (
                <div
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-surface border-2 border-primary rounded-full cursor-pointer hover:bg-primary-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputClick(node.id, 0);
                  }}
                />
              )}

              {/* Output connection point */}
              {node.outputs.length > 0 && (
                <div
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-primary border-2 border-primary rounded-full cursor-pointer hover:bg-primary-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOutputClick(node.id, 0);
                  }}
                />
              )}

              {/* Delete button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onNodeDelete(node.id);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-error text-white hover:bg-error-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                iconName="X"
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Icon name="Workflow" size={48} className="mx-auto text-text-muted mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">Start Building Your Workflow</h3>
              <p className="text-text-secondary mb-4">Drag nodes from the library to create your automation</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-text-muted">
                <div className="flex items-center space-x-1">
                  <Icon name="MousePointer" size={16} />
                  <span>Drag to add nodes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Link" size={16} />
                  <span>Click outputs to connect</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowCanvas;