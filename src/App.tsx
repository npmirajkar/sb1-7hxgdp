import React from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { Panel } from './components/Panel';
import { DraggableElement } from './components/DraggableElement';
import './App.css';

const App: React.FC = () => {
  const [elements, setElements] = React.useState<{ [key: string]: { id: string; label: string; top: number; left: number; panelId: string } }>({
    element1: { id: 'element1', label: 'Element 1', top: 0, left: 0, panelId: 'panel1' },
    element2: { id: 'element2', label: 'Element 2', top: 0, left: 0, panelId: 'panel1' },
    element3: { id: 'element3', label: 'Element 3', top: 0, left: 0, panelId: 'panel2' },
  });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    console.log(`Started dragging element: ${active.id}`);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && over.id !== active.id) {
      setElements(prevElements => {
        const updatedElements = { ...prevElements };
        const draggedElement = updatedElements[active.id as string];
        const previousPanelId = draggedElement.panelId;
        draggedElement.panelId = over.id as string;
        
        // Calculate new position relative to the panel
        const panelElement = document.getElementById(over.id as string);
        if (panelElement) {
          const panelRect = panelElement.getBoundingClientRect();
          const activeRect = (active.node.current as HTMLElement)?.getBoundingClientRect();
          
          if (activeRect) {
            draggedElement.top = activeRect.top - panelRect.top;
            draggedElement.left = activeRect.left - panelRect.left;
          }
        }

        console.log(`Dropped element: ${active.id}`);
        console.log(`Moved from ${previousPanelId} to ${over.id}`);
        console.log(`New position - Top: ${draggedElement.top}, Left: ${draggedElement.left}`);

        return updatedElements;
      });
    } else {
      console.log(`Element ${active.id} was not moved to a new panel`);
    }
  };

  return (
    <div className="app">
      <h1>Multi-Panel Drag and Drop</h1>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="panels-container">
          <Panel id="panel1" title="Panel 1">
            {Object.values(elements).filter(el => el.panelId === 'panel1').map(element => (
              <DraggableElement key={element.id} {...element} />
            ))}
          </Panel>
          <Panel id="panel2" title="Panel 2">
            {Object.values(elements).filter(el => el.panelId === 'panel2').map(element => (
              <DraggableElement key={element.id} {...element} />
            ))}
          </Panel>
        </div>
      </DndContext>
    </div>
  );
};

export default App;