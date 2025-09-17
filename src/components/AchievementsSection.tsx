
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export const AchievementsSection: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50/30 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-emerald-950/10 border-emerald-200 dark:border-emerald-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-emerald-800 dark:text-emerald-200">Achievements</CardTitle>
        <CardDescription className="text-emerald-700/80 dark:text-emerald-300/80">Highlights from recent operations</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-slate-700 dark:text-slate-300 list-disc pl-6">
          <li>Reduced average network delay by 12% over last quarter</li>
          <li>Conflict incidents lowered by 18% with proactive signal holds</li>
          <li>Throughput improved by 9% on high-density corridors</li>
        </ul>
      </CardContent>
    </Card>
  );
};
