'use server';
import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { SignUpSchema } from '@/schemas';
import { prisma } from '@/lib/prisma';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof SignUpSchema>) => {
    const validatedFields = SignUpSchema.safeParse(values);

    if(!validatedFields.success) {
        return {
            error: "Invalid Fields"
        };
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return {
            error: "Email already exists"
        }
    }

    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation Email has been sent." };
}