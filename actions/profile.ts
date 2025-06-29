'use server';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { prisma } from '@/lib/prisma';
import { accountSchema } from '@/schemas';

export const profile = async (values: z.infer<typeof accountSchema>) => {
    const validateFields = accountSchema.safeParse(values);

    if(!validateFields.success) {
        return {
            error: "Invalid Fields"
        };
    }

    const { name, image, email, twoFactor, phone } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser) {
        return  { error: 'Email does not exists.' };
    }

    try {
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                email,
                name,
                image,
                isTwoFactorEnabled: twoFactor,
                phone,
            }
        });
        return { success: 'Successfully updated the user profile' }
    } catch (err) {
        console.log(err);
        return { error: "Failed to update the user profile" }
    }
}

export const updatePassword = async (values: any) => {
    try {
        const { email, oldPassword, newPassword, reNewPassword } = values;

        const existingUser = await getUserByEmail(email);

        if(!existingUser || !existingUser.password) {
            return {
                error: "User not found",
            }
        };

        if(newPassword !== reNewPassword) {
            return { error: "Both new password and Re new Password should be same" };
        }

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, existingUser.password);

        if (!isOldPasswordCorrect) {
            return { error: "Old password is incorrect" };
        }

        const newHasedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email },
            data: {
                password: newHasedPassword
            },
        });

        return { success: "Successfully updated the user password" };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update your password" };
    }
}