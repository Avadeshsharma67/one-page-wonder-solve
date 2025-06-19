
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Brain, Phone, MessageCircle, Smile, Meh, Frown, Activity, Clock, Users, Shield, BookOpen, Calendar, Zap, Target, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Link } from 'react-router-dom';

const Index = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([
    { date: 'Mon', mood: 4, day: 'Monday' },
    { date: 'Tue', mood: 3, day: 'Tuesday' },
    { date: 'Wed', mood: 5, day: 'Wednesday' },
    { date: 'Thu', mood: 2, day: 'Thursday' },
    { date: 'Fri', mood: 4, day: 'Friday' },
    { date: 'Sat', mood: 5, day: 'Saturday' },
    { date: 'Sun', mood: 4, day: 'Sunday' }
  ]);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingCount, setBreathingCount] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState('');
  const [dailyGoals, setDailyGoals] = useState({
    moodCheck: false,
    mindfulness: false,
    gratitude: false
  });

  const moods = [
    { value: 1, emoji: '😢', label: 'Very Sad', color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { value: 2, emoji: '😟', label: 'Sad', color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    { value: 4, emoji: '😊', label: 'Happy', color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    { value: 5, emoji: '😄', label: 'Very Happy', color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
  ];

  const emergencyResources = [
    { name: 'National Suicide Prevention Lifeline', number: '988', description: '24/7 crisis support', icon: Phone },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Free 24/7 crisis counseling', icon: MessageCircle },
    { name: 'SAMHSA National Helpline', number: '1-800-662-4357', description: 'Mental health and substance abuse', icon: Heart },
    { name: 'Campus Counseling Center', number: 'Your College Number', description: 'On-campus mental health support', icon: Users }
  ];

  const mindfulnessExercises = [
    { name: '4-7-8 Breathing', duration: '2 min', description: 'Inhale 4, hold 7, exhale 8', icon: '🫁', difficulty: 'Beginner' },
    { name: 'Body Scan', duration: '5 min', description: 'Progressive muscle relaxation', icon: '🧘', difficulty: 'Intermediate' },
    { name: 'Gratitude Practice', duration: '3 min', description: 'List 3 things you\'re grateful for', icon: '🙏', difficulty: 'Beginner' },
    { name: 'Mindful Walking', duration: '10 min', description: 'Focus on each step and breath', icon: '🚶', difficulty: 'Beginner' }
  ];

  const handleMoodSelect = (mood) => {
    setCurrentMood(mood);
    const today = new Date().toLocaleDateString('en', { weekday: 'short' });
    const newEntry = { 
      date: today, 
      mood: mood.value, 
      day: new Date().toLocaleDateString('en', { weekday: 'long' }) 
    };
    
    setMoodHistory(prev => {
      const updated = [...prev];
      const todayIndex = updated.findIndex(entry => entry.date === today);
      if (todayIndex >= 0) {
        updated[todayIndex] = newEntry;
      } else {
        updated.push(newEntry);
      }
      return updated.slice(-7);
    });
    
    setDailyGoals(prev => ({ ...prev, moodCheck: true }));
  };

  const startBreathingExercise = () => {
    setIsBreathing(true);
    setBreathingCount(0);
    setBreathingPhase('Inhale');
    
    const breathingInterval = setInterval(() => {
      setBreathingCount(prev => {
        const newCount = prev + 1;
        
        if (newCount <= 4) {
          setBreathingPhase('Inhale');
        } else if (newCount <= 11) {
          setBreathingPhase('Hold');
        } else if (newCount <= 19) {
          setBreathingPhase('Exhale');
        }
        
        if (newCount >= 19) {
          clearInterval(breathingInterval);
          setIsBreathing(false);
          setBreathingPhase('Complete');
          setDailyGoals(prevGoals => ({ ...prevGoals, mindfulness: true }));
          setTimeout(() => setBreathingPhase(''), 2000);
          return 0;
        }
        return newCount;
      });
    }, 1000);
  };

  const completedGoals = Object.values(dailyGoals).filter(Boolean).length;
  const progressPercentage = (completedGoals / 3) * 100;

  const averageMood = moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length;
  const moodTrend = moodHistory[moodHistory.length - 1].mood - moodHistory[moodHistory.length - 2].mood;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Enhanced Header with Glass Effect */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-purple-100/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  MindfulU
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Your Mental Wellness Companion</p>
              </div>
            </div>
            <nav className="flex gap-2 sm:gap-3">
              <Link to="/resources" className="group flex items-center gap-2 px-4 py-2.5 text-sm bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 rounded-xl hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300 border border-purple-200/50 hover:border-purple-300/50 hover:shadow-md">
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-medium">Resources</span>
              </Link>
              <Link to="/journal" className="group flex items-center gap-2 px-4 py-2.5 text-sm bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 rounded-xl hover:from-blue-500/20 hover:to-indigo-500/20 transition-all duration-300 border border-blue-200/50 hover:border-blue-300/50 hover:shadow-md">
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-medium">Journal</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Enhanced Welcome Section */}
        <div className="text-center py-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Welcome back! How are you feeling today?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a moment to check in with yourself and track your wellness journey.
          </p>
        </div>

        {/* Enhanced Daily Progress with Stats */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">Today's Progress</h3>
                <p className="text-purple-100">Keep building your wellness habits</p>
              </div>
              <div className="text-3xl font-bold">
                {completedGoals}/3
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-3 font-medium">
                  <span className="text-gray-700">Daily Goals Completed</span>
                  <span className="text-purple-600">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3 rounded-full" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                  dailyGoals.moodCheck 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-md' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}>
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    dailyGoals.moodCheck ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    <Heart className={`w-6 h-6 ${dailyGoals.moodCheck ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Mood Check</p>
                  <p className="text-xs text-gray-600 mt-1">Track your feelings</p>
                </div>
                
                <div className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                  dailyGoals.mindfulness 
                    ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-md' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}>
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    dailyGoals.mindfulness ? 'bg-blue-100' : 'bg-gray-200'
                  }`}>
                    <Brain className={`w-6 h-6 ${dailyGoals.mindfulness ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Mindfulness</p>
                  <p className="text-xs text-gray-600 mt-1">Practice presence</p>
                </div>
                
                <div className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                  dailyGoals.gratitude 
                    ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}>
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    dailyGoals.gratitude ? 'bg-purple-100' : 'bg-gray-200'
                  }`}>
                    <Smile className={`w-6 h-6 ${dailyGoals.gratitude ? 'text-purple-600' : 'text-gray-400'}`} />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Gratitude</p>
                  <p className="text-xs text-gray-600 mt-1">Appreciate life</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Mood Tracking */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <CardTitle className="text-xl flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-600" />
                Mood Check-in
              </CardTitle>
              <CardDescription>How are you feeling right now?</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-5 gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => handleMoodSelect(mood)}
                    className={`group p-3 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${
                      currentMood?.value === mood.value 
                        ? `${mood.bgColor} border-2 ${mood.borderColor} shadow-lg scale-105` 
                        : 'bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {mood.emoji}
                    </div>
                    <div className="text-xs font-medium text-gray-700 hidden sm:block">
                      {mood.label}
                    </div>
                  </button>
                ))}
              </div>
              
              {currentMood && (
                <div className={`p-4 rounded-xl border-2 ${currentMood.borderColor} ${currentMood.bgColor} animate-fade-in`}>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{currentMood.emoji}</div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Feeling {currentMood.label}
                      </p>
                      <p className="text-sm text-gray-600">
                        Thanks for checking in with yourself today!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Mood Chart with Stats */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Mood Trends
                  </CardTitle>
                  <CardDescription>Your weekly emotional journey</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {averageMood.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600">avg mood</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moodHistory}>
                    <defs>
                      <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                    <YAxis domain={[1, 5]} stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      labelFormatter={(label) => `Day: ${label}`}
                      formatter={(value) => [
                        `${moods.find(m => m.value === value)?.label} (${value})`, 
                        'Mood'
                      ]}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="mood"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fill="url(#moodGradient)"
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${moodTrend > 0 ? 'bg-green-500' : moodTrend < 0 ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                  <span className="text-gray-600">
                    {moodTrend > 0 ? 'Trending up' : moodTrend < 0 ? 'Trending down' : 'Stable'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Mindfulness Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Brain className="w-6 h-6 text-green-600" />
              Mindfulness & Wellness
            </CardTitle>
            <CardDescription>Take a moment to center yourself and find peace</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Exercises */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Quick Exercises
                </h3>
                <div className="space-y-3">
                  {mindfulnessExercises.map((exercise, index) => (
                    <div key={index} className="group p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{exercise.icon}</div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-gray-800">{exercise.name}</h4>
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {exercise.duration}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {exercise.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full sm:w-auto group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all"
                            onClick={() => {
                              if (exercise.name === 'Gratitude Practice') {
                                setDailyGoals(prev => ({ ...prev, gratitude: true }));
                              }
                            }}
                          >
                            <Target className="w-3 h-3 mr-1" />
                            Start Exercise
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Breathing Exercise */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  Guided Breathing
                </h3>
                <div className="p-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl text-center border border-blue-200">
                  <div className={`w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center transition-all duration-1000 ${
                    isBreathing ? 'scale-110 shadow-2xl' : 'scale-100 shadow-lg'
                  } ${isBreathing && breathingPhase === 'Inhale' ? 'scale-125' : isBreathing && breathingPhase === 'Exhale' ? 'scale-95' : ''}`}>
                    <Heart className={`w-10 h-10 text-white transition-all duration-500 ${isBreathing ? 'scale-110' : 'scale-100'}`} />
                  </div>
                  
                  {!isBreathing && breathingPhase !== 'Complete' ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">4-7-8 Breathing</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          A powerful technique to reduce stress and promote relaxation
                        </p>
                        <div className="text-xs text-gray-500 space-y-1 mb-6">
                          <p>• Inhale for 4 seconds</p>
                          <p>• Hold for 7 seconds</p>
                          <p>• Exhale for 8 seconds</p>
                        </div>
                      </div>
                      <Button 
                        onClick={startBreathingExercise} 
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                        size="lg"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Start Breathing
                      </Button>
                    </div>
                  ) : isBreathing ? (
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-gray-800 mb-2">
                        {breathingPhase}
                      </div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {breathingPhase === 'Inhale' ? breathingCount 
                         : breathingPhase === 'Hold' ? breathingCount - 4
                         : breathingCount - 11}
                      </div>
                      <div className="text-sm text-gray-600">
                        {breathingPhase === 'Inhale' ? 'Breathe in slowly...' 
                         : breathingPhase === 'Hold' ? 'Hold your breath...'
                         : 'Breathe out slowly...'}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">✨</div>
                      <div className="text-lg font-semibold text-green-600">Well done!</div>
                      <p className="text-sm text-gray-600">You've completed the breathing exercise</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Emergency Resources */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden border-l-4 border-l-red-500">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-100">
            <CardTitle className="flex items-center gap-2 text-red-700 text-xl">
              <Shield className="w-6 h-6" />
              Emergency Support - Available 24/7
            </CardTitle>
            <CardDescription className="text-red-600">
              If you're in crisis or need immediate support, help is always available
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {emergencyResources.map((resource, index) => (
                <div key={index} className="group p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                      <resource.icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-red-900 text-sm mb-1 break-words">{resource.name}</h4>
                      <p className="text-lg font-mono text-red-700 my-2 font-bold break-all">{resource.number}</p>
                      <p className="text-sm text-red-600">{resource.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Remember: You're Not Alone</h4>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    Mental health struggles are common among college students. Seeking help is a sign of strength, 
                    not weakness. Your campus community and these resources are here to support you every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Footer */}
        <div className="text-center py-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-purple-200">
            <Heart className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-700 font-medium">Built with care for student wellness</span>
          </div>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            This app provides general wellness support and is not a substitute for professional mental health care. 
            Always consult with qualified healthcare providers for serious mental health concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
