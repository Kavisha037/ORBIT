
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Login from './login'; // Import the new Login component
import type { UserData } from '@/lib/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { COURSES, type Course } from '@/app/courses/[courseName]/page';

interface CourseCatalogProps {
  onLogin: (user: UserData) => void;
}

export default function CourseCatalog({ onLogin }: CourseCatalogProps) {
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [showLogin, setShowLogin] = useState(false);
  const [focusedCard, setFocusedCard] = useState<string | null>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFocusedCard(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    const currentRefs = cardRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);


  const filteredCourses = COURSES.filter(course => {
    const courseMatch = selectedCourse === 'All' || course.name === selectedCourse;
    const typeMatch = selectedType === 'All' || course.type === selectedType;
    return courseMatch && typeMatch;
  });

  const COURSE_NAMES = ['All', ...COURSES.map(c => c.name)];
  const COURSE_TYPES = ['All', 'Paid', 'Free'];

  if (showLogin) {
    return <Login onLoginSuccess={onLogin} onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className='futuristic-background'>
    <div 
      className="min-h-screen text-foreground bg-transparent"
    >
      <header className="py-4 px-4 sm:px-8 flex justify-between items-center border-b border-white/10 sticky top-0 z-50 bg-background/50 backdrop-blur-sm">
        <h1 className="text-5xl font-bold text-gradient tracking-[2px]">
          ORBIT
        </h1>
        <div className="space-x-2">
            <Button variant="outline" onClick={() => setShowLogin(true)}>Login</Button>
            <Button onClick={() => setShowLogin(true)}>Sign Up</Button>
        </div>
      </header>
      <main className="container mx-auto max-w-none p-0">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <aside className="col-span-1 md:sticky md:top-24 h-full p-8">
            <div className="space-y-8">
              <Card className="glass-card glowing-border">
                <CardHeader>
                  <CardTitle className="font-headline">Choose your course</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedCourse} onValueChange={setSelectedCourse}>
                    {COURSE_NAMES.map(courseName => (
                      <div key={courseName} className="flex items-center space-x-2">
                        <RadioGroupItem value={courseName} id={`course-${courseName}`} />
                        <Label htmlFor={`course-${courseName}`}>{courseName}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
              <Card className="glass-card glowing-border">
                <CardHeader>
                  <CardTitle className='font-headline'>Type of course</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedType} onValueChange={setSelectedType}>
                    {COURSE_TYPES.map(courseType => (
                      <div key={courseType} className="flex items-center space-x-2">
                        <RadioGroupItem value={courseType} id={`type-${courseType}`} />
                        <Label htmlFor={`type-${courseType}`}>{courseType}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
          </aside>
          <div className="col-span-1 md:col-span-4 space-y-24 p-8">
             <div className="text-center my-16 md:my-24">
                <h2 className="text-8xl font-extrabold text-glow-white font-headline">Master the Future</h2>
            </div>
            {filteredCourses.map((course, index) => {
              const isFocused = focusedCard === `course-card-${index}`;
              return (
                <div
                  key={course.name}
                  id={`course-card-${index}`}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={cn(
                    'focus-card',
                    isFocused ? 'is-focused' : ''
                  )}
                >
                  <Card className="group glass-card overflow-hidden transition-all duration-300 bg-transparent border-0 shadow-none relative">
                    <div className="aspect-video w-full overflow-hidden rounded-xl">
                      <Image
                        src={course.image}
                        alt={`${course.title} course thumbnail`}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                        data-ai-hint={course.hint}
                        onError={(e) => {
                          e.currentTarget.src = 'https://picsum.photos/seed/fallback/1280/720';
                        }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <CardContent className="p-0">
                        <h3 className="text-3xl font-bold mb-2 font-headline">{course.title}</h3>
                        <p className="text-muted-foreground mb-4 text-lg">{course.description}</p>
                        <div className="flex justify-between items-center">
                          <span className={`text-xl font-semibold ${course.type === 'Free' ? 'text-signal-green' : 'text-electric-blue'}`}>
                            {course.type}
                          </span>
                          {course.type === 'Paid' ? (
                            <Button size="lg" onClick={() => setShowLogin(true)}>View Course</Button>
                          ) : (
                            <Link href={`/courses/${course.name.toLowerCase()}`}>
                              <Button asChild size="lg"><span>View Course</span></Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              );
            })}
            {filteredCourses.length === 0 && (
              <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground text-lg">No courses match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
    </div>
  );
}
