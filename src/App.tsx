
import React, { useState, useEffect } from 'react';
import { VisualizationCharts } from './components/VisualizationCharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Train, Activity, AlertTriangle, TrendingUp, Settings, Award, FileText } from 'lucide-react';
import { InputDataPanel } from './components/InputDataPanel';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from './components/ui/menubar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { ThemeToggle } from './components/ThemeToggle';
import { ControllerMessage } from './components/ControllerMessage';
import { PredictionDashboard } from './components/PredictionDashboard';
import { Toaster } from './components/ui/toaster';
import { motion, AnimatePresence } from 'framer-motion';
import { Trends } from './components/Trends';

// Mock data for demonstration
const mockPredictionData = {
  delay: {
    minutes: 12.5,
    confidence: 87,
    status: 'warning' // green, warning, danger
  },
  conflict: {
    probability: 23,
    risk: 'medium', // low, medium, high
    confidence: 92
  },
  throughput: {
    target: 85,
    current: 77,
    trend: '+8.5%'
  }
};

const mockControllerMessage = {
  priority: 'High Priority',
  title: 'Recommendation',
  body: 'Allow Train 0452 (freight) to traverse main line immediately. Hold Train 12047 (express) at Signal S12 for 4 minutes.',
  expectedResult: 'average network delay reduced by ~3.0 minutes; throughput ↑ 8.5%.',
  reason: '0452 current clearance avoids a longer hold for 12047 in the next junction and prevents cascading delays at downstream stations.',
  confidence: 87,
  computeTime: 320,
  timestamp: new Date()
};

// Placeholder components for new sections
const SystemStatus = () => (
  <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200 dark:border-slate-700">
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">System Status</CardTitle>
      <CardDescription className="text-slate-600 dark:text-slate-400">Overview of current system status</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Detailed system status information would be displayed here.</p>
    </CardContent>
  </Card>
);

const Achievements = () => (
  <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200 dark:border-slate-700">
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">Achievements</CardTitle>
      <CardDescription className="text-slate-600 dark:text-slate-400">Record of system and operator achievements</CardDescription>
    </CardHeader>
    <CardContent>
      <p>List of achievements and milestones would be displayed here.</p>
    </CardContent>
  </Card>
);

// Import new section components
import { TrendsSection } from './components/TrendsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ControllerRecordsSection } from './components/ControllerRecordsSection';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const [predictions, setPredictions] = useState(mockPredictionData);
  const [controllerMessage, setControllerMessage] = useState(mockControllerMessage);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight variations in predictions
      setPredictions(prev => ({
        delay: {
          ...prev.delay,
          minutes: Math.max(0, prev.delay.minutes + (Math.random() - 0.5) * 2),
          confidence: Math.max(70, Math.min(99, prev.delay.confidence + (Math.random() - 0.5) * 5))
        },
        conflict: {
          ...prev.conflict,
          probability: Math.max(0, Math.min(100, prev.conflict.probability + (Math.random() - 0.5) * 5)),
          confidence: Math.max(70, Math.min(99, prev.conflict.confidence + (Math.random() - 0.5) * 3))
        },
        throughput: {
          ...prev.throughput,
          current: Math.max(60, Math.min(100, prev.throughput.current + (Math.random() - 0.5) * 3))
        }
      }));
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      window.location.hash = '#/login';
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.hash = '#/login';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (!isLoggedIn) {
    return null; // or a loading spinner
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-all duration-500 scroll-smooth"
    >
      {/* Modern Header */}
      <motion.header 
        variants={itemVariants}
        className="border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-xl shadow-lg">
                  {/* Replace the Train icon with the Ministry of Railways logo */}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Indian_Railways.svg/1200px-Indian_Railways.svg.png"
                    alt="Ministry of Railways Logo"
                    className="h-10 w-auto"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    Railway Control Center
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    AI-Powered Operations Dashboard
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-700">
                Live • {lastUpdated.toLocaleTimeString()}
              </div>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
              <ThemeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
            </div>
          </div>

          {/* Navbar with many options and a menubar */}
          <div className="mt-4 flex items-center justify-between">
            <nav className="flex flex-wrap items-center gap-2">
              <a href="#/" className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition">Home</a>
              <a href="#configuration" className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition">Configuration</a>
              <a href="#analytics" className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition">Analytics</a>
              <a href="#status" className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition">System Status</a>
              <a href="#trends" className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition">Trends</a>
              <a href="#achievements" className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition">Achievements</a>
              <a href="#records" className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition">Controller Records</a>
            </nav>
            <div className="hidden md:flex">
              <Menubar className="bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 backdrop-blur-md">
                <MenubarMenu>
                  <MenubarTrigger>Insights</MenubarTrigger>
                  <MenubarContent align="end">
                    <MenubarItem asChild>
                      <a href="#trends">Trends</a>
                    </MenubarItem>
                    <MenubarItem asChild>
                      <a href="#achievements">Previous Achievements</a>
                    </MenubarItem>
                    <MenubarItem asChild>
                      <a href="#records">Controller Records</a>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem asChild>
                      <a href="#analytics">Open Analytics</a>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          className="container mx-auto px-6 py-8 space-y-8"
        >
          <div id="top"></div>
          {/* Critical Alert Section */}
          <motion.div variants={itemVariants}>
            <ControllerMessage message={controllerMessage} />
          </motion.div>

          {/* Core Dashboard */}
          <motion.div variants={itemVariants}>
            <PredictionDashboard predictions={predictions} />
          </motion.div>

          {/* Secondary Features */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-1">
              <TabsTrigger id="configuration" value="input" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white" onClick={() => setActiveTab('input')}>
                <Settings className="h-4 w-4" />
                <span>Configuration</span>
              </TabsTrigger>
              <TabsTrigger id="analytics" value="charts" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white" onClick={() => setActiveTab('charts')}>
                <Activity className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger id="status" value="status" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white" onClick={() => setActiveTab('status')}>
                <AlertTriangle className="h-4 w-4" />
                <span>System Status</span>
              </TabsTrigger>
              <TabsTrigger id="trends" value="trends" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white" onClick={() => setActiveTab('trends')}>
                <TrendingUp className="h-4 w-4" />
                <span>Trends</span>
              </TabsTrigger>
              <TabsTrigger id="achievements" value="achievements" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white" onClick={() => setActiveTab('achievements')}>
                <Award className="h-4 w-4" />
                <span>Achievements</span>
              </TabsTrigger>
              <TabsTrigger id="records" value="records" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white" onClick={() => setActiveTab('records')}>
                <FileText className="h-4 w-4" />
                <span>Records</span>
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="input" className="mt-8">
                  <InputDataPanel onPredict={(data) => console.log('Predicting with:', data)} />
                </TabsContent>

                <TabsContent value="charts" className="mt-8">
                  <VisualizationCharts predictions={predictions} />
                </TabsContent>

                <TabsContent value="status" className="mt-8">
                  <SystemStatus />
                </TabsContent>

                <TabsContent value="trends" className="mt-8">
                  <Trends />
                </TabsContent>

                <TabsContent value="achievements" className="mt-8">
                  <Achievements />
                </TabsContent>

                <TabsContent value="records" className="mt-8">
                  <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">Controller Records</CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">Historical records of controller actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Controller records and history would be displayed here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
            </Tabs>
          </motion.div>
          
          {/* New Sections */}
          <section id="trends" className="space-y-4">
            <TrendsSection />
          </section>

          <section id="achievements" className="space-y-4">
            <AchievementsSection />
          </section>

          <section id="records" className="space-y-4">
            <ControllerRecordsSection />
          </section>
        </motion.div>
        <Toaster />
      </motion.div>
    );
  }
