'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionStatusDto } from '@/lib/dtos/dashboard.dto';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SectionStatusProps {
  sectionStatus: SectionStatusDto;
}

export function SectionStatus({ sectionStatus }: SectionStatusProps) {
  const departmentData = Object.entries(sectionStatus.by_department).map(([dept, status]) => ({
    department: dept,
    fullyAssigned: status.fully_assigned,
    partiallyAssigned: status.partially_assigned,
    unassigned: status.unassigned,
    total: status.total,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section Status by Department</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Fully Assigned</p>
              <p className="text-2xl font-bold text-green-600">
                {sectionStatus.fully_assigned}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Partially Assigned</p>
              <p className="text-2xl font-bold text-amber-600">
                {sectionStatus.partially_assigned}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unassigned</p>
              <p className="text-2xl font-bold text-red-600">
                {sectionStatus.unassigned}
              </p>
            </div>
          </div>
          {departmentData.length > 0 && (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="fullyAssigned" fill="#22c55e" name="Fully Assigned" />
                  <Bar dataKey="partiallyAssigned" fill="#f59e0b" name="Partially Assigned" />
                  <Bar dataKey="unassigned" fill="#ef4444" name="Unassigned" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

