
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, BookOpen, Heart, Settings, Home } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/resources', icon: Heart, label: 'Resources' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white/80 backdrop-blur-xl border-b border-indigo-100/50 sticky top-0 z-50 shadow-sm">
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
              {navItems.slice(1, -1).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group px-4 py-2.5 text-sm rounded-xl transition-all duration-300 border hover:scale-105 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 border-purple-300/50'
                      : 'bg-gradient-to-r from-green-500/10 to-teal-500/10 text-green-700 hover:from-green-500/20 hover:to-teal-500/20 border-green-200/50 hover:border-green-300/50'
                  }`}
                >
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <Link
                to="/settings"
                className="group p-2.5 text-sm bg-gradient-to-r from-gray-500/10 to-gray-500/10 text-gray-700 rounded-xl hover:from-gray-500/20 hover:to-gray-500/20 transition-all duration-300 border border-gray-200/50 hover:border-gray-300/50 hover:scale-105"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-50 safe-area-pb">
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600'
                    : 'text-gray-500'
                }`}
              >
                <item.icon className={`w-5 h-5 mb-1 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span className={`text-xs font-medium truncate ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
