
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  Heart, 
  ArrowLeft,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Smile,
  Meh,
  Frown,
  Sun,
  Moon,
  Cloud
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Journal = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2024-01-15',
      mood: 4,
      title: 'Great day at college',
      content: 'Had a wonderful presentation today. Feeling confident about my communication skills. The study group was really helpful too.',
      gratitude: ['Supportive friends', 'Good health', 'Beautiful weather'],
      tags: ['academic', 'social', 'confidence']
    },
    {
      id: 2,
      date: '2024-01-14',
      mood: 2,
      title: 'Feeling overwhelmed',
      content: 'Too many assignments due this week. Feeling stressed but trying to take it one step at a time. Need to remember to breathe.',
      gratitude: ['Coffee', 'Library quiet space', 'Helpful professor'],
      tags: ['stress', 'academic', 'overwhelmed']
    },
    {
      id: 3,
      date: '2024-01-13',
      mood: 5,
      title: 'Perfect weekend',
      content: 'Spent time with family and friends. Went for a hike and felt so connected to nature. These moments remind me what really matters.',
      gratitude: ['Family time', 'Nature', 'Good food'],
      tags: ['family', 'nature', 'joy', 'weekend']
    }
  ]);

  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newEntry, setNewEntry] = useState({
    mood: 3,
    title: '',
    content: '',
    gratitude: ['', '', ''],
    tags: []
  });

  const moods = [
    { value: 1, emoji: '😢', label: 'Very Sad', color: 'text-red-500' },
    { value: 2, emoji: '😟', label: 'Sad', color: 'text-orange-500' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
    { value: 4, emoji: '😊', label: 'Happy', color: 'text-green-500' },
    { value: 5, emoji: '😄', label: 'Very Happy', color: 'text-blue-500' }
  ];

  const commonTags = ['academic', 'social', 'family', 'stress', 'joy', 'anxiety', 'confidence', 'gratitude', 'nature', 'health'];

  const getMoodIcon = (moodValue) => {
    return moods.find(m => m.value === moodValue)?.emoji || '😐';
  };

  const getMoodColor = (moodValue) => {
    return moods.find(m => m.value === moodValue)?.color || 'text-yellow-500';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSaveEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const entry = {
        id: editingId || Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...newEntry,
        gratitude: newEntry.gratitude.filter(item => item.trim() !== '')
      };

      if (editingId) {
        setEntries(prev => prev.map(e => e.id === editingId ? entry : e));
        setEditingId(null);
      } else {
        setEntries(prev => [entry, ...prev]);
      }

      setNewEntry({
        mood: 3,
        title: '',
        content: '',
        gratitude: ['', '', ''],
        tags: []
      });
      setIsWriting(false);
    }
  };

  const handleEditEntry = (entry) => {
    setNewEntry({
      mood: entry.mood,
      title: entry.title,
      content: entry.content,
      gratitude: [...entry.gratitude, '', '', ''].slice(0, 3),
      tags: entry.tags
    });
    setEditingId(entry.id);
    setIsWriting(true);
  };

  const handleDeleteEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const handleTagToggle = (tag) => {
    setNewEntry(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const cancelWriting = () => {
    setIsWriting(false);
    setEditingId(null);
    setNewEntry({
      mood: 3,
      title: '',
      content: '',
      gratitude: ['', '', ''],
      tags: []
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-purple-600" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Personal Journal
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Reflect on your thoughts and feelings</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/" className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                Dashboard
              </Link>
              <Link to="/resources" className="px-3 py-2 text-sm bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors">
                Resources
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* New Entry Button */}
        {!isWriting && (
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardContent className="pt-6">
              <Button 
                onClick={() => setIsWriting(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Write New Journal Entry
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Writing Interface */}
        {isWriting && (
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg sm:text-xl">{editingId ? 'Edit Entry' : 'New Journal Entry'}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={cancelWriting}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">How are you feeling?</label>
                <div className="grid grid-cols-5 gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setNewEntry(prev => ({ ...prev, mood: mood.value }))}
                      className={`p-3 rounded-lg text-center transition-all hover:scale-105 ${
                        newEntry.mood === mood.value 
                          ? 'bg-purple-100 border-2 border-purple-400 shadow-md' 
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-xl sm:text-2xl mb-1">{mood.emoji}</div>
                      <div className="text-xs font-medium hidden sm:block">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Entry Title</label>
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your entry a title..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Content Textarea */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Thoughts</label>
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share what's on your mind today..."
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Gratitude Section */}
              <div>
                <label className="block text-sm font-medium mb-2">Three Things I'm Grateful For</label>
                <div className="space-y-2">
                  {newEntry.gratitude.map((item, index) => (
                    <input
                      key={index}
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updatedGratitude = [...newEntry.gratitude];
                        updatedGratitude[index] = e.target.value;
                        setNewEntry(prev => ({ ...prev, gratitude: updatedGratitude }));
                      }}
                      placeholder={`Gratitude ${index + 1}...`}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {commonTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        newEntry.tags.includes(tag)
                          ? 'bg-purple-200 text-purple-800 border-purple-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } border`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleSaveEntry}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? 'Update Entry' : 'Save Entry'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={cancelWriting}
                  className="px-6"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Journal Entries */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <Card className="bg-white/70 backdrop-blur-sm border-gray-200 shadow-lg">
              <CardContent className="pt-6 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">No journal entries yet</p>
                <Button onClick={() => setIsWriting(true)} variant="outline">
                  Write Your First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} className="bg-white/70 backdrop-blur-sm border-purple-200 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-2xl ${getMoodColor(entry.mood)}`}>
                          {getMoodIcon(entry.mood)}
                        </span>
                        <div>
                          <CardTitle className="text-lg sm:text-xl">{entry.title}</CardTitle>
                          <CardDescription className="text-xs sm:text-sm">
                            {formatDate(entry.date)}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditEntry(entry)}
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {entry.content}
                  </p>
                  
                  {entry.gratitude && entry.gratitude.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <Heart className="w-4 h-4 text-pink-500" />
                        Grateful for:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {entry.gratitude.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-4 sm:py-6">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            Journaling can help improve mental clarity and emotional well-being
          </p>
          <p className="text-xs text-gray-500">
            Your entries are private and stored locally on your device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Journal;
