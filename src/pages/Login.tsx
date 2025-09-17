import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const CONTROLLER_ID = 'controller123';
const PASSWORD_PICTURE = [1, 2, 3, 4];

export default function Login() {
  const [controllerId, setControllerId] = useState('');
  const [picturePwd, setPicturePwd] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePictureClick = (index: number) => {
    setPicturePwd(prev => [...prev, index]);
  };

  const resetPicturePassword = () => {
    setPicturePwd([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (controllerId !== CONTROLLER_ID) {
      setError('Invalid Controller ID');
      setIsLoading(false);
      return;
    }
    if (JSON.stringify(picturePwd) !== JSON.stringify(PASSWORD_PICTURE)) {
      setError('Invalid Security Key');
      setIsLoading(false);
      return;
    }

    // Login successful
    localStorage.setItem('isLoggedIn', 'true');
    window.location.hash = '#/';
  };

  useEffect(() => {
    // Reset error when input changes
    setError(null);
  }, [controllerId, picturePwd]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
    >
      <Card className="w-full max-w-md bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center">
            <Lock className="mr-2" /> Controller Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="controllerId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Controller ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="controllerId"
                  type="text"
                  value={controllerId}
                  onChange={(e) => setControllerId(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your Controller ID"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Security Key
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <Button
                    key={num}
                    type="button"
                    onClick={() => handlePictureClick(num)}
                    className="h-16 text-2xl font-bold"
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="flex-1">
                  {picturePwd.map((_, index) => (
                    <span key={index} className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                  ))}
                </div>
                <Button type="button" onClick={resetPicturePassword} variant="outline" size="sm">
                  Reset
                </Button>
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}