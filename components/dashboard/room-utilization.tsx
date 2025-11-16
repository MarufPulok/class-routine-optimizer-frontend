'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UtilizationDto } from '@/lib/dtos/dashboard.dto';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RoomUtilizationProps {
  utilization: UtilizationDto;
}

export function RoomUtilization({ utilization }: RoomUtilizationProps) {
  const roomData = Object.entries(utilization.room_utilization)
    .map(([roomNumber, data]) => ({
      room: roomNumber,
      sections: data.sections,
      capacity: data.capacity,
      utilization: data.utilization_percentage,
    }))
    .sort((a, b) => b.sections - a.sections)
    .slice(0, 20); // Top 20 rooms

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        {roomData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roomData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="room" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'utilization') {
                      return [`${value.toFixed(1)}%`, 'Utilization'];
                    }
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar dataKey="sections" fill="#3b82f6" name="Sections" />
                <Bar dataKey="capacity" fill="#94a3b8" name="Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No room utilization data available</p>
        )}
      </CardContent>
    </Card>
  );
}

