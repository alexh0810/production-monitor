'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { ProductionLine } from '../types';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [selectedLine, setSelectedLine] = useState<string>('line1');

  const productionLines: ProductionLine[] = [
    {
      id: 'line1',
      name: 'Line 1: Chicken Nuggets',
      targetWeight: 250,
      tolerance: 5,
    },
    {
      id: 'line2',
      name: 'Line 2: Chicken Patties',
      targetWeight: 180,
      tolerance: 4,
    },
    {
      id: 'line3',
      name: 'Line 3: Chicken Wings',
      targetWeight: 300,
      tolerance: 6,
    },
  ];

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden
          ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setOpen(false)}
      />

      <div
        className={`
          fixed inset-y-0 left-0 w-64 bg-white transform transition-transform lg:relative lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 lg:hidden">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-lg font-semibold mb-4">Production Lines</h2>
            <nav className="space-y-2">
              {productionLines.map((line) => (
                <button
                  key={line.id}
                  className={`w-full p-3 text-left rounded-lg transition-colors
                    ${
                      selectedLine === line.id
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-100'
                    }
                  `}
                  onClick={() => setSelectedLine(line.id)}
                >
                  {line.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
