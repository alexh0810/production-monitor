'use client';
import { Bell, Settings, ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-blue-900 text-white">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 mr-3 hover:bg-blue-800 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">Smart Production Monitor</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-blue-800 rounded-full">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-blue-800 rounded-full">
              <Settings className="w-6 h-6" />
            </button>
            <button className="flex items-center gap-2 p-2 hover:bg-blue-800 rounded-lg">
              EN
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
