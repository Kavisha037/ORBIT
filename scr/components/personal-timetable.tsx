'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { PersonalTimetableEntry } from '@/lib/types';

interface PersonalTimetableProps {
  timetable: PersonalTimetableEntry[];
}

export default function PersonalTimetable({ timetable }: PersonalTimetableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Activity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timetable.sort((a,b) => a.time.localeCompare(b.time)).map((entry, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{entry.time}</TableCell>
            <TableCell>{entry.activity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
