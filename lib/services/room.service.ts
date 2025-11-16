import { APIUrl } from '@/lib/constants/url.config';
import { RoomDto, CreateRoomDto, UpdateRoomDto } from '@/lib/dtos/room.dto';
import httpClient from '@/lib/utils/httpClient';

class RoomService {
  async getAll() {
    const res = await httpClient.get<RoomDto[] | { results: RoomDto[] }>(APIUrl.routine.rooms.list());
    // Handle paginated response or direct array
    const data = res.data;
    return Array.isArray(data) ? data : (data as { results: RoomDto[] }).results || [];
  }

  async getById(id: string) {
    const res = await httpClient.get<RoomDto>(APIUrl.routine.rooms.detail(id));
    return res.data;
  }

  async create(data: CreateRoomDto) {
    const res = await httpClient.post<RoomDto>(APIUrl.routine.rooms.list(), data);
    return res.data;
  }

  async update(id: string, data: UpdateRoomDto) {
    const res = await httpClient.put<RoomDto>(APIUrl.routine.rooms.detail(id), data);
    return res.data;
  }

  async delete(id: string) {
    await httpClient.delete(APIUrl.routine.rooms.detail(id));
  }
}

const roomService = new RoomService();

export default roomService;

