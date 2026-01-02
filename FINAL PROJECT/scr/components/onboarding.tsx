'use client';

import { useState } from 'react';
import type { SkillPath, UserData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Icons, SKILL_ICON_MAP } from '@/components/icons';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SKILL_PATHS: SkillPath[] = ['Coding', 'Design', 'Video Editing'];

const FIELDS_OF_STUDY = ['B.Tech CSE', 'B.Tech ECE', 'B.Tech ME', 'B.Tech CE', 'BBA', 'MBA'];
const YEARS = ['1st', '2nd', '3rd', '4th', '5th+'];
const SEMESTERS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th+'];

interface OnboardingProps {
  onComplete: (data: Omit<UserData, 'onboarded'>) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [college, setCollege] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [skillPath, setSkillPath] = useState<SkillPath | ''>('');

  const progressValue = (step / 3) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Welcome to ORBIT</CardTitle>
              <CardDescription>Let's get you set up. What should we call you?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="e.g., Alex Doe" value={name} onChange={e => setName(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setStep(2)} disabled={!name}>
                Next
              </Button>
            </CardFooter>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Your College Details</CardTitle>
              <CardDescription>
                Tell us about your studies so the AI can build a relevant plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select value={course} onValueChange={setCourse}>
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select your course" />
                  </SelectTrigger>
                  <SelectContent>
                    {FIELDS_OF_STUDY.map(f => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="college">College</Label>
                  <Input id="college" placeholder="Your college name" value={college} onChange={e => setCollege(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map(y => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={semester} onValueChange={setSemester}>
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEMESTERS.map(s => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
               <div className="space-y-2">
                  <Label htmlFor="cgpa">Current CGPA</Label>
                  <Input id="cgpa" placeholder="e.g. 8.5" value={cgpa} onChange={e => setCgpa(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={!course || !year || !semester || !college}>Next</Button>
            </CardFooter>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Choose Your Path</CardTitle>
              <CardDescription>Which skill are you excited to build?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={skillPath} onValueChange={(v: SkillPath) => setSkillPath(v)}>
                <div className="grid grid-cols-1 gap-4">
                  {SKILL_PATHS.map(path => {
                    const Icon = SKILL_ICON_MAP[path] || Icons.wind;
                    return (
                        <Label
                          key={path}
                          htmlFor={path}
                          className={`flex items-center space-x-4 rounded-lg border p-4 transition-all hover:bg-accent/20 cursor-pointer ${skillPath === path ? 'border-primary ring-2 ring-primary' : ''}`}
                        >
                          <RadioGroupItem value={path} id={path} className="sr-only" />
                          <Icon className="h-8 w-8 text-primary" />
                          <span className="text-lg font-semibold">{path}</span>
                        </Label>
                    );
                  })}
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button
                variant="default"
                onClick={() => onComplete({ name, course, college, cgpa, year, semester, skillPath: skillPath as SkillPath })}
                disabled={!skillPath}
              >
                Submit
              </Button>
            </CardFooter>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
            <Image 
                src="https://picsum.photos/seed/skillsync/1200/800"
                alt="Abstract blue and orange shapes"
                width={1200}
                height={800}
                className="rounded-xl shadow-2xl"
                data-ai-hint="abstract blue"
            />
            <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold">Unlock Your Potential</h2>
                <p className="text-muted-foreground">Turn your free time into valuable skills, seamlessly.</p>
            </div>
        </div>
        <Card className="w-full max-w-md shadow-2xl">
          <div className="p-2">
            <Progress value={progressValue} className="w-full h-2" />
          </div>
          {renderStep()}
        </Card>
      </div>
    </div>
  );
}
