import { z } from 'zod' 

export const userSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(3),
        clientId: z.number(),
    })
})

export type UserSchema = z.infer<typeof userSchema>;