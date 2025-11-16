'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Users,
  BookOpen,
  Building,
  FileText,
  Clock,
  Sparkles,
  FileDown,
} from 'lucide-react';
import Link from 'next/link';

const managementActions = [
  { label: 'Rooms', icon: Building2, href: '/dashboard/rooms' },
  { label: 'Instructors', icon: Users, href: '/dashboard/instructors' },
  { label: 'Courses', icon: BookOpen, href: '/dashboard/courses' },
  { label: 'Departments', icon: Building, href: '/dashboard/departments' },
  { label: 'Sections', icon: FileText, href: '/dashboard/sections' },
  { label: 'Meeting Times', icon: Clock, href: '/dashboard/meeting-times' },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Management</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {managementActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="justify-start"
                    asChild
                  >
                    <Link href={action.href}>
                      <Icon className="h-4 w-4 mr-2" />
                      {action.label}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Generation</h3>
            <div className="flex gap-2">
              <Button className="flex-1" asChild>
                <Link href="/dashboard/generate">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Routine
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/dashboard/generate-pdf">
                  <FileDown className="h-4 w-4 mr-2" />
                  Generate PDF
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

