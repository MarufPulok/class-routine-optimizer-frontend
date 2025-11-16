'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, BookOpen, Building, FileText, Clock } from 'lucide-react';
import { CountsDto } from '@/lib/dtos/dashboard.dto';

interface StatsCardsProps {
  counts: CountsDto;
}

const statConfig = [
  {
    key: 'rooms' as keyof CountsDto,
    label: 'Rooms',
    icon: Building2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    key: 'instructors' as keyof CountsDto,
    label: 'Instructors',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    key: 'courses' as keyof CountsDto,
    label: 'Courses',
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
  {
    key: 'departments' as keyof CountsDto,
    label: 'Departments',
    icon: Building,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950',
  },
  {
    key: 'sections' as keyof CountsDto,
    label: 'Sections',
    icon: FileText,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950',
  },
  {
    key: 'meeting_times' as keyof CountsDto,
    label: 'Meeting Times',
    icon: Clock,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950',
  },
];

export function StatsCards({ counts }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statConfig.map((stat) => {
        const Icon = stat.icon;
        const value = counts[stat.key] as number;

        return (
          <Card key={stat.key} className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value.toLocaleString()}</div>
            </CardContent>
          </Card>
        );
      })}
      <Card className="transition-shadow hover:shadow-md md:col-span-2 lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Seating Capacity</CardTitle>
          <div className="rounded-full p-2 bg-blue-50 dark:bg-blue-950">
            <Building2 className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {counts.total_seating_capacity.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Across all rooms
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

