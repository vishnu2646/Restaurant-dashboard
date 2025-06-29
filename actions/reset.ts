'use server';

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import * as z from 'zod';
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validFields = ResetSchema.safeParse(values);

    if (!validFields.success) {
        return { error: "Invalid email!" };
    }

    const { email } = validFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser) {
        return { error: "Email not found!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return { success: "Reset email has been sent." }
}