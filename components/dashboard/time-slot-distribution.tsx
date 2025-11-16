'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UtilizationDto } from '@/lib/dtos/dashboard.dto';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TimeSlotDistributionProps {
  utilization: UtilizationDto;
}

export function TimeSlotDistribution({ utilization }: TimeSlotDistributionProps) {
  const timeSlotData = Object.entries(utilization.time_slot_distribution).map(([pid, count]) => ({
    timeSlot: pid,
    sections: count,
  }));

  const dayData = Object.entries(utilization.day_distribution).map(([day, count]) => ({
    day,
    sections: count,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Time Slot Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {timeSlotData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeSlotData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timeSlot" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sections" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No time slot data available</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Day-wise Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {dayData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sections" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No day distribution data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

