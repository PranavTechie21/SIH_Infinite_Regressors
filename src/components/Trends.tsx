
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockTrendData = [
  { date: '2023-01', efficiency: 75, punctuality: 82 },
  { date: '2023-02', efficiency: 78, punctuality: 85 },
  { date: '2023-03', efficiency: 80, punctuality: 87 },
  { date: '2023-04', efficiency: 79, punctuality: 86 },
  { date: '2023-05', efficiency: 82, punctuality: 88 },
  { date: '2023-06', efficiency: 85, punctuality: 90 },
];

export function Trends() {
  return (
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">System Trends</CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">Analysis of system performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="efficiency" stroke="#8884d8" name="Efficiency" />
              <Line type="monotone" dataKey="punctuality" stroke="#82ca9d" name="Punctuality" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
