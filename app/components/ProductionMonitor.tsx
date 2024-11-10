// components/ProductionMonitor.tsx
'use client';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { WeightData, Alert as AlertType, ProductionStatus } from '../types';
import { generateMockData } from '@/lib/utils';

export default function ProductionMonitor() {
  const [currentWeight, setCurrentWeight] = useState<number>(250);
  const [weightHistory, setWeightHistory] = useState<WeightData[]>([]);
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { weight, timestamp } = generateMockData();
      setCurrentWeight(parseFloat(weight.toFixed(1)));

      setWeightHistory((prev) => {
        const newHistory = [
          ...prev,
          {
            time: new Date(timestamp).toLocaleTimeString(),
            weight: weight,
          },
        ];
        return newHistory.slice(-20);
      });

      // Generate random alerts
      if (Math.random() < 0.1) {
        const newAlert: AlertType = {
          id: Date.now(),
          type: Math.random() > 0.5 ? 'warning' : 'error',
          message:
            Math.random() > 0.5
              ? 'Weight deviation detected'
              : 'Calibration check required',
          time: new Date().toLocaleTimeString(),
        };
        setAlerts((prev) => [newAlert, ...prev].slice(0, 5));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getWeightStatus = (weight: number): ProductionStatus => {
    if (weight < 245) return { status: 'error', message: 'Below Range' };
    if (weight > 255) return { status: 'error', message: 'Above Range' };
    if (weight < 247 || weight > 253)
      return { status: 'warning', message: 'Near Threshold' };
    return { status: 'success', message: 'Within Range' };
  };

  const weightStatus = getWeightStatus(currentWeight);

  return (
    <div className="space-y-6">
      {/* Current Weight Status */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{currentWeight}g</h2>
            <p className="text-gray-500">Current Weight</p>
          </div>
          <div
            className={`
            px-4 py-2 rounded-full font-semibold
            ${
              weightStatus.status === 'success'
                ? 'bg-green-100 text-green-800'
                : ''
            }
            ${
              weightStatus.status === 'warning'
                ? 'bg-yellow-100 text-yellow-800'
                : ''
            }
            ${weightStatus.status === 'error' ? 'bg-red-100 text-red-800' : ''}
          `}
          >
            {weightStatus.message}
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <LineChart width={800} height={200} data={weightHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[240, 260]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#3182ce"
              strokeWidth={2}
            />
          </LineChart>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              variant={alert.type === 'error' ? 'destructive' : 'default'}
            >
              {alert.type === 'error' ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
              <AlertTitle>
                {alert.type === 'error' ? 'Error' : 'Warning'}
              </AlertTitle>
              <AlertDescription>
                {alert.message} - {alert.time}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors">
          Calibrate Scale
        </button>
        <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
          Download Report
        </button>
        <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors">
          Request Maintenance
        </button>
      </div>
    </div>
  );
}
