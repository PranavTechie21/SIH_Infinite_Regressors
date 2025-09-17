import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AlertTriangle, Clock, TrendingUp, CheckCircle2, RotateCcw, X } from 'lucide-react';

interface ControllerMessageProps {
  message: {
    priority: string;
    title: string;
    body: string;
    expectedResult: string;
    reason: string;
    confidence: number;
    computeTime: number;
    timestamp: Date;
  };
}

export function ControllerMessage({ message }: ControllerMessageProps) {
  const getPriorityStyles = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high priority':
        return {
          badge: 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg border-0',
          card: 'border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 via-white to-red-50/30 dark:from-red-950/30 dark:via-slate-900 dark:to-red-950/10',
          icon: 'text-red-500'
        };
      case 'medium priority':
        return {
          badge: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg border-0',
          card: 'border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 dark:from-amber-950/30 dark:via-slate-900 dark:to-amber-950/10',
          icon: 'text-amber-500'
        };
      default:
        return {
          badge: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border-0',
          card: 'border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 dark:from-blue-950/30 dark:via-slate-900 dark:to-blue-950/10',
          icon: 'text-blue-500'
        };
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-emerald-600 dark:text-emerald-400';
    if (confidence >= 70) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const styles = getPriorityStyles(message.priority);

  return (
    <Card className={`${styles.card} shadow-xl border-slate-200 dark:border-slate-700 overflow-hidden`}>
      <CardHeader className="pb-6 bg-gradient-to-r from-transparent to-white/50 dark:to-slate-800/50">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <AlertTriangle className={`h-6 w-6 ${styles.icon}`} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Badge className={styles.badge}>
                  {message.priority}
                </Badge>
                <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80 border-slate-300 dark:border-slate-600">
                  AI Recommendation
                </Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Generated at {message.timestamp.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Recommendation - Enhanced */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-800 dark:to-blue-950/30 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
            🚂 Control Action Required
          </h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            {message.body}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expected Result */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50/50 dark:from-emerald-950/20 dark:to-green-950/10 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Expected Impact</h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">{message.expectedResult}</p>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/10 p-5 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <div className="h-5 w-5 bg-blue-600 dark:bg-blue-400 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Analysis</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">{message.reason}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Enhanced Metrics and Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 mb-1">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">AI Confidence</span>
              </div>
              <div className={`text-2xl font-bold ${getConfidenceColor(message.confidence)}`}>
                {message.confidence}%
              </div>
            </div>
            
            <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="h-3 w-3 text-slate-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Compute Time</span>
              </div>
              <div className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                {message.computeTime}ms
              </div>
            </div>
          </div>

          {/* Action Buttons - Enhanced */}
          <div className="flex items-center space-x-3">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg border-0 px-6"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Execute Command
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-600 px-6">
              <RotateCcw className="h-5 w-5 mr-2" />
              Alternative
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-600 px-6">
              <X className="h-5 w-5 mr-2" />
              Override
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}