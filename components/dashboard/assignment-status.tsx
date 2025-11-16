"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssignmentsDto } from "@/lib/dtos/dashboard.dto";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface AssignmentStatusProps {
  assignments: AssignmentsDto;
}

const COLORS = {
  assigned: "#22c55e", // green
  partially: "#f59e0b", // amber
  unassigned: "#ef4444", // red
};

export function AssignmentStatus({ assignments }: AssignmentStatusProps) {
  const data = [
    {
      name: "Fully Assigned",
      value: assignments.assigned_sections,
      color: COLORS.assigned,
    },
    {
      name: "Partially Assigned",
      value: assignments.partially_assigned_sections,
      color: COLORS.partially,
    },
    {
      name: "Unassigned",
      value: assignments.unassigned_sections,
      color: COLORS.unassigned,
    },
  ].filter((item) => item.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Sections</p>
              <p className="text-2xl font-bold">{assignments.total_sections}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fully Assigned</p>
              <p className="text-2xl font-bold text-green-600">
                {assignments.assigned_sections}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Partially Assigned
              </p>
              <p className="text-2xl font-bold text-amber-600">
                {assignments.partially_assigned_sections}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unassigned</p>
              <p className="text-2xl font-bold text-red-600">
                {assignments.unassigned_sections}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Completion</p>
            <div className="w-full bg-secondary rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all"
                style={{ width: `${assignments.completion_percentage}%` }}
              />
            </div>
            <p className="text-sm font-medium mt-1">
              {assignments.completion_percentage.toFixed(1)}% Complete
            </p>
          </div>
          {data.length > 0 && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
