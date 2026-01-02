'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { CollegeTimetableEntry } from '@/lib/types';
import { groupBy } from 'lodash';

interface CollegeTimetableProps {
  timetable: CollegeTimetableEntry[];
}

export default function CollegeTimetable({ timetable }: CollegeTimetableProps) {
  const groupedByDay = groupBy(timetable, 'day');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="overflow-x-auto">
        <Table>
            {days.map(day => (
                groupedByDay[day] && (
                    <React.Fragment key={day}>
                        <TableHeader>
                            <TableRow>
                                <TableHead colSpan={3} className="text-primary font-bold text-lg">{day}</TableHead>
                            </TableRow>
                            <TableRow>
                                <TableHead>Time</TableHead>
                                <TableHead>Subject / Activity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {groupedByDay[day].sort((a,b) => a.time.localeCompare(b.time)).map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{entry.time}</TableCell>
                                    <TableCell>{entry.subject}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </React.Fragment>
                )
            ))}
        </Table>
    </div>
  );
}
