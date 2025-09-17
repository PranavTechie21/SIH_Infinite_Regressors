import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

export function DataVisualization() {
  // Mock data for demonstrations
  const delayTrendData = [
    { time: '00:00', predicted: 2.1, actual: 2.3 },
    { time: '04:00', predicted: 1.8, actual: 1.5 },
    { time: '08:00', predicted: 8.2, actual: 9.1 },
    { time: '12:00', predicted: 12.5, actual: 11.8 },
    { time: '16:00', predicted: 15.3, actual: 16.2 },
    { time: '20:00', predicted: 7.4, actual: 6.9 }
  ];

  const trainTypeDelays = [
    { type: 'Express', avgDelay: 3.2, count: 145 },
    { type: 'Local', avgDelay: 5.8, count: 230 },
    { type: 'Freight', avgDelay: 12.4, count: 89 },
    { type: 'High-Speed', avgDelay: 1.9, count: 67 },
    { type: 'Metro', avgDelay: 2.1, count: 198 }
  ];

  const sectionConflicts = [
    { section: 'Section A1', conflicts: 23, color: '#ef4444' },
    { section: 'Section B2', conflicts: 18, color: '#f97316' },
    { section: 'Section C3', conflicts: 31, color: '#eab308' },
    { section: 'Section D4', conflicts: 12, color: '#22c55e' },
    { section: 'Section E5', conflicts: 27, color: '#3b82f6' }
  ];

  const throughputData = [
    { hour: '6:00', throughput: 78 },
    { hour: '8:00', throughput: 92 },
    { hour: '10:00', throughput: 85 },
    { hour: '12:00', throughput: 88 },
    { hour: '14:00', throughput: 91 },
    { hour: '16:00', throughput: 89 },
    { hour: '18:00', throughput: 94 },
    { hour: '20:00', throughput: 82 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Delay Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Delay Trends: Predicted vs Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={delayTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} name="Predicted" />
              <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={2} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Train Type Delays */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Average Delays by Train Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trainTypeDelays}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="avgDelay" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Section Conflicts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Conflicts by Section
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sectionConflicts}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="conflicts"
                label={({ section, conflicts }) => `${section}: ${conflicts}`}
              >
                {sectionConflicts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Throughput Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Hourly Throughput Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={throughputData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis label={{ value: 'Efficiency %', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="throughput" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}