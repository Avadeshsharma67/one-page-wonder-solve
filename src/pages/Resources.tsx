
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  Heart, 
  Phone, 
  Globe, 
  Book, 
  Video, 
  Headphones, 
  Users, 
  ArrowLeft,
  ExternalLink,
  Clock,
  Star,
  Download,
  Search,
  Filter,
  MapPin,
  Mail,
  MessageCircle,
  Shield,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const onlineResources = [
    {
      name: "Headspace",
      type: "Meditation App",
      description: "Guided meditation and mindfulness exercises with sleep stories",
      rating: 4.8,
      free: false,
      link: "https://headspace.com",
      category: "Mindfulness",
      features: ["Guided meditation", "Sleep stories", "Focus music"]
    },
    {
      name: "Calm",
      type: "Sleep & Relaxation",
      description: "Premium app for sleep stories, meditation, and relaxation tools",
      rating: 4.7,
      free: false,
      link: "https://calm.com",
      category: "Sleep",
      features: ["Sleep stories", "Meditation", "Nature sounds"]
    },
    {
      name: "7 Cups",
      type: "Peer Support",
      description: "Free emotional support from trained listeners available 24/7",
      rating: 4.2,
      free: true,
      link: "https://7cups.com",
      category: "Support",
      features: ["Peer support", "Professional therapy", "Group chat"]
    },
    {
      name: "MindShift",
      type: "Anxiety Management",
      description: "CBT-based tools for anxiety and worry with practical exercises",
      rating: 4.5,
      free: true,
      link: "https://mindshift.com",
      category: "Anxiety",
      features: ["CBT tools", "Thought records", "Relaxation exercises"]
    },
    {
      name: "Sanvello",
      type: "Mood & Anxiety Tracker",
      description: "Track your mood, anxiety levels with evidence-based techniques",
      rating: 4.3,
      free: true,
      link: "https://sanvello.com",
      category: "Tracking",
      features: ["Mood tracking", "Anxiety tools", "Progress insights"]
    },
    {
      name: "Talkspace",
      type: "Online Therapy",
      description: "Professional therapy sessions with licensed therapists",
      rating: 4.1,
      free: false,
      link: "https://talkspace.com",
      category: "Therapy",
      features: ["Licensed therapists", "Text/video sessions", "Flexible scheduling"]
    }
  ];

  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support and suicide prevention",
      availability: "24/7",
      icon: Phone,
      type: "Crisis Support"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free crisis counseling via text message",
      availability: "24/7",
      icon: MessageCircle,
      type: "Text Support"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Treatment referral and information service",
      availability: "24/7",
      icon: Phone,
      type: "Treatment Referral"
    },
    {
      name: "National Alliance on Mental Illness",
      number: "1-800-950-6264",
      description: "Mental health information and support",
      availability: "Mon-Fri 10am-8pm ET",
      icon: Users,
      type: "Information & Support"
    }
  ];

  const selfHelpArticles = [
    {
      title: "Understanding College Stress",
      readTime: "5 min",
      category: "Stress Management",
      summary: "Learn about common stressors in college life and evidence-based coping strategies.",
      difficulty: "Beginner",
      tags: ["stress", "college", "coping"]
    },
    {
      title: "Building Healthy Sleep Habits",
      readTime: "7 min",
      category: "Sleep Health",
      summary: "Comprehensive guide to sleep hygiene and managing sleep disorders in college.",
      difficulty: "Beginner",
      tags: ["sleep", "health", "habits"]
    },
    {
      title: "Recognizing Depression Signs",
      readTime: "6 min",
      category: "Mental Health",
      summary: "How to identify depression symptoms and when to seek professional help.",
      difficulty: "Intermediate",
      tags: ["depression", "awareness", "help-seeking"]
    },
    {
      title: "Anxiety Management Techniques",
      readTime: "8 min",
      category: "Anxiety",
      summary: "Practical, research-backed techniques for managing anxiety in daily life.",
      difficulty: "Beginner",
      tags: ["anxiety", "techniques", "mindfulness"]
    },
    {
      title: "Building Resilience",
      readTime: "10 min",
      category: "Personal Growth",
      summary: "Develop mental resilience and emotional strength for life's challenges.",
      difficulty: "Intermediate",
      tags: ["resilience", "growth", "strength"]
    },
    {
      title: "Social Connection & Loneliness",
      readTime: "6 min",
      category: "Social Health",
      summary: "Strategies for building meaningful connections and overcoming loneliness.",
      difficulty: "Beginner",
      tags: ["social", "connection", "loneliness"]
    }
  ];

  const campusResources = [
    {
      name: "Counseling & Psychological Services",
      description: "Professional counseling and therapy services for students",
      contact: "Visit Student Services Building, Room 205",
      hours: "Mon-Fri 9am-5pm",
      services: ["Individual therapy", "Group counseling", "Crisis intervention"],
      icon: Brain
    },
    {
      name: "Peer Support Groups",
      description: "Student-led support groups for various mental health topics",
      contact: "Check student portal for current schedules",
      hours: "Various times throughout the week",
      services: ["Anxiety support", "Depression support", "Study stress groups"],
      icon: Users
    },
    {
      name: "Academic Success Center",
      description: "Help with academic stress and study-related anxiety",
      contact: "Located in Library 2nd Floor",
      hours: "Mon-Thu 8am-8pm, Fri 8am-5pm",
      services: ["Study coaching", "Time management", "Test anxiety help"],
      icon: Book
    },
    {
      name: "Campus Health Services",
      description: "Medical care including mental health screening and referrals",
      contact: "Health Center Main Building",
      hours: "Mon-Fri 8am-6pm, Sat 10am-2pm",
      services: ["Health screenings", "Medication management", "Referrals"],
      icon: Heart
    }
  ];

  const categories = ['all', 'Mindfulness', 'Sleep', 'Support', 'Anxiety', 'Tracking', 'Therapy'];

  const filteredResources = onlineResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-purple-100/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="p-2.5 hover:bg-purple-100 rounded-xl transition-all duration-300 hover:scale-105">
                <ArrowLeft className="w-5 h-5 text-purple-600" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mental Health Resources
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Comprehensive support and guidance</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/" className="group px-4 py-2.5 text-sm bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 rounded-xl hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300 border border-purple-200/50 hover:border-purple-300/50">
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link to="/journal" className="group px-4 py-2.5 text-sm bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 rounded-xl hover:from-blue-500/20 hover:to-indigo-500/20 transition-all duration-300 border border-blue-200/50 hover:border-blue-300/50">
                <span className="font-medium">Journal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Emergency Resources - Enhanced Priority Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden border-l-4 border-l-red-500">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-100">
            <CardTitle className="flex items-center gap-2 text-red-700 text-xl">
              <Shield className="w-6 h-6" />
              Emergency Support - Available 24/7
            </CardTitle>
            <CardDescription className="text-red-600">
              If you're in crisis or need immediate help, these services are here for you
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="group p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                      <contact.icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-red-900 text-sm break-words">{contact.name}</h4>
                        <Badge variant="outline" className="text-xs text-red-700 border-red-300 ml-2">
                          {contact.type}
                        </Badge>
                      </div>
                      <p className="text-xl font-mono text-red-700 font-bold my-2 break-all">{contact.number}</p>
                      <p className="text-sm text-red-600 mb-2">{contact.description}</p>
                      <Badge variant="outline" className="text-xs text-red-700 border-red-300">
                        <Clock className="w-3 h-3 mr-1" />
                        {contact.availability}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Search and Filter Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap rounded-xl transition-all duration-300 ${
                      selectedCategory === category 
                        ? 'bg-purple-500 hover:bg-purple-600' 
                        : 'hover:bg-purple-50 hover:border-purple-300'
                    }`}
                  >
                    {category === 'all' ? 'All' : category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Online Resources & Apps */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <CardTitle className="flex items-center gap-2 text-blue-700 text-xl">
              <Globe className="w-6 h-6" />
              Digital Mental Health Tools
            </CardTitle>
            <CardDescription>
              Apps and online platforms for mental wellness support ({filteredResources.length} resources)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <div key={index} className="group p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-blue-900 text-base mb-1">{resource.name}</h4>
                        <p className="text-xs text-blue-600 font-medium">{resource.type}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">{resource.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 leading-relaxed">{resource.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {resource.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge 
                            variant={resource.free ? "default" : "secondary"} 
                            className={`text-xs ${resource.free ? 'bg-green-500 text-white' : ''}`}
                          >
                            {resource.free ? "Free" : "Paid"}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {resource.category}
                          </Badge>
                        </div>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Self-Help Articles */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
              <CardTitle className="flex items-center gap-2 text-green-700 text-xl">
                <Book className="w-6 h-6" />
                Self-Help Articles
              </CardTitle>
              <CardDescription>
                Educational content on mental health topics
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {selfHelpArticles.map((article, index) => (
                  <div key={index} className="group p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300 hover:scale-[1.01] cursor-pointer">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-green-900 text-base group-hover:text-green-700 transition-colors">{article.title}</h4>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs text-green-700 border-green-300">
                            <Clock className="w-3 h-3 mr-1" />
                            {article.readTime}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${article.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                          >
                            {article.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{article.summary}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <Badge variant="secondary" className="text-xs font-medium">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Campus Resources */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <CardTitle className="flex items-center gap-2 text-purple-700 text-xl">
                <MapPin className="w-6 h-6" />
                Campus Resources
              </CardTitle>
              <CardDescription>
                On-campus mental health support services
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {campusResources.map((resource, index) => (
                  <div key={index} className="group p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                        <resource.icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h4 className="font-semibold text-purple-900 text-base">{resource.name}</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{resource.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-purple-600" />
                            <span className="text-purple-700 font-medium">{resource.contact}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span className="text-purple-700">{resource.hours}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {resource.services.map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs text-purple-700 border-purple-300">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Tips Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100">
            <CardTitle className="flex items-center gap-2 text-yellow-700 text-xl">
              <Zap className="w-6 h-6" />
              Daily Wellness Tips
            </CardTitle>
            <CardDescription>
              Simple practices for better mental health
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Heart, tip: "Practice gratitude daily", color: "text-red-500", bg: "bg-red-50" },
                { icon: Clock, tip: "Get 7-9 hours of sleep", color: "text-blue-500", bg: "bg-blue-50" },
                { icon: Users, tip: "Connect with friends", color: "text-green-500", bg: "bg-green-50" },
                { icon: Brain, tip: "Take mindful breaks", color: "text-purple-500", bg: "bg-purple-50" }
              ].map((item, index) => (
                <div key={index} className={`group p-4 ${item.bg} rounded-xl text-center hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-100`}>
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{item.tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Footer */}
        <div className="text-center py-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-purple-200">
            <Heart className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-700 font-medium">Professional help is always available</span>
          </div>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            These resources are meant to supplement, not replace, professional mental health care. 
            Always consult with qualified healthcare providers for serious mental health concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;
