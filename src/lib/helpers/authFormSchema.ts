import { z } from "zod";
import { FormType } from "../types/formType";

export const authFormSchema = (formType: FormType) => {
    return z.object({
        mobile:
            formType === "log-in"
                ? z.number().min(10).max(15)
                : z.string().optional(),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(16, "Password cannot be longer than 16 characters")
            .regex(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            )
            .regex(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            )
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special character"
            )
            .optional(),
    });
};
