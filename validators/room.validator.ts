import * as z from 'zod';

export const roomSchema = z.object({
  r_number: z
    .string()
    .min(1, 'Room number is required')
    .max(6, 'Room number must be at most 6 characters')
    .regex(/^[A-Za-z0-9]+$/, 'Room number must be alphanumeric'),
  seating_capacity: z
    .number()
    .int('Seating capacity must be an integer')
    .min(1, 'Seating capacity must be at least 1')
    .max(10000, 'Seating capacity must be at most 10000'),
});

export type RoomFormData = z.infer<typeof roomSchema>;

