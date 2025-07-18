import React, { useState, useCallback } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import NodeLibrary from './components/NodeLibrary';
import WorkflowCanvas from './components/WorkflowCanvas';
import NodeConfigPanel from './components/NodeConfigPanel';
import WorkflowToolbar from './components/WorkflowToolbar';
import WorkflowTemplates from './components/WorkflowTemplates';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const WorkflowAutomation = () => {
  const [workflowName, setWorkflowName] = useState('New Workflow');
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfigPanel, setShowConfigPanel] = useState(false);

  const handleNodeAdd = useCallback((node) => {
    setNodes(prev => [...prev, node]);
    setHasUnsavedChanges(true);
  }, []);

  const handleNodeSelect = useCallback((node) => {
    setSelectedNode(node);
    setShowConfigPanel(true);
  }, []);

  const handleNodeUpdate = useCallback((nodeId, updatedNode) => {
    setNodes(prev => prev.map(node => node.id === nodeId ? updatedNode : node));
    setHasUnsavedChanges(true);
  }, []);

  const handleNodeDelete = useCallback((nodeId) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setConnections(prev => prev.filter(conn => conn.from !== nodeId && conn.to !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
      setShowConfigPanel(false);
    }
    setHasUnsavedChanges(true);
  }, [selectedNode]);

  const handleConnectionAdd = useCallback((connection) => {
    setConnections(prev => [...prev, connection]);
    setHasUnsavedChanges(true);
  }, []);

  const handleConnectionDelete = useCallback((connectionId) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
    setHasUnsavedChanges(true);
  }, []);

  const handleSave = useCallback(() => {
    console.log('Saving workflow:', { workflowName, nodes, connections });
    setHasUnsavedChanges(false);
  }, [workflowName, nodes, connections]);

  const handleTest = useCallback(() => {
    setIsTesting(true);
    console.log('Testing workflow...');
    setTimeout(() => {
      setIsTesting(false);
      console.log('Test completed');
    }, 3000);
  }, []);

  const handlePublish = useCallback(() => {
    if (isPublished) {
      setIsPublished(false);
      console.log('Workflow unpublished');
    } else {
      setIsPublished(true);
      console.log('Workflow published');
    }
  }, [isPublished]);

  const handleVersionHistory = useCallback(() => {
    console.log('Opening version history');
  }, []);

  const handleTemplateSelect = useCallback((template) => {
    console.log('Selected template:', template);
    setWorkflowName(template.name);
    // Here you would load the template's nodes and connections
    setHasUnsavedChanges(true);
  }, []);

  const handleWorkflowNameChange = useCallback((newName) => {
    setWorkflowName(newName);
    setHasUnsavedChanges(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="px-6 py-4 border-b border-border bg-surface">
          <Breadcrumb />
        </div>

        {/* Workflow Toolbar */}
        <WorkflowToolbar
          workflowName={workflowName}
          onWorkflowNameChange={handleWorkflowNameChange}
          onSave={handleSave}
          onTest={handleTest}
          onPublish={handlePublish}
          onVersionHistory={handleVersionHistory}
          isPublished={isPublished}
          isTesting={isTesting}
          hasUnsavedChanges={hasUnsavedChanges}
        />

        {/* Main Content */}
        <div className="flex h-[calc(100vh-200px)]">
          {/* Node Library Sidebar */}
          <NodeLibrary 
            className="w-80 flex-shrink-0"
            onDragStart={() => {}}
          />

          {/* Canvas Area */}
          <div className="flex-1 relative">
            <WorkflowCanvas
              nodes={nodes}
              connections={connections}
              onNodeAdd={handleNodeAdd}
              onNodeSelect={handleNodeSelect}
              onNodeDelete={handleNodeDelete}
              onConnectionAdd={handleConnectionAdd}
              onConnectionDelete={handleConnectionDelete}
              selectedNode={selectedNode}
              className="h-full"
            />

            {/* Quick Actions */}
            <div className="absolute bottom-6 left-6 flex items-center space-x-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowTemplates(true)}
                iconName="Template"
              >
                Use Template
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setNodes([]);
                  setConnections([]);
                  setSelectedNode(null);
                  setShowConfigPanel(false);
                  setHasUnsavedChanges(true);
                }}
                iconName="Trash2"
              >
                Clear Canvas
              </Button>
            </div>

            {/* Workflow Stats */}
            {nodes.length > 0 && (
              <div className="absolute top-6 left-6 bg-surface border border-border rounded-lg p-3 shadow-md">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Layers" size={14} className="text-text-muted" />
                    <span className="text-text-muted">Nodes:</span>
                    <span className="font-medium text-text-primary">{nodes.length}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Link" size={14} className="text-text-muted" />
                    <span className="text-text-muted">Connections:</span>
                    <span className="font-medium text-text-primary">{connections.length}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Node Configuration Panel */}
          {showConfigPanel && (
            <NodeConfigPanel
              node={selectedNode}
              onNodeUpdate={handleNodeUpdate}
              onClose={() => {
                setShowConfigPanel(false);
                setSelectedNode(null);
              }}
              className="w-96 flex-shrink-0"
            />
          )}
        </div>

        {/* Templates Modal */}
        {showTemplates && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-surface rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <WorkflowTemplates
                onTemplateSelect={handleTemplateSelect}
                onClose={() => setShowTemplates(false)}
                className="h-[80vh]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowAutomation;