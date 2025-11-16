'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UtilizationDto } from '@/lib/dtos/dashboard.dto';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InstructorWorkloadProps {
  utilization: UtilizationDto;
}

export function InstructorWorkload({ utilization }: InstructorWorkloadProps) {
  const instructorData = Object.entries(utilization.instructor_workload)
    .map(([uid, count]) => ({
      instructor: uid,
      sections: count,
    }))
    .sort((a, b) => b.sections - a.sections)
    .slice(0, 20); // Top 20 instructors

  const averageWorkload =
    instructorData.length > 0
      ? instructorData.reduce((sum, inst) => sum + inst.sections, 0) / instructorData.length
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instructor Workload</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Average Workload</p>
            <p className="text-2xl font-bold">{averageWorkload.toFixed(1)} sections</p>
          </div>
          {instructorData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={instructorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="instructor" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sections" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No instructor workload data available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

