
import { useLocalStorage } from './useLocalStorage';

export interface Goal {
  id: number;
  text: string;
  completed: boolean;
  streak: number;
  lastCompleted?: string;
  totalCompletions: number;
}

export interface GoalStats {
  totalGoals: number;
  completedToday: number;
  currentStreak: number;
  longestStreak: number;
}

export function useGoalTracking() {
  const [goals, setGoals] = useLocalStorage<Goal[]>('dailyGoals', [
    { id: 1, text: "Practice mindfulness", completed: false, streak: 3, totalCompletions: 12 },
    { id: 2, text: "Write in journal", completed: true, streak: 7, totalCompletions: 25, lastCompleted: new Date().toISOString().split('T')[0] },
    { id: 3, text: "Get 8 hours sleep", completed: false, streak: 2, totalCompletions: 8 },
    { id: 4, text: "Connect with a friend", completed: true, streak: 5, totalCompletions: 15, lastCompleted: new Date().toISOString().split('T')[0] }
  ]);

  const [completionHistory, setCompletionHistory] = useLocalStorage<Record<string, number[]>>('goalCompletionHistory', {});

  const toggleGoal = (goalId: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const wasCompleted = goal.completed;
        const newCompleted = !wasCompleted;
        
        // Update completion history
        setCompletionHistory(prevHistory => {
          const todayHistory = prevHistory[today] || [];
          const updatedHistory = newCompleted 
            ? [...todayHistory.filter(id => id !== goalId), goalId]
            : todayHistory.filter(id => id !== goalId);
          
          return { ...prevHistory, [today]: updatedHistory };
        });

        return {
          ...goal,
          completed: newCompleted,
          lastCompleted: newCompleted ? today : goal.lastCompleted,
          totalCompletions: newCompleted ? goal.totalCompletions + 1 : Math.max(0, goal.totalCompletions - 1),
          streak: newCompleted ? goal.streak + 1 : Math.max(0, goal.streak - 1)
        };
      }
      return goal;
    }));
  };

  const getGoalStats = (): GoalStats => {
    const completedToday = goals.filter(goal => goal.completed).length;
    const currentStreak = Math.min(...goals.map(g => g.streak));
    const longestStreak = Math.max(...goals.map(g => g.streak));
    
    return {
      totalGoals: goals.length,
      completedToday,
      currentStreak: currentStreak || 0,
      longestStreak: longestStreak || 0
    };
  };

  const addGoal = (text: string) => {
    const newGoal: Goal = {
      id: Date.now(),
      text,
      completed: false,
      streak: 0,
      totalCompletions: 0
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const removeGoal = (goalId: number) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  return {
    goals,
    toggleGoal,
    getGoalStats,
    addGoal,
    removeGoal,
    completionHistory
  };
}
