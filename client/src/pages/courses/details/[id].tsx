import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarField from "@/components/stars/StarField";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";
import { Course } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CourseDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: course, isLoading, error } = useQuery<Course>({
    queryKey: [`/api/courses/${id}`],
  });

  if (isLoading) {
    return (
      <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="animate-pulse">
              <div className="h-10 bg-indigo-800/50 w-3/4 rounded mb-4"></div>
              <div className="h-6 bg-indigo-800/50 w-full rounded mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-80 bg-indigo-800/50 rounded-lg mb-6"></div>
                  <div className="h-6 bg-indigo-800/50 w-full rounded mb-3"></div>
                  <div className="h-6 bg-indigo-800/50 w-full rounded mb-3"></div>
                  <div className="h-6 bg-indigo-800/50 w-3/4 rounded mb-6"></div>
                </div>
                <div className="lg:col-span-1">
                  <div className="h-64 bg-indigo-800/50 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">Course Not Found</h1>
            <p className="text-violet-300 mb-8">The course you're looking for doesn't exist or has been removed.</p>
            <Link href="/courses" className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-montserrat font-medium transition">
              Browse All Courses
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'amor': return '#ec4899';
      case 'dinero': return '#10b981';
      case 'salud': return '#0ea5e9';
      case 'mente': return '#6366f1';
      case 'alma': return '#8b5cf6';
      case 'cuerpo': return '#d1d5db';
      default: return '#6366f1';
    }
  };

  return (
    <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <Link 
              href={`/courses/${course.category.toLowerCase()}`} 
              className="inline-flex items-center text-violet-300 hover:text-white transition mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to {course.category} Courses
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold">{course.title}</h1>
              <span 
                className="px-3 py-1 rounded-full text-xs font-medium" 
                style={{ 
                  backgroundColor: `${getCategoryColor(course.category)}80`,
                  color: 'white'
                }}
              >
                {course.category}
              </span>
            </div>
            
            <p className="text-violet-300 text-lg mb-6">{course.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative rounded-lg overflow-hidden mb-8">
                <img 
                  src={course.imageUrl} 
                  alt={course.title} 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-indigo-950 to-transparent"></div>
              </div>

              <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 bg-indigo-900/50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="bg-indigo-900/30 backdrop-blur-sm rounded-md p-6 mt-2 border border-indigo-500/20">
                  <div className="space-y-4">
                    <h3 className="text-xl font-montserrat font-semibold">About This Course</h3>
                    <p className="text-violet-200">{course.fullDescription}</p>
                    
                    <h3 className="text-xl font-montserrat font-semibold mt-6">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ffc83d] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-violet-200">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="curriculum" className="bg-indigo-900/30 backdrop-blur-sm rounded-md p-6 mt-2 border border-indigo-500/20">
                  <div className="space-y-4">
                    <h3 className="text-xl font-montserrat font-semibold">Course Curriculum</h3>
                    <div className="space-y-4">
                      {course.modules.map((module, index) => (
                        <Card key={index} className="bg-indigo-800/50 border-indigo-500/20">
                          <CardContent className="p-4">
                            <h4 className="text-lg font-semibold mb-2">Module {index + 1}: {module.title}</h4>
                            <ul className="space-y-2">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-300 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-violet-200">{lesson.title} ({lesson.duration})</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="instructor" className="bg-indigo-900/30 backdrop-blur-sm rounded-md p-6 mt-2 border border-indigo-500/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={course.instructor.avatarUrl} 
                        alt={course.instructor.name} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-montserrat font-semibold">{course.instructor.name}</h3>
                        <p className="text-violet-300">{course.instructor.title}</p>
                      </div>
                    </div>
                    <p className="text-violet-200">{course.instructor.bio}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-lg border border-indigo-500/20 overflow-hidden sticky top-24">
                <div className="p-6">
                  <div className="mb-6 text-center">
                    <div className="text-3xl font-bold text-white mb-1">${course.price.toFixed(2)}</div>
                    {course.originalPrice && (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg text-gray-400 line-through">${course.originalPrice.toFixed(2)}</span>
                        <span className="text-sm px-2 py-0.5 bg-[#ffc83d] text-indigo-900 rounded-sm font-medium">
                          {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-violet-300">Duration:</span>
                      <span className="text-white">{course.duration}</span>
                    </div>
                    <Separator className="bg-indigo-500/20" />
                    <div className="flex justify-between items-center">
                      <span className="text-violet-300">Level:</span>
                      <span className="text-white">{course.level}</span>
                    </div>
                    <Separator className="bg-indigo-500/20" />
                    <div className="flex justify-between items-center">
                      <span className="text-violet-300">Students:</span>
                      <span className="text-white">{course.studentsEnrolled}+ enrolled</span>
                    </div>
                    <Separator className="bg-indigo-500/20" />
                    <div className="flex justify-between items-center">
                      <span className="text-violet-300">Last Updated:</span>
                      <span className="text-white">{new Date(course.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Button className="w-full mb-4 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 rounded-full py-6 text-white font-montserrat font-semibold">
                    Enroll Now
                  </Button>

                  <div className="text-center text-sm text-violet-300">
                    30-Day Money-Back Guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;
