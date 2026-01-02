import type { UserData, DailyPlan, Progress, CollegeTimetableEntry, PersonalTimetableEntry } from '@/lib/types';
import type { ProgressInsightsOutput } from '@/ai/flows/generate-progress-insights';
import { PlaceHolderImages } from './placeholder-images';

export const GOURAV_USER: UserData = {
  name: 'Gourav',
  course: 'B.Tech CSE',
  college: 'Gyan Ganga Institute of technology and sciences, Jabalpur',
  cgpa: '9.5',
  year: '1st',
  semester: '1st',
  skillPath: 'Coding',
  onboarded: true,
};

export const KAVISHA_USER: UserData = {
  name: 'Kavisha',
  course: 'B.Tech CSE',
  college: 'Gyan Ganga Institute of technology and sciences, Jabalpur',
  cgpa: '9.0',
  year: '1st',
  semester: '1st',
  skillPath: 'Coding',
  onboarded: true,
};

export const DUMMY_PLAN: DailyPlan = {
  date: new Date().toISOString(),
  tasks: [
    { time: '06:00 PM', task: 'Review Maths-1 concepts from today\'s lecture', duration: '45 mins', completed: true },
    { time: '06:45 PM', task: 'Practice Python string manipulation (15 mins)', duration: '15 mins', completed: true },
    { time: '07:30 PM', task: 'Work on BEEE assignments', duration: '1 hour', completed: false },
    { time: '09:30 PM', task: 'Advanced DSA: Solve 2 medium-level problems', duration: '1.5 hours', completed: null },
    { time: '11:00 PM', task: 'Quickly revise Chemistry notes', duration: '30 mins', completed: null },
  ],
};

export const DUMMY_PROGRESS: Progress = {
  streak: 5,
  level: 3,
  xp: 120,
  achievements: ['Early Bird', 'Consistent Coder', 'Project Starter'],
};

export const DUMMY_PERSONAL_TIMETABLE: PersonalTimetableEntry[] = [
    { time: '8:00 AM', activity: 'Wake up' },
    { time: '8:00 AM - 9:00 AM', activity: 'Freshen up & Breakfast' },
    { time: '9:00 AM - 10:00 AM', activity: 'Get ready for college' },
    { time: '10:00 AM - 4:30 PM', activity: 'College Lectures' },
    { time: '5:00 PM - 6:00 PM', activity: 'Rest' },
    { time: '6:00 PM - 7:00 PM', activity: 'Study session 1' },
    { time: '7:30 PM - 8:30 PM', activity: 'Study session 2' },
    { time: '8:30 PM - 9:30 PM', activity: 'Dinner + Rest' },
    { time: '9:30 PM - 11:30 PM', activity: 'Study session 3' },
    { time: '12:00 AM', activity: 'Sleep' },
];

export const DUMMY_COLLEGE_TIMETABLE: CollegeTimetableEntry[] = [
  { day: 'Monday', time: '10:15-11:00am', subject: 'MATHS-1 BT-102 (DK)' },
  { day: 'Monday', time: '11:00-11:45am', subject: 'CHE BT-101 (RB)' },
  { day: 'Monday', time: '11:45-12:30pm', subject: 'ENGLISH BT-103 (RS)' },
  { day: 'Monday', time: '1:15-2:00pm', subject: 'A-TG(NP) B-LIB(RS)' },
  { day: 'Monday', time: '2:00-2:45pm', subject: 'BEEE BT-104 (VK)' },
  { day: 'Monday', time: '2:45-4:15pm', subject: 'CHE BT-101 LAB-A(RB) / ENGLISH BT-103 LAB-B(RS)CL-11' },

  { day: 'Tuesday', time: '10:15-12:30pm', subject: 'ED BT-105 HALL-2(PK/MT)' },
  { day: 'Tuesday', time: '1:15-2:00pm', subject: 'ENGLISH BT-103 (RS)' },
  { day: 'Tuesday', time: '2:00-2:45pm', subject: 'BEEE BT-104 (VK)' },
  { day: 'Tuesday', time: '2:45-4:15pm', subject: 'BEEE BT-104 LAB-A(VK) / MF BT-106 LAB-B (MKS)' },

  { day: 'Wednesday', time: '10:15-11:00am', subject: 'CHE BT-101 (RB)' },
  { day: 'Wednesday', time: '11:00-11:45am', subject: 'MATHS-1 BT-102 (DK)' },
  { day: 'Wednesday', time: '11:45-12:30pm', subject: 'BEEE BT-104 (VK)' },
  { day: 'Wednesday', time: '1:15-2:00pm', subject: 'B-TG(RS) A-LIB(NP)' },
  { day: 'Wednesday', time: '2:00-2:45pm', subject: 'ENGLISH BT-103 (RS)' },
  { day: 'Wednesday', time: '2:45-4:15pm', subject: 'BEEE BT-104 LAB-B(VK) / MF BT-106 LAB-A (MKS)' },

  { day: 'Thursday', time: '10:15-12:30pm', subject: 'ED BT-105 HALL-2(PK/MT)' },
  { day: 'Thursday', time: '1:15-2:00pm', subject: 'MATHS-1 BT-102 (DK)' },
  { day: 'Thursday', time: '2:00-2:45pm', subject: 'MATHS-1-T1 / BEEE-T2' },
  { day: 'Thursday', time: '2:45-3:30pm', subject: 'ENGLISH BT-103 (RS)' },
  { day: 'Thursday', 'time': '3:30-4:15pm', 'subject': 'CHE BT-101 (RB)' },

  { day: 'Friday', time: '10:15-11:00am', subject: 'BEEE BT-104 (VK)' },
  { day: 'Friday', time: '11:00-11:45am', subject: 'MATHS-1 BT-102 (DK)' },
  { day: 'Friday', time: '11:45-12:30pm', subject: 'CHE BT-101 (RB)' },
  { day: 'Friday', time: '1:15-2:00pm', subject: 'ENGLISH BT-103 (RS)' },
  { day: 'Friday', time: '2:00-2:45pm', subject: 'MATHS-1-T2 / BEEE-T1' },
  { day: 'Friday', time: '2:45-4:15pm', subject: 'ED BT-105 HALL-2(PK/MT)' },

  { day: 'Saturday', time: '10:15-11:45am', subject: 'CHE BT-101 LAB-B(RB) / ENGLISH BT-103 LAB-A(RS)CL-11' },
  { day: 'Saturday', time: '11:45-12:30pm', subject: 'BEEE BT-104 (VK)' },
  { day: 'Saturday', time: '1:15-2:00pm', subject: 'CHE BT-101 (RB)' },
  { day: 'Saturday', time: '2:00-2:45pm', subject: 'MATHS-1 BT-102 (DK)' },
  { day: 'Saturday', time: '2:45-4:15pm', subject: 'ED BT-105 HALL-2(PK/MT)' },
];

export const DUMMY_INSIGHTS: ProgressInsightsOutput = {
  overallSummary: "You're making steady progress, but your focus is slightly skewed towards skill-building. Let's balance it out with academics.",
  weakTopics: [
    { subject: 'BEEE', topic: 'Circuit Theory', reason: 'Low accuracy on practice questions (55%)' },
    { subject: 'Maths-1', topic: 'Differential Equations', reason: 'Low study time (2 hours last week)' },
  ],
  recommendations: {
    nextAcademicTopic: 'BEEE: Circuit Theory fundamentals',
    nextSkillTask: 'Complete the Python Data Types module.',
    timeAllocation: 'Aim for a 60% Academics, 40% Skills split this week.',
    focusSessionSuggestion: 'Try using Focus Mode for your BEEE study sessions to improve concentration.',
  },
  motivationalTip: 'Every expert was once a beginner. Keep putting in the effort, and you will see results!',
};
export { PlaceHolderImages };
