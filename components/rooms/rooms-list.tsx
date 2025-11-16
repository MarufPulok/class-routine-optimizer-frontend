'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RoomDto } from '@/lib/dtos/room.dto';
import { Edit, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface RoomsListProps {
  rooms: RoomDto[];
  onEdit: (room: RoomDto) => void;
  onDelete: (room: RoomDto) => void;
  onCreate: () => void;
  isLoading?: boolean;
}

export function RoomsList({
  rooms,
  onEdit,
  onDelete,
  onCreate,
  isLoading = false,
}: RoomsListProps) {
  // Ensure rooms is always an array
  const roomsArray = Array.isArray(rooms) ? rooms : [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-secondary animate-pulse rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Rooms</CardTitle>
        <Button onClick={onCreate} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Room
        </Button>
      </CardHeader>
      <CardContent>
        {roomsArray.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No rooms found</p>
            <Button onClick={onCreate} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create First Room
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm text-muted-foreground border-b">
              <div className="col-span-3">Room Number</div>
              <div className="col-span-2">Capacity</div>
              <div className="col-span-4">Created</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>
            {roomsArray.map((room) => (
              <div
                key={room.id}
                className="grid grid-cols-12 gap-4 p-4 items-center border-b hover:bg-accent/50 transition-colors"
              >
                <div className="col-span-3 font-medium">{room.r_number}</div>
                <div className="col-span-2">{room.seating_capacity}</div>
                <div className="col-span-4 text-sm text-muted-foreground">
                  {format(new Date(room.created_at), 'MMM dd, yyyy')}
                </div>
                <div className="col-span-3 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(room)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(room)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

