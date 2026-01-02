'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export type Course = {
  name: string;
  title: string;
  description: string;
  type: string;
  image: string;
  hint: string;
};

export const COURSES: Course[] = [
  { name: 'Python', title: 'PYTHON: THE AI ENGINE', description: "Master the world's most versatile language. From powering Data Science and Machine Learning to building complex Web Backends, Python is your gateway to the future of tech. Learn to write clean, efficient, and powerful code that scales.", type: 'Free', image: PlaceHolderImages.find(img => img.id === 'python-course')?.imageUrl!, hint: PlaceHolderImages.find(img => img.id === 'python-course')?.imageHint! },
  { name: 'C++', title: 'C++: HIGH PERFORMANCE', description: "Dive deep into the architecture of computing. Build lightning-fast Game Engines, Operating Systems, and High-Frequency Trading platforms. Gain ultimate control over system resources and memory management.", type: 'Paid', image: PlaceHolderImages.find(img => img.id === 'cpp-course')?.imageUrl!, hint: PlaceHolderImages.find(img => img.id === 'cpp-course')?.imageHint! },
  { name: 'Java', title: 'JAVA: ENTERPRISE SCALE', description: "The backbone of the corporate world. Build robust, secure, and scalable applications. From Android Apps to massive banking systems, learn the 'Write Once, Run Anywhere' philosophy that powers the industry.", type: 'Free', image: PlaceHolderImages.find(img => img.id === 'java-course')?.imageUrl!, hint: PlaceHolderImages.find(img => img.id === 'java-course')?.imageHint! },
  { name: 'C', title: 'C: THE FOUNDATION', description: "Understand the machine at its core. Write efficient, low-level code that powers Embedded Systems, IoT devices, and Hardware Drivers. The perfect starting point for understanding how computers truly think.", type: 'Paid', image: PlaceHolderImages.find(img => img.id === 'c-course')?.imageUrl!, hint: PlaceHolderImages.find(img => img.id === 'c-course')?.imageHint! },
  { name: 'HTML', title: 'HTML5: DIGITAL STRUCTURE', description: "The skeleton of the internet. Create semantic, accessible, and modern web interfaces. Learn to structure content perfectly for mobile, desktop, and every device in between.", type: 'Free', image: PlaceHolderImages.find(img => img.id === 'html-course')?.imageUrl!, hint: PlaceHolderImages.find(img => img.id === 'html-course')?.imageHint! },
];

export default function CoursePage() {
  const params = useParams();
  const courseName = typeof params.courseName === 'string' ? params.courseName : '';
  const course = COURSES.find(c => c.name.toLowerCase() === courseName.toLowerCase());

  return (
    <div
      className="min-h-screen text-foreground bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${course?.image || ''})` }}
    >
      <div className="min-h-screen bg-black/80 backdrop-blur-lg">
        <header className="py-4 px-4 sm:px-8 flex justify-between items-center border-b border-white/10">
          <Link href="/" passHref>
            <Button asChild variant="outline">
              <span><ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-extrabold text-primary tracking-wider text-glow">
            {course?.name}
          </h1>
        </header>
        <main className="container mx-auto max-w-4xl p-4 sm:p-8">
          {course ? (
            <Card className="bg-background/70 border-white/20 backdrop-blur-lg card-glow">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={course.image}
                      alt={`${course.name} course thumbnail`}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                      data-ai-hint={course.hint}
                    />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-4xl mb-4 text-glow">{course.name}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground mb-6">
                  {course.description}
                </CardDescription>
                <div className="flex justify-between items-center">
                  <span className={`text-xl font-semibold ${course.type === 'Free' ? 'text-green-400' : 'text-blue-400'}`}>
                    {course.type}
                  </span>
                  <Link href={`/courses/${course.name.toLowerCase()}/learn`}>
                    <Button asChild size="lg"><span>Start Learning</span></Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-4xl font-bold text-white mb-4">Course Not Found</h2>
              <p className="text-lg text-muted-foreground">
                The course you are looking for does not exist.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
