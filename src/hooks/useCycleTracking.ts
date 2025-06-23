
import { useLocalStorage } from './useLocalStorage';

export interface CycleEntry {
  id: string;
  date: string;
  phase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
  flow?: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  notes?: string;
  timestamp: number;
}

export interface CycleStats {
  averageCycleLength: number;
  nextPeriodDate: string | null;
  currentPhase: string;
  daysUntilNext: number;
}

export function useCycleTracking() {
  const [cycleEntries, setCycleEntries] = useLocalStorage<CycleEntry[]>('cycleEntries', []);
  const [cycleLength, setCycleLength] = useLocalStorage<number>('averageCycleLength', 28);
  const [lastPeriodStart, setLastPeriodStart] = useLocalStorage<string | null>('lastPeriodStart', null);

  const addCycleEntry = (entry: Omit<CycleEntry, 'id' | 'timestamp'>) => {
    const newEntry: CycleEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: Date.now()
    };

    setCycleEntries(prev => {
      const existingIndex = prev.findIndex(e => e.date === entry.date);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newEntry;
        return updated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      return [newEntry, ...prev].slice(0, 90); // Keep last 90 days
    });

    // Update last period start if it's a menstrual phase entry
    if (entry.phase === 'menstrual' && (!lastPeriodStart || entry.date > lastPeriodStart)) {
      setLastPeriodStart(entry.date);
    }
  };

  const getCurrentPhase = (): string => {
    if (!lastPeriodStart) return 'Unknown';
    
    const today = new Date();
    const periodStart = new Date(lastPeriodStart);
    const daysSincePeriod = Math.floor((today.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSincePeriod < 0) return 'Unknown';
    if (daysSincePeriod <= 5) return 'Menstrual';
    if (daysSincePeriod <= 13) return 'Follicular';
    if (daysSincePeriod <= 15) return 'Ovulation';
    if (daysSincePeriod < cycleLength) return 'Luteal';
    return 'Late/Irregular';
  };

  const getNextPeriodDate = (): string | null => {
    if (!lastPeriodStart) return null;
    
    const periodStart = new Date(lastPeriodStart);
    const nextPeriod = new Date(periodStart);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
    
    return nextPeriod.toISOString().split('T')[0];
  };

  const getDaysUntilNext = (): number => {
    const nextDate = getNextPeriodDate();
    if (!nextDate) return -1;
    
    const today = new Date();
    const next = new Date(nextDate);
    return Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getCycleStats = (): CycleStats => {
    return {
      averageCycleLength: cycleLength,
      nextPeriodDate: getNextPeriodDate(),
      currentPhase: getCurrentPhase(),
      daysUntilNext: getDaysUntilNext()
    };
  };

  const getTodaysEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    return cycleEntries.find(entry => entry.date === today);
  };

  const updateCycleLength = (length: number) => {
    setCycleLength(length);
  };

  return {
    cycleEntries,
    addCycleEntry,
    getCycleStats,
    getTodaysEntry,
    updateCycleLength,
    cycleLength
  };
}
