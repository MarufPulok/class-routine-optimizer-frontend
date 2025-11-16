'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import roomService from '@/lib/services/room.service';
import { RoomDto, CreateRoomDto, UpdateRoomDto } from '@/lib/dtos/room.dto';
import { toast } from 'sonner';

export function useRooms() {
  return useQuery<RoomDto[]>({
    queryKey: ['rooms'],
    queryFn: async () => {
      const data = await roomService.getAll();
      return Array.isArray(data) ? data : [];
    },
    staleTime: 30000,
  });
}

export function useRoom(id: string | null) {
  return useQuery<RoomDto>({
    queryKey: ['rooms', id],
    queryFn: () => (id ? roomService.getById(id) : Promise.reject(new Error('No ID provided'))),
    enabled: !!id,
    staleTime: 30000,
  });
}

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoomDto) => roomService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'stats'] });
      toast.success('Room created successfully');
    },
    onError: (error: any) => {
      const errorData = error?.response?.data;
      let message = 'Failed to create room';
      
      if (errorData?.error) {
        message = errorData.error;
      } else if (errorData?.r_number && Array.isArray(errorData.r_number)) {
        message = errorData.r_number[0];
      } else if (errorData?.r_number) {
        message = errorData.r_number;
      } else if (errorData?.details) {
        message = errorData.details;
      }
      
      toast.error(message);
    },
  });
}

export function useUpdateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoomDto }) =>
      roomService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'stats'] });
      toast.success('Room updated successfully');
    },
    onError: (error: any) => {
      const errorData = error?.response?.data;
      let message = 'Failed to update room';
      
      if (errorData?.error) {
        message = errorData.error;
      } else if (errorData?.r_number && Array.isArray(errorData.r_number)) {
        message = errorData.r_number[0];
      } else if (errorData?.r_number) {
        message = errorData.r_number;
      } else if (errorData?.details) {
        message = errorData.details;
      }
      
      toast.error(message);
    },
  });
}

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => roomService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'stats'] });
      toast.success('Room deleted successfully');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || 'Failed to delete room';
      toast.error(message);
    },
  });
}

