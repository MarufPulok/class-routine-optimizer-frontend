'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { roomSchema, RoomFormData } from '@/validators/room.validator';
import { RoomDto } from '@/lib/dtos/room.dto';
import { useEffect } from 'react';

interface RoomFormProps {
  room?: RoomDto | null;
  onSubmit: (data: RoomFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function RoomForm({ room, onSubmit, onCancel, isLoading = false }: RoomFormProps) {
  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      r_number: '',
      seating_capacity: 50,
    },
  });

  useEffect(() => {
    if (room) {
      form.reset({
        r_number: room.r_number,
        seating_capacity: room.seating_capacity,
      });
    } else {
      form.reset({
        r_number: '',
        seating_capacity: 50,
      });
    }
  }, [room, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="r_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Room Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., A101"
                  className="h-11"
                  maxLength={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seating_capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Seating Capacity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="50"
                  className="h-11"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1 h-11"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Saving...' : room ? 'Update Room' : 'Create Room'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

