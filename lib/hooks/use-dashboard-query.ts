'use client';

import { useQuery } from '@tanstack/react-query';
import dashboardService from '@/lib/services/dashboard.service';
import {
  DashboardStatsDto,
  SectionStatusDto,
  GenerationHistoryResponseDto,
} from '@/lib/dtos/dashboard.dto';

export function useDashboardStats() {
  return useQuery<DashboardStatsDto>({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardService.getDashboardStats(),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
}

export function useSectionStatus() {
  return useQuery<SectionStatusDto>({
    queryKey: ['dashboard', 'section-status'],
    queryFn: () => dashboardService.getSectionStatus(),
    refetchInterval: 30000,
    staleTime: 10000,
  });
}

export function useGenerationHistory(params?: {
  limit?: number;
  offset?: number;
  date_from?: string;
  date_to?: string;
}) {
  return useQuery<GenerationHistoryResponseDto>({
    queryKey: ['dashboard', 'generation-history', params],
    queryFn: () => dashboardService.getGenerationHistory(params),
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000,
  });
}

