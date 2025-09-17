import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

interface PredictionData {
  delay: {
    minutes: number;
    confidence: number;
    status: 'green' | 'warning' | 'danger';
  };
  conflict: {
    probability: number;
    risk: 'low' | 'medium' | 'high';
    confidence: number;
  };
  throughput: {
    target: number;
    current: number;
    trend: string;
  };
}

interface VisualizationChartsProps {
  predictions: PredictionData;
}

export function VisualizationCharts({ predictions }: VisualizationChartsProps) {
  // Mock historical data for charts
  const delayTrendData = [
    { time: '08:00', delay: 5.2, predicted: 5.5 },
    { time: '09:00', delay: 7.8, predicted: 8.1 },
    { time: '10:00', delay: 12.3, predicted: 11.8 },
    { time: '11:00', delay: 9.1, predicted: 9.5 },
    { time: '12:00', delay: 15.6, predicted: 14.9 },
    { time: '13:00', delay: 11.2, predicted: 12.5 },
    { time: '14:00', delay: predictions.delay.minutes, predicted: predictions.delay.minutes }
  ];

  const conflictBySection = [
    { section: 'A1', conflicts: 12, capacity: 50 },
    { section: 'A2', conflicts: 8, capacity: 40 },
    { section: 'A3', conflicts: 15, capacity: 45 },
    { section: 'B1', conflicts: 6, capacity: 35 },
    { section: 'B2', conflicts: 22, capacity: 60 },
    { section: 'C1', conflicts: 4, capacity: 25 },
    { section: 'C2', conflicts: 9, capacity: 30 }
  ];

  const trainTypeDistribution = [
    { name: 'Express', value: 35, color: '#8884d8' },
    { name: 'Local', value: 28, color: '#82ca9d' },
    { name: 'Freight', value: 20, color: '#ffc658' },
    { name: 'High-Speed', value: 10, color: '#ff7300' },
    { name: 'Suburban', value: 7, color: '#8dd1e1' }
  ];

  const throughputData = [
    { hour: '06', throughput: 65 },
    { hour: '07', throughput: 78 },
    { hour: '08', throughput: 85 },
    { hour: '09', throughput: 82 },
    { hour: '10', throughput: 79 },
    { hour: '11', throughput: 88 },
    { hour: '12', throughput: 91 },
    { hour: '13', throughput: 87 },
    { hour: '14', throughput: predictions.throughput.current }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold flex items-center space-x-2">
        <Activity className="h-5 w-5" />
        <span>Analytics & Visualization</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delay Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Delay Trends (Last 7 Hours)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={delayTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} min`, 
                    name === 'delay' ? 'Actual' : 'Predicted'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="delay" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="delay"
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="predicted"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Throughput Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Hourly Throughput (%)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Throughput']} />
                <Bar 
                  dataKey="throughput" 
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Section-wise Conflicts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Conflicts by Section</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={conflictBySection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="section" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conflicts" fill="#ff7300" name="Conflicts" />
                <Bar dataKey="capacity" fill="#82ca9d" name="Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Train Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <PieChartIcon className="h-4 w-4" />
              <span>Train Type Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={trainTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {trainTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Heatmap Simulation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Network Status Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 h-32">
            {Array.from({ length: 49 }, (_, i) => {
              const intensity = Math.random();
              const getColor = () => {
                if (intensity < 0.3) return 'bg-green-200 dark:bg-green-800';
                if (intensity < 0.6) return 'bg-yellow-200 dark:bg-yellow-800';
                return 'bg-red-200 dark:bg-red-800';
              };
              
              return (
                <div
                  key={i}
                  className={`rounded transition-colors duration-300 ${getColor()}`}
                  title={`Section ${Math.floor(i / 7) + 1}-${(i % 7) + 1}: ${(intensity * 100).toFixed(0)}% load`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>Low Load</span>
            <span>Network Load Intensity</span>
            <span>High Load</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}