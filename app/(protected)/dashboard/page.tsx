'use client';

import { useDashboardStats, useSectionStatus, useGenerationHistory } from '@/lib/hooks/use-dashboard-query';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { SystemReadiness } from '@/components/dashboard/system-readiness';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { AssignmentStatus } from '@/components/dashboard/assignment-status';
import { SectionStatus } from '@/components/dashboard/section-status';
import { DepartmentBreakdown } from '@/components/dashboard/department-breakdown';
import { TimeSlotDistribution } from '@/components/dashboard/time-slot-distribution';
import { RoomUtilization } from '@/components/dashboard/room-utilization';
import { InstructorWorkload } from '@/components/dashboard/instructor-workload';
import { GenerationHistory } from '@/components/dashboard/generation-history';
import { GenerationAnalytics } from '@/components/dashboard/generation-analytics';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { data: sectionStatus, isLoading: sectionStatusLoading } = useSectionStatus();
  const { data: generationHistory } = useGenerationHistory({ limit: 5 });

  if (statsLoading) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        <div className="grid gap-4">
          <div className="h-32 bg-secondary animate-pulse rounded-lg" />
          <div className="h-64 bg-secondary animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">Failed to load dashboard data. Please try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your class routine optimization system
        </p>
      </div>

      {/* Statistics Cards */}
      <StatsCards counts={stats.counts} />

      {/* System Readiness and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <SystemReadiness readiness={stats.readiness} />
        <QuickActions />
      </div>

      {/* Assignment Status */}
      <AssignmentStatus assignments={stats.assignments} />

      {/* Section Status */}
      {!sectionStatusLoading && sectionStatus && (
        <SectionStatus sectionStatus={sectionStatus} />
      )}

      {/* Charts and Visualizations */}
      <div className="grid gap-4">
        <TimeSlotDistribution utilization={stats.utilization} />
        <RoomUtilization utilization={stats.utilization} />
        <InstructorWorkload utilization={stats.utilization} />
        <DepartmentBreakdown utilization={stats.utilization} counts={stats.counts} />
      </div>

      {/* Generation History and Analytics */}
      <div className="grid gap-4">
        {generationHistory && (
          <>
            <GenerationAnalytics
              stats={stats.generation_history}
              history={generationHistory.results.map((item) => ({
                timestamp: item.timestamp,
                fitness_score: item.fitness_score,
                conflicts_count: item.conflicts_count,
              }))}
            />
            <GenerationHistory history={generationHistory.results} />
          </>
        )}
      </div>
    </div>
  );
}
