
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export const ControllerRecordsSection: React.FC = () => {
  return (
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">Controller Records</CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">Top decisions and notable actions</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Controller records and history would be displayed here.</p>
      </CardContent>
    </Card>
  );
};
