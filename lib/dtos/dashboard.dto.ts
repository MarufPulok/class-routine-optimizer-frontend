export interface CountsDto {
  rooms: number;
  instructors: number;
  courses: number;
  departments: number;
  sections: number;
  meeting_times: number;
  total_seating_capacity: number;
}

export interface AssignmentsDto {
  total_sections: number;
  assigned_sections: number;
  partially_assigned_sections: number;
  unassigned_sections: number;
  completion_percentage: number;
}

export interface RoomUtilizationItemDto {
  sections: number;
  capacity: number;
  utilization_percentage: number;
}

export interface UtilizationDto {
  room_utilization: Record<string, RoomUtilizationItemDto>;
  instructor_workload: Record<string, number>;
  time_slot_distribution: Record<string, number>;
  day_distribution: Record<string, number>;
}

export interface ReadinessDto {
  ready: boolean;
  missing_items: string[];
}

export interface RecentGenerationDto {
  timestamp: string;
  fitness_score: number;
  conflicts_count: number;
  generations_run: number;
  status: 'Success' | 'Failed';
  strategy_type: string;
}

export interface GenerationHistoryStatsDto {
  total_generations: number;
  average_fitness: number;
  best_fitness: number;
  average_conflicts: number;
  success_count: number;
  failed_count: number;
  recent_generations: RecentGenerationDto[];
}

export interface DashboardStatsDto {
  counts: CountsDto;
  assignments: AssignmentsDto;
  utilization: UtilizationDto;
  readiness: ReadinessDto;
  generation_history: GenerationHistoryStatsDto;
}

export interface DepartmentStatusDto {
  total: number;
  fully_assigned: number;
  partially_assigned: number;
  unassigned: number;
}

export interface SectionStatusDto {
  fully_assigned: number;
  partially_assigned: number;
  unassigned: number;
  by_department: Record<string, DepartmentStatusDto>;
}

export interface GenerationHistoryItemDto {
  id: string;
  timestamp: string;
  fitness_score: number;
  conflicts_count: number;
  generations_run: number;
  status: 'Success' | 'Failed';
  strategy_type: string;
  parameters: Record<string, any>;
  created_by: string | null;
  created_at: string;
}

export interface GenerationHistoryResponseDto {
  count: number;
  results: GenerationHistoryItemDto[];
}

