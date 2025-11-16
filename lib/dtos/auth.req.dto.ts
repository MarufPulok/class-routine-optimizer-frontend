import { z } from "zod";
import { loginSchema, registerSchema } from "@/validators/auth.validator";

export type LoginRequestDto = z.infer<typeof loginSchema>;

export type RegisterRequestDto = z.infer<typeof registerSchema>;

