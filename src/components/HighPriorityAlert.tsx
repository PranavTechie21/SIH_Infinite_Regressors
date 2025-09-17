import { AlertTriangle, Clock, TrendingUp, CheckCircle, RotateCcw, Settings } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HighPriorityAlertProps {
  title: string;
  trainId: string;
  trainType: string;
  action: string;
  delayReduction: number;
  throughputIncrease: number;
  reason: string;
  confidence: number;
  computeTime: number;
  onApply: () => void;
  onSimulate: () => void;
  onOverride: () => void;
}

export function HighPriorityAlert({
  title,
  trainId,
  trainType,
  action,
  delayReduction,
  throughputIncrease,
  reason,
  confidence,
  computeTime,
  onApply,
  onSimulate,
  onOverride
}: HighPriorityAlertProps) {
  return (
    <Alert className="border-red-500 bg-red-50 dark:bg-red-950/20 mb-6">
      <AlertTriangle className="h-5 w-5 text-red-600" />
      <AlertDescription className="mt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">{title}</h3>
            <Badge variant="destructive" className="text-xs">HIGH PRIORITY</Badge>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
            <p className="text-gray-900 dark:text-gray-100 mb-3">
              {action}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  Expected result: average network delay reduced by <span className="font-semibold text-green-600">~{delayReduction} minutes</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm">
                  throughput <span className="font-semibold text-green-600">↑ {throughputIncrease}%</span>
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm text-gray-700 dark:text-gray-300 mb-4">
              <strong>Reason:</strong> {reason}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span>Confidence: <span className="font-semibold">{confidence}%</span></span>
              <span>Compute time: <span className="font-semibold">{computeTime}ms</span></span>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button onClick={onApply} className="bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="h-4 w-4 mr-2" />
                Apply
              </Button>
              <Button onClick={onSimulate} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Simulate Alternative
              </Button>
              <Button onClick={onOverride} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                <Settings className="h-4 w-4 mr-2" />
                Override
              </Button>
            </div>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}