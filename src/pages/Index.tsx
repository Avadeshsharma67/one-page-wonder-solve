
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState(null);
  const [dailyGoals, setDailyGoals] = useState([
    { id: 1, text: "Practice mindfulness", completed: false, streak: 3 },
    { id: 2, text: "Write in journal", completed: true, streak: 7 },
    { id: 3, text: "Get 8 hours sleep", completed: false, streak: 2 },
    { id: 4, text: "Connect with a friend", completed: true, streak: 5 }
  ]);

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
  const completedGoals = dailyGoals.filter(goal => goal.completed).length;
  const progressPercentage = (completedGoals / dailyGoals.length) * 100;

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
      title: "Track Progress",
      description: "View your journey",
      icon: TrendingUp,
      link: "#",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    }
  ];

  const toggleGoal = (goalId) => {
    setDailyGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Enhanced Header */}
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
                  How are you feeling today? Your wellbeing matters.
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
                    {currentTime.toLocaleDateString('en-US', { timeZoneName: 'short' }).split(',')[1]}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
              How are you feeling right now? This helps track your emotional journey.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-5 gap-3">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`group p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    selectedMood === mood.value 
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
            {selectedMood && (
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 animate-fade-in">
                <p className="text-sm text-purple-700 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Thank you for sharing! Your mood has been recorded.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily Goals & Progress */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  Today's Wellness Goals
                </CardTitle>
                <CardDescription>
                  Track your daily mental health practices
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{completedGoals}/{dailyGoals.length}</div>
                <div className="text-xs text-gray-500">completed</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-semibold text-blue-600">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-gray-100" />
            </div>
            
            <div className="grid gap-3">
              {dailyGoals.map((goal) => (
                <div
                  key={goal.id}
                  className={`group p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                    goal.completed 
                      ? 'bg-green-50 border-green-200 shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        goal.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300 group-hover:border-blue-400'
                      }`}>
                        {goal.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <span className={`font-medium ${goal.completed ? 'text-green-800 line-through' : 'text-gray-800'}`}>
                          {goal.text}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <Activity className="w-3 h-3 mr-1" />
                            {goal.streak} day streak
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

        {/* Wellness Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                Weekly Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-gray-800">Journal Streak</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">7 days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <Smile className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-800">Positive Mood Days</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">5/7</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-800">Goals Completed</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">24/28</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl">
                  <Timer className="w-5 h-5 text-indigo-600" />
                </div>
                Upcoming Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Evening Reflection</div>
                    <div className="text-sm text-gray-600">Today at 8:00 PM</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Weekly Check-in</div>
                    <div className="text-sm text-gray-600">Tomorrow at 10:00 AM</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
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
