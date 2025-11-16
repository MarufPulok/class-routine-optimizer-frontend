import { APIUrl } from '@/lib/constants/url.config';
import {
  DashboardStatsDto,
  SectionStatusDto,
  GenerationHistoryResponseDto,
} from '@/lib/dtos/dashboard.dto';
import httpClient from '@/lib/utils/httpClient';

class DashboardService {
  async getDashboardStats() {
    const res = await httpClient.get<DashboardStatsDto>(APIUrl.routine.dashboard.stats());
    return res.data;
  }

  async getSectionStatus() {
    const res = await httpClient.get<SectionStatusDto>(APIUrl.routine.sections.status());
    return res.data;
  }

  async getGenerationHistory(params?: {
    limit?: number;
    offset?: number;
    date_from?: string;
    date_to?: string;
  }) {
    const res = await httpClient.get<GenerationHistoryResponseDto>(
      APIUrl.routine.dashboard.generationHistory(),
      { params }
    );
    return res.data;
  }
}

const dashboardService = new DashboardService();

export default dashboardService;

