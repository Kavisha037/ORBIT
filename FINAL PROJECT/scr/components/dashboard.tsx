'use client';

import { useState } from 'react';
import type { UserData, DailyPlan, Progress, CollegeTimetableEntry, PersonalTimetableEntry, Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Icons, SKILL_ICON_MAP } from '@/components/icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import type { LucideProps } from 'lucide-react';
import { Sparkles, PlusCircle, BrainCircuit, Code, ExternalLink, User as UserIcon, Flame, Trophy, ShieldCheck } from 'lucide-react';
import CollegeTimetable from './college-timetable';
import PersonalTimetable from './personal-timetable';
import Image from 'next/image';
import Chatbot from './chatbot';
import Link from 'next/link';
import SubjectInsights from './subject-insights';
import { DUMMY_INSIGHTS, PlaceHolderImages } from '@/lib/dummy-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface DashboardProps {
  user: UserData;
  plan: DailyPlan;
  progress: Progress;
  collegeTimetable: CollegeTimetableEntry[];
  personalTimetable: PersonalTimetableEntry[] | null;
  onUpdateTask: (taskIndex: number, completed: boolean) => void;
  onNewDay: () => void;
  needsNewDay: boolean;
  onLogout: () => void;
}

const TaskItem = ({ task, index, onUpdateTask, skillPath }: { task: Task; index: number; onUpdateTask: (index: number, completed: boolean) => void; skillPath: string }) => {
  const SkillIcon = SKILL_ICON_MAP[skillPath] || Icons.wind;
  
  return (
    <div className={cn("flex items-center gap-4 p-3 rounded-lg transition-all", task.completed ? 'bg-signal-green/10 text-muted-foreground' : 'bg-transparent border border-white/10 glowing-border')}>
      <Checkbox
        id={`task-${index}`}
        checked={task.completed === true}
        onCheckedChange={(checked) => onUpdateTask(index, !!checked)}
        className="h-5 w-5"
      />
      <div className="flex-grow grid gap-1">
        <label htmlFor={`task-${index}`} className={cn("font-medium text-sm cursor-pointer", task.completed && "line-through")}>
          {task.task}
        </label>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{task.time}</span>
          <Separator orientation="vertical" className="h-3" />
          <span>{task.duration}</span>
        </div>
      </div>
      <SkillIcon className="h-5 w-5 text-primary shrink-0" />
    </div>
  );
};

const ProgressStat = ({ icon: Icon, value, label, children }: { icon: React.FC<LucideProps>; value: string | number; label: string; children?: React.ReactNode }) => (
    <div className="flex flex-col items-center justify-center text-center p-4 glass-card h-full w-full">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-2">
            <Icon className="h-6 w-6 text-primary" />
        </div>
        <p className="text-2xl font-bold font-headline">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {children}
    </div>
);

const CircularProgress = ({ value, max, label }: { value: number; max: number; label: string }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 20;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 50 50">
          <circle
            className="text-gray-200/20"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="25"
            cy="25"
          />
          <circle
            className="text-primary"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="25"
            cy="25"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">/{max}</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};


export default function Dashboard({ user, plan, progress, collegeTimetable, personalTimetable, onUpdateTask, onNewDay, needsNewDay, onLogout }: DashboardProps) {
  const xpToLevelUp = progress.level * 50;
  const xpPercentage = (progress.xp / xpToLevelUp) * 100;

  const handleFocusModeClick = () => {
    window.open('https://ai.studio/apps/drive/17lE-ZJvGoBkyTfOQxhXG9BajlsndOntT?fullscreenApplet=true', '_blank');
  };

  return (
    <div className="min-h-screen text-foreground futuristic-background">
      <header className="flex justify-between items-center p-4 border-b border-white/10 sticky top-0 bg-background/50 backdrop-blur-sm z-50">
          <h1 className="text-3xl font-bold font-headline">
            Welcome back, <span className="text-primary text-glow">{user.name}</span>! 👋
          </h1>
          <div className="flex items-center gap-4">
              <Button 
                className="bg-electric-blue hover:bg-electric-blue/80 text-black shadow-lg button-glow rounded-full px-6"
                onClick={handleFocusModeClick}
              >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Focus Mode
              </Button>
              <Button variant="outline" onClick={onLogout}>Logout</Button>
          </div>
      </header>

      <main className="p-4 sm:p-8">
        <div className="grid grid-cols-12 gap-6">
          
          <Card className="col-span-12 lg:col-span-4 glass-card glowing-border flex flex-col justify-center">
            <CardHeader className='pb-4'>
              <CardTitle className='font-headline text-2xl flex items-center gap-3'>
                <div className='relative'>
                    <UserIcon className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-full" />
                    <div className="absolute -inset-1 rounded-full border-2 border-primary animate-pulse"></div>
                </div>
                Student Info
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-around">
                <div className='space-y-2 text-sm mb-6'>
                    <p><strong>Course:</strong> {user.course}</p>
                    <p><strong>College:</strong> {user.college}</p>
                    <p><strong>Skill Path:</strong> <Badge variant="secondary">{user.skillPath}</Badge></p>
                </div>
                <div className="flex justify-around">
                    <CircularProgress value={parseFloat(user.cgpa || '0')} max={10} label="CGPA" />
                    <CircularProgress value={parseInt(user.semester)} max={8} label="Semester" />
                </div>
            </CardContent>
          </Card>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-6">
              <ProgressStat icon={Flame} value={progress.streak} label="Day Streak" />
              <ProgressStat icon={ShieldCheck} value={progress.level} label="Level">
                <div className='w-full px-2 mt-2'>
                    <ProgressBar value={xpPercentage} className='h-2' />
                    <p className='text-xs text-muted-foreground mt-1'>{progress.xp}/{xpToLevelUp} XP</p>
                </div>
              </ProgressStat>
              <ProgressStat icon={Trophy} value={progress.achievements.length} label="Achievements" />
          </div>

          <Card className="col-span-12 lg:col-span-5 glass-card glowing-border">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Today's Plan</CardTitle>
              <CardDescription>{format(new Date(plan.date), 'EEEE, MMMM do')}</CardDescription>
            </CardHeader>
            <CardContent>
              {plan.tasks.length > 0 ? (
                <div className="space-y-2">
                  {plan.tasks.map((task, index) => (
                    <TaskItem key={index} task={task} index={index} onUpdateTask={onUpdateTask} skillPath={user.skillPath} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tasks scheduled for today. Enjoy your day!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="col-span-12 lg:col-span-7 space-y-6">
            <Card className="glass-card glowing-border">
              <CardHeader>
                <CardTitle className='font-headline flex items-center gap-2'>
                  <Code /> Priority Session: Python
                </CardTitle>
                <CardDescription>Your main focus for skill development.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center gap-6">
                 <Image
                    src={PlaceHolderImages.find(img => img.id === 'python-course')?.imageUrl!}
                    alt="Python course thumbnail"
                    width={250}
                    height={140}
                    className="object-cover rounded-lg"
                    data-ai-hint="python code"
                  />
                <div className='flex-1'>
                  <p className="text-lg font-semibold font-headline">Master Python for Data Science and AI</p>
                  <p className="text-muted-foreground text-sm mb-4">Continue where you left off in the Python tutorial.</p>
                  <Link href="/courses/python/learn" passHref>
                    <Button asChild className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold button-glow"><span>Continue Learning <ExternalLink className="ml-2"/></span></Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

             <SubjectInsights insights={DUMMY_INSIGHTS} />
          </div>

          <Card className="col-span-12 glass-card glowing-border">
             <CardHeader>
                <CardTitle className='font-headline'>Your Schedule</CardTitle>
                <CardDescription>Your weekly college and personal timetables.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="college" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="college">College Timetable</TabsTrigger>
                    <TabsTrigger value="personal">Personal Timetable</TabsTrigger>
                  </TabsList>
                  <TabsContent value="college">
                    <CollegeTimetable timetable={collegeTimetable} />
                  </TabsContent>
                  <TabsContent value="personal">
                     {personalTimetable ? (
                      <PersonalTimetable timetable={personalTimetable} />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full min-h-48 gap-4">
                        <p className="text-muted-foreground">No personal timetable added yet.</p>
                        <Button>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Timetable
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
          </Card>
        </div>
      </main>
      <Chatbot userName={user.name} />
    </div>
  );
}
