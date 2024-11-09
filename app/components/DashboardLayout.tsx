'use client';
import { ReactNode, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
