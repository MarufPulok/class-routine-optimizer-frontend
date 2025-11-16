'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UtilizationDto, CountsDto } from '@/lib/dtos/dashboard.dto';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DepartmentBreakdownProps {
  utilization: UtilizationDto;
  counts: CountsDto;
}

export function DepartmentBreakdown({ utilization, counts }: DepartmentBreakdownProps) {
  // This is a placeholder - in a real implementation, you'd get department breakdown from the API
  // For now, we'll show a simple message or use mock data structure
  const data = [
    { name: 'Department A', sections: 10, courses: 5 },
    { name: 'Department B', sections: 8, courses: 4 },
    { name: 'Department C', sections: 12, courses: 6 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sections" fill="#3b82f6" name="Sections" />
              <Bar dataKey="courses" fill="#8b5cf6" name="Courses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

