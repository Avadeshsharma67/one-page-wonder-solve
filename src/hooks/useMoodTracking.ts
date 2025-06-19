
import { useLocalStorage } from './useLocalStorage';

export interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  timestamp: number;
}

export function useMoodTracking() {
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>('moodEntries', []);

  const addMoodEntry = (mood: number) => {
    const today = new Date().toISOString().split('T')[0];
    const existingEntryIndex = moodEntries.findIndex(entry => entry.date === today);
    
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: today,
      mood,
      timestamp: Date.now()
    };

    if (existingEntryIndex >= 0) {
      // Update existing entry for today
      const updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = newEntry;
      setMoodEntries(updatedEntries);
    } else {
      // Add new entry
      setMoodEntries(prev => [newEntry, ...prev.slice(0, 29)]); // Keep last 30 days
    }
  };

  const getMoodTrend = () => {
    const last7Days = moodEntries.slice(0, 7);
    if (last7Days.length === 0) return null;
    
    const average = last7Days.reduce((sum, entry) => sum + entry.mood, 0) / last7Days.length;
    const trend = last7Days.length > 1 ? 
      (last7Days[0].mood - last7Days[last7Days.length - 1].mood) : 0;
    
    return { average: Math.round(average * 10) / 10, trend };
  };

  const getTodaysMood = () => {
    const today = new Date().toISOString().split('T')[0];
    return moodEntries.find(entry => entry.date === today);
  };

  return {
    moodEntries,
    addMoodEntry,
    getMoodTrend,
    getTodaysMood
  };
}
