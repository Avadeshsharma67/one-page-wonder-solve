
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const onlineResources = [
    {
      name: "Headspace",
      type: "Meditation App",
      description: "Guided meditation and mindfulness exercises",
      rating: 4.8,
      free: false,
      link: "https://headspace.com",
      category: "Mindfulness"
    },
    {
      name: "Calm",
      type: "Sleep & Relaxation",
      description: "Sleep stories, meditation, and relaxation tools",
      rating: 4.7,
      free: false,
      link: "https://calm.com",
      category: "Sleep"
    },
    {
      name: "7 Cups",
      type: "Peer Support",
      description: "Free emotional support from trained listeners",
      rating: 4.2,
      free: true,
      link: "https://7cups.com",
      category: "Support"
    },
    {
      name: "MindShift",
      type: "Anxiety Management",
      description: "CBT-based tools for anxiety and worry",
      rating: 4.5,
      free: true,
      link: "https://mindshift.com",
      category: "Anxiety"
    }
  ];

  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support and suicide prevention",
      availability: "24/7"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free crisis counseling via text message",
      availability: "24/7"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Treatment referral and information service",
      availability: "24/7"
    },
    {
      name: "National Alliance on Mental Illness",
      number: "1-800-950-6264",
      description: "Mental health information and support",
      availability: "Mon-Fri 10am-8pm ET"
    }
  ];

  const selfHelpArticles = [
    {
      title: "Understanding College Stress",
      readTime: "5 min",
      category: "Stress Management",
      summary: "Learn about common stressors in college life and healthy coping strategies."
    },
    {
      title: "Building Healthy Sleep Habits",
      readTime: "7 min",
      category: "Sleep Health",
      summary: "Tips for better sleep hygiene and managing sleep disorders."
    },
    {
      title: "Recognizing Depression Signs",
      readTime: "6 min",
      category: "Mental Health",
      summary: "How to identify depression symptoms and when to seek help."
    },
    {
      title: "Anxiety Management Techniques",
      readTime: "8 min",
      category: "Anxiety",
      summary: "Practical techniques for managing anxiety in daily life."
    }
  ];

  const campusResources = [
    {
      name: "Counseling Center",
      description: "Professional counseling services for students",
      contact: "Visit Student Services Building",
      hours: "Mon-Fri 9am-5pm"
    },
    {
      name: "Peer Support Groups",
      description: "Student-led support groups for various topics",
      contact: "Check student portal for schedules",
      hours: "Various times"
    },
    {
      name: "Academic Success Center",
      description: "Help with stress related to academic performance",
      contact: "Located in Library 2nd Floor",
      hours: "Mon-Thu 8am-8pm, Fri 8am-5pm"
    },
    {
      name: "Campus Health Services",
      description: "Medical care including mental health screening",
      contact: "Health Center Main Building",
      hours: "Mon-Fri 8am-6pm"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-purple-600" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Mental Health Resources
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Comprehensive support and information</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/" className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                Dashboard
              </Link>
              <Link to="/journal" className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                Journal
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Emergency Resources - Priority Section */}
        <Card className="bg-white/70 backdrop-blur-sm border-red-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 text-lg sm:text-xl">
              <Phone className="w-5 h-5" />
              Emergency Support - Available 24/7
            </CardTitle>
            <CardDescription className="text-sm">
              If you're in crisis or need immediate help, reach out to these services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-red-900 text-sm sm:text-base">{contact.name}</h4>
                    <p className="text-lg sm:text-xl font-mono text-red-700 font-bold">{contact.number}</p>
                    <p className="text-xs sm:text-sm text-red-600">{contact.description}</p>
                    <Badge variant="outline" className="text-xs text-red-700 border-red-300">
                      <Clock className="w-3 h-3 mr-1" />
                      {contact.availability}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Online Resources & Apps */}
        <Card className="bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 text-lg sm:text-xl">
              <Globe className="w-5 h-5" />
              Digital Mental Health Tools
            </CardTitle>
            <CardDescription className="text-sm">
              Apps and online platforms for mental wellness support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {onlineResources.map((resource, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-blue-900 text-sm sm:text-base">{resource.name}</h4>
                        <p className="text-xs text-blue-600">{resource.type}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{resource.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-600">{resource.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Badge variant={resource.free ? "default" : "secondary"} className="text-xs">
                          {resource.free ? "Free" : "Paid"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {resource.category}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Visit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Self-Help Articles */}
          <Card className="bg-white/70 backdrop-blur-sm border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 text-lg sm:text-xl">
                <Book className="w-5 h-5" />
                Self-Help Articles
              </CardTitle>
              <CardDescription className="text-sm">
                Educational content on mental health topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selfHelpArticles.map((article, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-green-900 text-sm sm:text-base">{article.title}</h4>
                        <Badge variant="outline" className="text-xs text-green-700 border-green-300 flex-shrink-0 ml-2">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">{article.summary}</p>
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Campus Resources */}
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700 text-lg sm:text-xl">
                <Users className="w-5 h-5" />
                Campus Resources
              </CardTitle>
              <CardDescription className="text-sm">
                On-campus mental health support services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {campusResources.map((resource, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-900 text-sm sm:text-base">{resource.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{resource.description}</p>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <p className="text-xs text-purple-700 font-medium">{resource.contact}</p>
                        <Badge variant="outline" className="text-xs text-purple-700 border-purple-300 w-fit">
                          {resource.hours}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tips Section */}
        <Card className="bg-white/70 backdrop-blur-sm border-yellow-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700 text-lg sm:text-xl">
              <Brain className="w-5 h-5" />
              Daily Wellness Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3 bg-yellow-50 rounded-lg text-center">
                <Heart className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <p className="text-xs sm:text-sm font-medium text-yellow-900">Practice gratitude daily</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-xs sm:text-sm font-medium text-blue-900">Get 7-9 hours of sleep</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-xs sm:text-sm font-medium text-green-900">Connect with friends</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <Brain className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-xs sm:text-sm font-medium text-purple-900">Take mindful breaks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-4 sm:py-6">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            Remember: Professional help is always available when you need it
          </p>
          <p className="text-xs text-gray-500">
            These resources are meant to supplement, not replace, professional mental health care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;
