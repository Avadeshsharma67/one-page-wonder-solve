
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon,
  Download,
  Upload,
  Trash2,
  User,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  Heart,
  Calendar,
  Target,
  Smile
} from 'lucide-react';
import { useCycleTracking } from '../hooks/useCycleTracking';
import { useMoodTracking } from '../hooks/useMoodTracking';
import { useGoalTracking } from '../hooks/useGoalTracking';
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  
  const { cycleEntries, cycleLength, updateCycleLength } = useCycleTracking();
  const { moodEntries } = useMoodTracking();
  const { goals } = useGoalTracking();
  const { toast } = useToast();

  const handleExportData = () => {
    const data = {
      cycleEntries,
      moodEntries,
      goals,
      cycleLength,
      userName,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindspace-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    toast({
      title: "Data Exported",
      description: "Your MindSpace data has been downloaded successfully.",
    });
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        // Here you would implement the import logic
        toast({
          title: "Data Import",
          description: "Data import feature coming soon!",
        });
      } catch (error) {
        toast({
          title: "Import Error",
          description: "Failed to import data. Please check the file format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleSaveName = () => {
    localStorage.setItem('userName', userName);
    toast({
      title: "Name Saved",
      description: "Your name has been updated successfully.",
    });
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all your data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const stats = {
    totalMoodEntries: moodEntries.length,
    totalCycleEntries: cycleEntries.length,
    totalGoals: goals.length,
    completedGoals: goals.filter(g => g.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
            <SettingsIcon className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <p className="text-gray-600">Customize your MindSpace experience</p>
        </div>

        {/* Profile Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <User className="w-5 h-5 text-blue-600" />
              Profile
            </CardTitle>
            <CardDescription>Personalize your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Your Name</Label>
              <div className="flex gap-2">
                <Input
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="flex-1"
                />
                <Button onClick={handleSaveName} size="sm">
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-600" />
              Data & Privacy
            </CardTitle>
            <CardDescription>Manage your personal data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Data Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-2xl">
                <Smile className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-600">{stats.totalMoodEntries}</div>
                <div className="text-xs text-blue-700">Mood Entries</div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-2xl">
                <Calendar className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-pink-600">{stats.totalCycleEntries}</div>
                <div className="text-xs text-pink-700">Cycle Entries</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-2xl">
                <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-green-600">{stats.totalGoals}</div>
                <div className="text-xs text-green-700">Total Goals</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-2xl">
                <Heart className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-purple-600">{stats.completedGoals}</div>
                <div className="text-xs text-purple-700">Completed</div>
              </div>
            </div>

            {/* Data Export/Import */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleExportData} className="flex-1 bg-blue-500 hover:bg-blue-600">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <div className="flex-1">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                    id="import-data"
                  />
                  <Button
                    onClick={() => document.getElementById('import-data')?.click()}
                    variant="outline"
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={clearAllData}
                variant="destructive"
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cycle Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-pink-600" />
              Cycle Tracking
            </CardTitle>
            <CardDescription>Customize your cycle tracking preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="cycleLength"
                  type="number"
                  min="21"
                  max="40"
                  value={cycleLength}
                  onChange={(e) => updateCycleLength(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-gray-600">days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-purple-600" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Notifications</Label>
                <p className="text-sm text-gray-600">Receive daily wellness reminders</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between opacity-50">
              <div className="space-y-1">
                <Label className="text-base">Dark Mode</Label>
                <p className="text-sm text-gray-600">Coming soon</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              About MindSpace
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <Badge variant="secondary" className="text-sm">
                Version 1.0.0
              </Badge>
              <p className="text-sm text-gray-600">
                MindSpace is your personal mental wellness companion, designed to help you track your mood, 
                manage goals, and maintain your mental health journey.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
