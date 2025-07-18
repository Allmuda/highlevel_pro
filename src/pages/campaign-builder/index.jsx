import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import CampaignSidebar from './components/CampaignSidebar';
import CampaignCanvas from './components/CampaignCanvas';
import CampaignToolbar from './components/CampaignToolbar';
import CampaignTemplates from './components/CampaignTemplates';
import ElementConfigPanel from './components/ElementConfigPanel';

const CampaignBuilder = () => {
  const [campaignName, setCampaignName] = useState('Welcome Email Series');
  const [campaignStatus, setCampaignStatus] = useState('draft');
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showConfigPanel, setShowConfigPanel] = useState(false);

  const handleElementAdd = (element) => {
    setElements(prev => [...prev, element]);
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
    setShowConfigPanel(true);
  };

  const handleElementUpdate = (updatedElement) => {
    if (updatedElement.id) {
      // Update existing element
      setElements(prev => prev.map(el => 
        el.id === updatedElement.id ? updatedElement : el
      ));
    } else {
      // Add new element
      setElements(prev => [...prev, updatedElement]);
    }
  };

  const handleElementDelete = (elementId) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
      setShowConfigPanel(false);
    }
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving campaign:', { campaignName, elements });
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleLaunch = () => {
    if (campaignStatus === 'draft') {
      setCampaignStatus('active');
    }
  };

  const handleTemplateSelect = (template) => {
    // Load template elements
    console.log('Loading template:', template);
    setShowTemplates(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 h-screen flex flex-col">
        {/* Breadcrumb */}
        <div className="px-6 py-4 border-b border-border">
          <Breadcrumb />
        </div>

        {/* Toolbar */}
        <CampaignToolbar
          campaignName={campaignName}
          onCampaignNameChange={setCampaignName}
          onSave={handleSave}
          onPreview={handlePreview}
          onLaunch={handleLaunch}
          isPreviewMode={isPreviewMode}
          campaignStatus={campaignStatus}
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <CampaignSidebar onElementDragStart={handleElementAdd} />
          </div>

          {/* Canvas */}
          <div className="flex-1 relative">
            <CampaignCanvas
              elements={elements}
              onElementSelect={handleElementSelect}
              selectedElement={selectedElement}
              onElementUpdate={handleElementUpdate}
              onElementDelete={handleElementDelete}
            />

            {/* Quick Actions */}
            <div className="absolute bottom-6 left-6 flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowTemplates(true)}
                iconName="Layout"
              >
                Templates
              </Button>
              <Button
                variant="secondary"
                size="sm"
                iconName="RotateCcw"
              >
                Undo
              </Button>
              <Button
                variant="secondary"
                size="sm"
                iconName="RotateCw"
              >
                Redo
              </Button>
            </div>
          </div>

          {/* Configuration Panel */}
          {showConfigPanel && (
            <ElementConfigPanel
              element={selectedElement}
              onElementUpdate={handleElementUpdate}
              onClose={() => setShowConfigPanel(false)}
            />
          )}
        </div>

        {/* Templates Modal */}
        {showTemplates && (
          <CampaignTemplates
            onTemplateSelect={handleTemplateSelect}
            onClose={() => setShowTemplates(false)}
          />
        )}
      </main>
    </div>
  );
};

export default CampaignBuilder;