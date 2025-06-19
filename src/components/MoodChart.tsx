
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useMoodTracking } from '../hooks/useMoodTracking';

const MoodChart = () => {
  const { moodEntries, getMoodTrend } = useMoodTracking();
  const trend = getMoodTrend();
  
  const last7Days = moodEntries.slice(0, 7).reverse();
  const maxMood = 5;

  const getTrendIcon = () => {
    if (!trend) return Minus;
    if (trend.trend > 0.5) return TrendingUp;
    if (trend.trend < -0.5) return TrendingDown;
    return Minus;
  };

  const getTrendColor = () => {
    if (!trend) return 'text-gray-500';
    if (trend.trend > 0.5) return 'text-green-500';
    if (trend.trend < -0.5) return 'text-red-500';
    return 'text-yellow-500';
  };

  const TrendIcon = getTrendIcon();

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">7-Day Mood Trend</CardTitle>
          {trend && (
            <div className="flex items-center gap-2">
              <TrendIcon className={`w-4 h-4 ${getTrendColor()}`} />
              <Badge variant="secondary" className="text-xs">
                Avg: {trend.average}/5
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {last7Days.length > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between items-end h-32 gap-2">
              {last7Days.map((entry, index) => {
                const height = (entry.mood / maxMood) * 100;
                const date = new Date(entry.date);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                
                return (
                  <div key={entry.id} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '80px' }}>
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          entry.mood >= 4 ? 'bg-green-400' :
                          entry.mood >= 3 ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`}
                        style={{ 
                          height: `${height}%`,
                          position: 'absolute',
                          bottom: 0
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-700">
                          {entry.mood}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2 font-medium">
                      {dayName}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span>Good (4-5)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                <span>Okay (3)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                <span>Low (1-2)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Start tracking your mood to see trends</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodChart;
