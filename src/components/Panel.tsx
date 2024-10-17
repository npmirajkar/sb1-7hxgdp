import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface PanelProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ id, title, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="panel">
      <h2>{title}</h2>
      <div className="panel-content">
        {children}
      </div>
    </div>
  );
};