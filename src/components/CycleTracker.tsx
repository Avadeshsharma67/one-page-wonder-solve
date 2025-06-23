
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar,
  Droplets,
  Moon,
  Sun,
  Heart,
  Plus,
  X,
  CheckCircle2
} from 'lucide-react';
import { useCycleTracking } from '../hooks/useCycleTracking';
import { useToast } from "@/hooks/use-toast";

const CycleTracker = () => {
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<'menstrual' | 'follicular' | 'ovulation' | 'luteal'>('menstrual');
  const [selectedFlow, setSelectedFlow] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const { addCycleEntry, getCycleStats, getTodaysEntry } = useCycleTracking();
  const { toast } = useToast();

  const cycleStats = getCycleStats();
  const todaysEntry = getTodaysEntry();

  const phaseOptions = [
    { value: 'menstrual', label: 'Menstrual', icon: Droplets, color: 'bg-red-100 border-red-300 text-red-700' },
    { value: 'follicular', label: 'Follicular', icon: Sun, color: 'bg-yellow-100 border-yellow-300 text-yellow-700' },
    { value: 'ovulation', label: 'Ovulation', icon: Heart, color: 'bg-pink-100 border-pink-300 text-pink-700' },
    { value: 'luteal', label: 'Luteal', icon: Moon, color: 'bg-purple-100 border-purple-300 text-purple-700' }
  ];

  const flowOptions = [
    { value: 'light', label: 'Light', color: 'bg-blue-100 border-blue-300' },
    { value: 'medium', label: 'Medium', color: 'bg-blue-200 border-blue-400' },
    { value: 'heavy', label: 'Heavy', color: 'bg-blue-300 border-blue-500' }
  ];

  const symptomOptions = [
    'Cramps', 'Bloating', 'Headache', 'Mood changes', 'Fatigue', 
    'Breast tenderness', 'Back pain', 'Nausea', 'Acne', 'Cravings'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAddEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    
    addCycleEntry({
      date: today,
      phase: selectedPhase,
      flow: selectedPhase === 'menstrual' ? selectedFlow : undefined,
      symptoms: selectedSymptoms,
      notes: notes.trim() || undefined
    });

    // Reset form
    setSelectedSymptoms([]);
    setNotes('');
    setShowAddEntry(false);

    toast({
      title: "Cycle Entry Added",
      description: `Your ${selectedPhase} phase entry has been recorded for today.`,
    });
  };

  const getPhaseColor = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'menstrual': return 'text-red-600 bg-red-50';
      case 'follicular': return 'text-yellow-600 bg-yellow-50';
      case 'ovulation': return 'text-pink-600 bg-pink-50';
      case 'luteal': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-pink-100 to-red-100 rounded-xl">
                <Calendar className="w-5 h-5 text-pink-600" />
              </div>
              Cycle Tracker
            </CardTitle>
            <CardDescription>
              Track your menstrual cycle and symptoms
            </CardDescription>
          </div>
          <div className="text-right">
            <div className={`text-sm font-semibold px-3 py-1 rounded-full ${getPhaseColor(cycleStats.currentPhase)}`}>
              {cycleStats.currentPhase}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cycle Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-pink-50 rounded-2xl">
          <div className="text-center">
            <div className="text-xl font-bold text-pink-600">
              {cycleStats.daysUntilNext > 0 ? cycleStats.daysUntilNext : '--'}
            </div>
            <div className="text-xs text-pink-700">Days until next</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">{cycleStats.averageCycleLength}</div>
            <div className="text-xs text-purple-700">Avg cycle length</div>
          </div>
          <div className="text-center sm:col-span-1 col-span-2">
            <div className="text-sm font-bold text-indigo-600">
              {cycleStats.nextPeriodDate ? 
                new Date(cycleStats.nextPeriodDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 
                '--'
              }
            </div>
            <div className="text-xs text-indigo-700">Next period</div>
          </div>
        </div>

        {/* Today's Entry */}
        {todaysEntry ? (
          <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-green-800">Today's Entry Recorded</span>
              <Badge className={getPhaseColor(todaysEntry.phase)}>
                {todaysEntry.phase}
              </Badge>
            </div>
            {todaysEntry.flow && (
              <p className="text-sm text-green-700 mb-1">Flow: {todaysEntry.flow}</p>
            )}
            {todaysEntry.symptoms.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {todaysEntry.symptoms.map(symptom => (
                  <Badge key={symptom} variant="outline" className="text-xs">
                    {symptom}
                  </Badge>
                ))}
              </div>
            )}
            {todaysEntry.notes && (
              <p className="text-sm text-green-700 italic">"{todaysEntry.notes}"</p>
            )}
          </div>
        ) : showAddEntry ? (
          <div className="space-y-4 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            {/* Phase Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phase</label>
              <div className="grid grid-cols-2 gap-2">
                {phaseOptions.map((phase) => (
                  <button
                    key={phase.value}
                    onClick={() => setSelectedPhase(phase.value as any)}
                    className={`p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${
                      selectedPhase === phase.value
                        ? `${phase.color} shadow-md`
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <phase.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{phase.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Flow Selection (only for menstrual phase) */}
            {selectedPhase === 'menstrual' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flow</label>
                <div className="grid grid-cols-3 gap-2">
                  {flowOptions.map((flow) => (
                    <button
                      key={flow.value}
                      onClick={() => setSelectedFlow(flow.value as any)}
                      className={`p-2 rounded-lg border-2 transition-all ${
                        selectedFlow === flow.value
                          ? `${flow.color} shadow-md`
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{flow.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
              <div className="flex flex-wrap gap-2">
                {symptomOptions.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`px-3 py-1 rounded-full text-sm border-2 transition-all ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes..."
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleAddEntry} className="bg-pink-500 hover:bg-pink-600 flex-1">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Save Entry
              </Button>
              <Button 
                onClick={() => {
                  setShowAddEntry(false);
                  setSelectedSymptoms([]);
                  setNotes('');
                }} 
                variant="outline"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowAddEntry(true)}
            variant="outline"
            className="w-full border-dashed border-2 py-3 text-gray-600 hover:text-pink-600 hover:border-pink-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log Today's Cycle Data
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CycleTracker;
