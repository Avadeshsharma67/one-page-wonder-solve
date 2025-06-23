
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  Heart, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Sparkles,
  ArrowRight,
  Star,
  Timer,
  Target,
  Smile,
  Sun,
  Moon,
  Activity,
  Award,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  X,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMoodTracking } from '../hooks/useMoodTracking';
import { useGoalTracking } from '../hooks/useGoalTracking';
import { useCycleTracking } from '../hooks/useCycleTracking';
import MoodChart from '../components/MoodChart';
import CycleTracker from '../components/CycleTracker';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newGoalText, setNewGoalText] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);
  
  const { addMoodEntry, getTodaysMood } = useMoodTracking();
  const { goals, toggleGoal, getGoalStats, addGoal, removeGoal } = useGoalTracking();
  const { toast } = useToast();
  
  const todaysMood = getTodaysMood();
  const goalStats = getGoalStats();
  const completedGoals = goals.filter(goal => goal.completed).length;
  const progressPercentage = (completedGoals / goals.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: "Good Morning", icon: Sun, color: "text-yellow-600" };
    if (hour < 17) return { text: "Good Afternoon", icon: Sun, color: "text-orange-600" };
    return { text: "Good Evening", icon: Moon, color: "text-purple-600" };
  };

  const greeting = getGreeting();

  const moodOptions = [
    { emoji: '😢', label: 'Struggling', value: 1, color: 'bg-red-100 border-red-300 hover:bg-red-200' },
    { emoji: '😟', label: 'Down', value: 2, color: 'bg-orange-100 border-orange-300 hover:bg-orange-200' },
    { emoji: '😐', label: 'Okay', value: 3, color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200' },
    { emoji: '😊', label: 'Good', value: 4, color: 'bg-green-100 border-green-300 hover:bg-green-200' },
    { emoji: '😄', label: 'Great', value: 5, color: 'bg-blue-100 border-blue-300 hover:bg-blue-200' }
  ];

  const quickActions = [
    {
      title: "Journal Entry",
      description: "Reflect on your day",
      icon: BookOpen,
      link: "/journal",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      title: "Find Resources",
      description: "Get support and tools",
      icon: Heart,
      link: "/resources",
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      title: "View Progress",
      description: "See your wellness journey",
      icon: TrendingUp,
      link: "#progress",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    }
  ];

  const handleMoodSelect = (moodValue: number) => {
    addMoodEntry(moodValue);
    toast({
      title: "Mood Recorded",
      description: `Your mood (${moodValue}/5) has been saved for today.`,
    });
  };

  const handleAddGoal = () => {
    if (newGoalText.trim()) {
      addGoal(newGoalText.trim());
      setNewGoalText('');
      setShowAddGoal(false);
      toast({
        title: "Goal Added",
        description: "New wellness goal has been added to your list.",
      });
    }
  };

  const handleToggleGoal = (goalId: number) => {
    toggleGoal(goalId);
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      toast({
        title: goal.completed ? "Goal Unchecked" : "Goal Completed!",
        description: goal.completed 
          ? "Goal unmarked for today." 
          : `Great job on "${goal.text}"! Keep up the streak!`,
      });
    }
  };

  const handleRemoveGoal = (goalId: number) => {
    removeGoal(goalId);
    toast({
      title: "Goal Removed",
      description: "Goal has been removed from your list.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-indigo-100/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MindSpace
                </h1>
                <p className="text-sm text-gray-600 font-medium">Your mental wellness companion</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/resources" className="group px-4 py-2.5 text-sm bg-gradient-to-r from-green-500/10 to-teal-500/10 text-green-700 rounded-xl hover:from-green-500/20 hover:to-teal-500/20 transition-all duration-300 border border-green-200/50 hover:border-green-300/50 hover:scale-105">
                <span className="font-medium">Resources</span>
              </Link>
              <Link to="/journal" className="group px-4 py-2.5 text-sm bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 rounded-xl hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 border border-purple-200/50 hover:border-purple-300/50 hover:scale-105">
                <span className="font-medium">Journal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Personalized Greeting */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <greeting.icon className={`w-8 h-8 ${greeting.color}`} />
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {greeting.text}!
                  </h2>
                </div>
                <p className="text-lg text-gray-600">
                  It's {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-sm text-gray-500">
                  {todaysMood ? 
                    `Your mood today: ${todaysMood.mood}/5 - How are you feeling now?` :
                    "How are you feeling today? Your wellbeing matters."
                  }
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className="text-sm text-gray-500">
                    Current time
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Mood Check */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl">
                  <Heart className="w-5 h-5 text-pink-600" />
                </div>
                Quick Mood Check
              </CardTitle>
              <CardDescription>
                How are you feeling right now? Track your emotional journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-3">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => handleMoodSelect(mood.value)}
                    className={`group p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      todaysMood?.mood === mood.value 
                        ? `${mood.color} shadow-lg ring-2 ring-offset-2 ring-purple-400` 
                        : `${mood.color} shadow-sm hover:shadow-md`
                    }`}
                  >
                    <div className="text-2xl sm:text-3xl mb-2 transition-transform group-hover:scale-110">
                      {mood.emoji}
                    </div>
                    <div className="text-xs font-semibold text-gray-700">
                      {mood.label}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mood Chart */}
          <MoodChart />
        </div>

        {/* Cycle Tracker */}
        <CycleTracker />

        {/* Enhanced Daily Goals & Progress */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  Daily Wellness Goals
                </CardTitle>
                <CardDescription>
                  Track your daily mental health practices
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{completedGoals}/{goals.length}</div>
                <div className="text-xs text-gray-500">completed</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Today's Progress</span>
                <span className="font-semibold text-blue-600">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-gray-100" />
            </div>
            
            <div className="grid gap-3">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className={`group p-4 rounded-2xl border-2 transition-all duration-300 ${
                    goal.completed 
                      ? 'bg-green-50 border-green-200 shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div 
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                          goal.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300 group-hover:border-blue-400'
                        }`}
                        onClick={() => handleToggleGoal(goal.id)}
                      >
                        {goal.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <span className={`font-medium ${goal.completed ? 'text-green-800 line-through' : 'text-gray-800'}`}>
                          {goal.text}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <Activity className="w-3 h-3 mr-1" />
                            {goal.streak} day streak
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {goal.totalCompletions} total
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveGoal(goal.id)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {/* Add Goal Section */}
              {showAddGoal ? (
                <div className="p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="flex gap-2">
                    <Input
                      value={newGoalText}
                      onChange={(e) => setNewGoalText(e.target.value)}
                      placeholder="Enter a new wellness goal..."
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                    />
                    <Button onClick={handleAddGoal} size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={() => {
                        setShowAddGoal(false);
                        setNewGoalText('');
                      }} 
                      variant="outline" 
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAddGoal(true)}
                  variant="outline"
                  className="w-full border-dashed border-2 py-3 text-gray-600 hover:text-blue-600 hover:border-blue-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Goal
                </Button>
              )}
            </div>
            
            {/* Goal Statistics */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-2xl">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{goalStats.currentStreak}</div>
                <div className="text-xs text-blue-700">Current Streak</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{goalStats.longestStreak}</div>
                <div className="text-xs text-green-700">Best Streak</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">{goals.reduce((sum, g) => sum + g.totalCompletions, 0)}</div>
                <div className="text-xs text-purple-700">Total Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="group">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-8 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto ${action.bgColor} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <action.icon className={`w-8 h-8 ${action.iconColor}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                      {action.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-purple-600 group-hover:text-purple-700 transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Enhanced Footer */}
        <div className="text-center py-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 rounded-full border border-indigo-200 shadow-sm">
            <Heart className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-700 font-medium">
              Your mental health journey is unique and valuable
            </span>
          </div>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Remember: Small steps lead to big changes. Every day you choose to prioritize your mental health is a victory worth celebrating.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
