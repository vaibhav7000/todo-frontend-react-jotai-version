import * as z from "zod";

const emailSchema = z.object({
    email: z.string().email()
})

const passwordSchema = z.object({
    password: z.string().trim().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
})

export {
    emailSchema, passwordSchema
}