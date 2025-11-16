"use client";

import { DeleteRoomDialog } from "@/components/rooms/delete-room-dialog";
import { RoomForm } from "@/components/rooms/room-form";
import { RoomsList } from "@/components/rooms/rooms-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoomDto } from "@/lib/dtos/room.dto";
import {
  useCreateRoom,
  useDeleteRoom,
  useRooms,
  useUpdateRoom,
} from "@/lib/hooks/use-room-query";
import { RoomFormData } from "@/validators/room.validator";
import { useState } from "react";

export default function RoomsPage() {
  const [editingRoom, setEditingRoom] = useState<RoomDto | null>(null);
  const [deletingRoom, setDeletingRoom] = useState<RoomDto | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: rooms = [], isLoading } = useRooms();
  const createMutation = useCreateRoom();
  const updateMutation = useUpdateRoom();
  const deleteMutation = useDeleteRoom();

  const handleCreate = () => {
    setEditingRoom(null);
    setShowForm(true);
  };

  const handleEdit = (room: RoomDto) => {
    setEditingRoom(room);
    setShowForm(true);
  };

  const handleDelete = (room: RoomDto) => {
    setDeletingRoom(room);
  };

  const handleFormSubmit = (data: RoomFormData) => {
    if (editingRoom) {
      updateMutation.mutate(
        {
          id: editingRoom.id,
          data,
        },
        {
          onSuccess: () => {
            setShowForm(false);
            setEditingRoom(null);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingRoom(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingRoom) {
      deleteMutation.mutate(deletingRoom.id, {
        onSuccess: () => {
          setDeletingRoom(null);
        },
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Room Management</h2>
        <p className="text-muted-foreground">
          Manage rooms and their seating capacities
        </p>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingRoom ? "Edit Room" : "Create New Room"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RoomForm
              room={editingRoom}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </CardContent>
        </Card>
      ) : (
        <RoomsList
          rooms={rooms}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          isLoading={isLoading}
        />
      )}

      <DeleteRoomDialog
        room={deletingRoom}
        open={!!deletingRoom}
        onOpenChange={(open) => !open && setDeletingRoom(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
