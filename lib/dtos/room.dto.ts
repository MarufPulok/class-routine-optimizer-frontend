export interface RoomDto {
  id: string;
  r_number: string;
  seating_capacity: number;
  created_at: string;
  updated_at: string;
}

export interface CreateRoomDto {
  r_number: string;
  seating_capacity: number;
}

export interface UpdateRoomDto {
  r_number?: string;
  seating_capacity?: number;
}

