'use client';

import { useState } from 'react';
import CourseCatalog from '@/components/course-catalog';
import Dashboard from '@/components/dashboard';
import { GOURAV_USER, KAVISHA_USER, DUMMY_PLAN, DUMMY_PROGRESS, DUMMY_COLLEGE_TIMETABLE, DUMMY_PERSONAL_TIMETABLE } from '@/lib/dummy-data';
import Onboarding from '@/components/onboarding';
import type { UserData } from '@/lib/types';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const handleLogin = (loggedInUser: UserData) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleOnboardingComplete = (data: Omit<UserData, 'onboarded'>) => {
    const newUser: UserData = { ...data, onboarded: true };
    setUser(newUser);
    setIsAuthenticated(true);
  }

  if (isAuthenticated && user) {
    if(!user.onboarded) {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }
    const personalTimetable = user.name === 'Gourav' ? DUMMY_PERSONAL_TIMETABLE : null;

    return <Dashboard 
            user={user} 
            plan={DUMMY_PLAN} 
            progress={DUMMY_PROGRESS} 
            collegeTimetable={DUMMY_COLLEGE_TIMETABLE}
            personalTimetable={personalTimetable}
            onUpdateTask={() => {}} 
            onNewDay={() => {}} 
            needsNewDay={false} 
            onLogout={handleLogout} 
          />;
  }

  return (
    <CourseCatalog onLogin={handleLogin} />
  );
}
