
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Brain, Phone, MessageCircle, Smile, Meh, Frown, Activity, Clock, Users, Shield, BookOpen, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
  const [dailyGoals, setDailyGoals] = useState({
    moodCheck: false,
    mindfulness: false,
    gratitude: false
  });

  const moods = [
    { value: 1, emoji: '😢', label: 'Very Sad', color: 'text-red-500' },
    { value: 2, emoji: '😟', label: 'Sad', color: 'text-orange-500' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
    { value: 4, emoji: '😊', label: 'Happy', color: 'text-green-500' },
    { value: 5, emoji: '😄', label: 'Very Happy', color: 'text-blue-500' }
  ];

  const emergencyResources = [
    { name: 'National Suicide Prevention Lifeline', number: '988', description: '24/7 crisis support' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Free 24/7 crisis counseling' },
    { name: 'SAMHSA National Helpline', number: '1-800-662-4357', description: 'Mental health and substance abuse' },
    { name: 'Campus Counseling Center', number: 'Your College Number', description: 'On-campus mental health support' }
  ];

  const mindfulnessExercises = [
    { name: '4-7-8 Breathing', duration: '2 min', description: 'Inhale 4, hold 7, exhale 8' },
    { name: 'Body Scan', duration: '5 min', description: 'Progressive muscle relaxation' },
    { name: 'Gratitude Practice', duration: '3 min', description: 'List 3 things you\'re grateful for' },
    { name: 'Mindful Walking', duration: '10 min', description: 'Focus on each step and breath' }
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
    
    const breathingInterval = setInterval(() => {
      setBreathingCount(prev => {
        if (prev >= 8) {
          clearInterval(breathingInterval);
          setIsBreathing(false);
          setDailyGoals(prevGoals => ({ ...prevGoals, mindfulness: true }));
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const completedGoals = Object.values(dailyGoals).filter(Boolean).length;
  const progressPercentage = (completedGoals / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header with Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  MindfulU
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Your Mental Wellness Companion</p>
              </div>
            </div>
            <nav className="flex gap-2 sm:gap-4">
              <Link to="/resources" className="flex items-center gap-1 px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Resources</span>
              </Link>
              <Link to="/journal" className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Journal</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Daily Progress - Enhanced Responsiveness */}
        <Card className="bg-white/70 backdrop-blur-sm border-purple-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Activity className="w-5 h-5 text-purple-600" />
              Today's Wellness Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Daily Goals</span>
                  <span>{completedGoals}/3 completed</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className={`p-3 rounded-lg text-center transition-all ${dailyGoals.moodCheck ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'} border`}>
                  <Heart className={`w-6 h-6 mx-auto mb-2 ${dailyGoals.moodCheck ? 'text-green-600' : 'text-gray-400'}`} />
                  <p className="text-xs sm:text-sm font-medium">Mood Check</p>
                </div>
                <div className={`p-3 rounded-lg text-center transition-all ${dailyGoals.mindfulness ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'} border`}>
                  <Brain className={`w-6 h-6 mx-auto mb-2 ${dailyGoals.mindfulness ? 'text-green-600' : 'text-gray-400'}`} />
                  <p className="text-xs sm:text-sm font-medium">Mindfulness</p>
                </div>
                <div className={`p-3 rounded-lg text-center transition-all ${dailyGoals.gratitude ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'} border`}>
                  <Smile className={`w-6 h-6 mx-auto mb-2 ${dailyGoals.gratitude ? 'text-green-600' : 'text-gray-400'}`} />
                  <p className="text-xs sm:text-sm font-medium">Gratitude</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Mood Tracking - Enhanced Mobile Layout */}
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">How are you feeling today?</CardTitle>
              <CardDescription className="text-sm">Track your daily mood to identify patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-1 sm:gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => handleMoodSelect(mood)}
                    className={`p-2 sm:p-3 rounded-lg text-center transition-all hover:scale-105 hover:shadow-md ${
                      currentMood?.value === mood.value 
                        ? 'bg-purple-100 border-2 border-purple-400 shadow-md' 
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-xs font-medium hidden sm:block">{mood.label}</div>
                  </button>
                ))}
              </div>
              
              {currentMood && (
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm">
                    <strong>Today's mood:</strong> {currentMood.label} {currentMood.emoji}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mood Chart - Responsive Height */}
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Mood Trends</CardTitle>
              <CardDescription className="text-sm">Your weekly mood pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 sm:h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                    <YAxis domain={[1, 5]} stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      labelFormatter={(label) => `Day: ${label}`}
                      formatter={(value) => [
                        `${moods.find(m => m.value === value)?.label} (${value})`, 
                        'Mood'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mindfulness Exercises - Improved Mobile Layout */}
        <Card className="bg-white/70 backdrop-blur-sm border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Brain className="w-5 h-5 text-purple-600" />
              Mindfulness Exercises
            </CardTitle>
            <CardDescription className="text-sm">Take a moment to center yourself</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-base sm:text-lg">Quick Exercises</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {mindfulnessExercises.map((exercise, index) => (
                    <div key={index} className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-200">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                        <h4 className="font-medium text-sm sm:text-base">{exercise.name}</h4>
                        <Badge variant="secondary" className="text-xs flex-shrink-0">
                          <Clock className="w-3 h-3 mr-1" />
                          {exercise.duration}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3">{exercise.description}</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full sm:w-auto text-xs sm:text-sm"
                        onClick={() => {
                          if (exercise.name === 'Gratitude Practice') {
                            setDailyGoals(prev => ({ ...prev, gratitude: true }));
                          }
                        }}
                      >
                        Start Exercise
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-base sm:text-lg">Guided Breathing</h3>
                <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg text-center">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center transition-transform duration-1000 ${isBreathing ? 'scale-110' : 'scale-100'}`}>
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  
                  {!isBreathing ? (
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4">
                        Practice the 4-7-8 breathing technique to reduce stress and anxiety
                      </p>
                      <Button 
                        onClick={startBreathingExercise} 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-sm w-full sm:w-auto"
                      >
                        Start Breathing Exercise
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-base sm:text-lg font-medium mb-2">
                        {breathingCount <= 4 ? 'Inhale...' : breathingCount <= 7 ? 'Hold...' : 'Exhale...'}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-purple-600">{breathingCount}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Resources - Mobile Optimized */}
        <Card className="bg-white/70 backdrop-blur-sm border-red-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 text-lg sm:text-xl">
              <Shield className="w-5 h-5" />
              Emergency Mental Health Resources
            </CardTitle>
            <CardDescription className="text-sm">
              If you're in crisis or need immediate support, these resources are available 24/7
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {emergencyResources.map((resource, index) => (
                <div key={index} className="p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-red-900 text-sm sm:text-base break-words">{resource.name}</h4>
                      <p className="text-sm sm:text-lg font-mono text-red-700 my-1 break-all">{resource.number}</p>
                      <p className="text-xs sm:text-sm text-red-600">{resource.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 text-sm sm:text-base">Remember: You're Not Alone</h4>
                  <p className="text-xs sm:text-sm text-blue-700">
                    Mental health struggles are common among college students. Seeking help is a sign of strength, not weakness.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-4 sm:py-6">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            Built with care for student mental health awareness
          </p>
          <p className="text-xs text-gray-500">
            This app provides general wellness support and is not a substitute for professional mental health care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
