'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { ReadinessDto } from '@/lib/dtos/dashboard.dto';
import { Button } from '@/components/ui/button';

interface SystemReadinessProps {
  readiness: ReadinessDto;
}

const itemLabels: Record<string, string> = {
  rooms: 'Rooms',
  instructors: 'Instructors',
  meeting_times: 'Meeting Times',
  courses: 'Courses',
  departments: 'Departments',
  sections: 'Sections',
};

export function SystemReadiness({ readiness }: SystemReadinessProps) {
  return (
    <Card className={`border-2 ${readiness.ready ? 'border-green-500' : 'border-red-500'}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          {readiness.ready ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          <CardTitle>System Readiness</CardTitle>
        </div>
        <CardDescription>
          {readiness.ready
            ? 'System is ready for routine generation'
            : 'System is missing required data for routine generation'}
        </CardDescription>
      </CardHeader>
      {!readiness.ready && readiness.missing_items.length > 0 && (
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium text-destructive">Missing Items:</p>
            <ul className="list-disc list-inside space-y-1">
              {readiness.missing_items.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  {itemLabels[item] || item}
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Button variant="outline" size="sm">
                Add Missing Data
              </Button>
            </div>
          </div>
        </CardContent>
      )}
      {readiness.ready && (
        <CardContent>
          <div className="flex items-center gap-2 text-green-600">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">All required data is available</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

