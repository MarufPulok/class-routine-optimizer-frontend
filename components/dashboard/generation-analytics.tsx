'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GenerationHistoryStatsDto } from '@/lib/dtos/dashboard.dto';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface GenerationAnalyticsProps {
  stats: GenerationHistoryStatsDto;
  history: Array<{
    timestamp: string;
    fitness_score: number;
    conflicts_count: number;
  }>;
}

export function GenerationAnalytics({ stats, history }: GenerationAnalyticsProps) {
  const chartData = history
    .map((item) => ({
      date: format(new Date(item.timestamp), 'MMM dd'),
      fitness: item.fitness_score,
      conflicts: item.conflicts_count,
    }))
    .reverse();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generation Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Generations</p>
              <p className="text-2xl font-bold">{stats.total_generations}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Fitness</p>
              <p className="text-2xl font-bold">{stats.average_fitness.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Best Fitness</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.best_fitness.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Conflicts</p>
              <p className="text-2xl font-bold">{stats.average_conflicts.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.total_generations > 0
                  ? ((stats.success_count / stats.total_generations) * 100).toFixed(1)
                  : 0}
                %
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-bold text-red-600">{stats.failed_count}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Fitness Score Trends</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="fitness"
                    stroke="#22c55e"
                    name="Fitness Score"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="conflicts"
                    stroke="#ef4444"
                    name="Conflicts"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No data available for chart</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

