'use client';
import DashboardLayout from './components/DashboardLayout';
import ProductionMonitor from './components/ProductionMonitor';

export default function Home() {
  return (
    <DashboardLayout>
      <ProductionMonitor />
    </DashboardLayout>
  );
}
