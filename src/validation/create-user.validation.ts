import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(4, "A senha deve ter no mínimo 6 caracteres")
    .nonempty("O campo de senha é obrigatório"),
      email: z.string().email().nonempty("O campo de email é obrigatório"),
  password: z
    .string()
    .min(4, "A senha deve ter no mínimo 6 caracteres")
    .nonempty("O campo de senha é obrigatório"),
});