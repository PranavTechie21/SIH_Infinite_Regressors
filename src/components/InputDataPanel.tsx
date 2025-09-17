import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Upload, Play, RotateCcw } from 'lucide-react';

interface TrainData {
  trainType: string;
  sectionId: string;
  priority: number;
  scheduledArrival: string;
  scheduledDeparture: string;
  platformAvailable: boolean;
  signalStatus: string;
  trackCapacity: number;
  hour: number;
}

interface InputDataPanelProps {
  onPredict: (data: TrainData) => void;
}

export function InputDataPanel({ onPredict }: InputDataPanelProps) {
  const [formData, setFormData] = useState<TrainData>({
    trainType: '',
    sectionId: '',
    priority: 2,
    scheduledArrival: '',
    scheduledDeparture: '',
    platformAvailable: true,
    signalStatus: '',
    trackCapacity: 1,
    hour: new Date().getHours()
  });

  const [isLoading, setIsLoading] = useState(false);

  const trainTypes = [
    'Express',
    'Local',
    'Freight',
    'High-Speed',
    'Intercity',
    'Suburban'
  ];

  const sections = [
    'A1 - Central Junction',
    'A2 - North Terminal',
    'A3 - East Branch',
    'B1 - South Junction',
    'B2 - West Terminal',
    'C1 - Freight Yard',
    'C2 - Maintenance'
  ];

  const signalStatuses = [
    { value: 'green', label: 'Green - Clear', color: 'bg-green-500' },
    { value: 'yellow', label: 'Yellow - Caution', color: 'bg-yellow-500' },
    { value: 'red', label: 'Red - Stop', color: 'bg-red-500' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onPredict(formData);
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      trainType: '',
      sectionId: '',
      priority: 2,
      scheduledArrival: '',
      scheduledDeparture: '',
      platformAvailable: true,
      signalStatus: '',
      trackCapacity: 1,
      hour: new Date().getHours()
    });
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return 'Medium';
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-blue-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Input Data Entry Panel</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Train Type */}
            <div className="space-y-2">
              <Label htmlFor="trainType">Train Type</Label>
              <Select 
                value={formData.trainType} 
                onValueChange={(value) => setFormData({...formData, trainType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select train type" />
                </SelectTrigger>
                <SelectContent>
                  {trainTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section ID */}
            <div className="space-y-2">
              <Label htmlFor="sectionId">Section ID</Label>
              <Select 
                value={formData.sectionId} 
                onValueChange={(value) => setFormData({...formData, sectionId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section.split(' - ')[0].toLowerCase()}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Signal Status */}
            <div className="space-y-2">
              <Label htmlFor="signalStatus">Signal Status</Label>
              <Select 
                value={formData.signalStatus} 
                onValueChange={(value) => setFormData({...formData, signalStatus: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select signal status" />
                </SelectTrigger>
                <SelectContent>
                  {signalStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                        <span>{status.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Scheduled Arrival */}
            <div className="space-y-2">
              <Label htmlFor="scheduledArrival">Scheduled Arrival</Label>
              <Input
                id="scheduledArrival"
                type="time"
                value={formData.scheduledArrival}
                onChange={(e) => setFormData({...formData, scheduledArrival: e.target.value})}
                className="w-full"
              />
            </div>

            {/* Scheduled Departure */}
            <div className="space-y-2">
              <Label htmlFor="scheduledDeparture">Scheduled Departure</Label>
              <Input
                id="scheduledDeparture"
                type="time"
                value={formData.scheduledDeparture}
                onChange={(e) => setFormData({...formData, scheduledDeparture: e.target.value})}
                className="w-full"
              />
            </div>

            {/* Track Capacity */}
            <div className="space-y-2">
              <Label htmlFor="trackCapacity">Track Capacity</Label>
              <Input
                id="trackCapacity"
                type="number"
                min="1"
                max="10"
                value={formData.trackCapacity}
                onChange={(e) => {
                  const value = e.target.value === '' ? 1 : parseInt(e.target.value);
                  setFormData({...formData, trackCapacity: isNaN(value) ? 1 : Math.max(1, Math.min(10, value))});
                }}
                className="w-full"
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Priority Level</Label>
                <Badge className={`${getPriorityColor(formData.priority)} text-white`}>
                  {getPriorityLabel(formData.priority)}
                </Badge>
              </div>
              <Slider
                value={[formData.priority]}
                onValueChange={([value]) => setFormData({...formData, priority: value})}
                max={3}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>

            {/* Platform Availability */}
            <div className="space-y-3">
              <Label>Platform Availability</Label>
              <div className="flex items-center space-x-3">
                <Switch
                  checked={formData.platformAvailable}
                  onCheckedChange={(checked) => setFormData({...formData, platformAvailable: checked})}
                />
                <span className="text-sm">
                  {formData.platformAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hour Input */}
            <div className="space-y-2">
              <Label htmlFor="hour">Hour of Day (0-23)</Label>
              <Input
                id="hour"
                type="number"
                min="0"
                max="23"
                value={formData.hour}
                onChange={(e) => {
                  const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                  setFormData({...formData, hour: isNaN(value) ? 0 : Math.max(0, Math.min(23, value))});
                }}
                className="w-full"
              />
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              className="flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Form</span>
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload CSV</span>
              </Button>
              
              <Button
                type="submit"
                disabled={isLoading || !formData.trainType || !formData.sectionId}
                className="flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>{isLoading ? 'Predicting...' : 'Run Prediction'}</span>
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}