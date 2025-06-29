'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/token';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { prisma } from '@/lib/prisma';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);

    if(!validateFields.success) {
        return {
            error: "Invalid Fields"
        };
    }

    const { email, password, code } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not existis." };
    }

    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email as string);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Conformation email sent!." }
    }

    if(existingUser.isTwoFactorEnabled && existingUser.email) {
        if(code) {
            // verify 2FA code.
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if(!twoFactorToken) {
                return { error: "Invalid code" };
            }

            if(twoFactorToken.token !== code) {
                return { error: "Invalid code" };
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if(hasExpired) {
                return { error: "Code expired" };
            }

            await prisma.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id,
                }
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if(existingConfirmation) {
                await prisma.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id,
                    }
                })
            }

            await prisma.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            });
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email as string);
            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token
            );

            return { twoFactor: true };
        }

    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        return { success: "Logged in successfully" }
    } catch (error) {
        console.log(error);
        if(error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid Credentials"
                    }
                default:
                    return {
                        error: "Seomething went wrong."
                    }
            }
        }

        throw error;
    }
}