import { prisma } from "@/lib/prisma";

export const getPassowrdResetTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findUnique({
            where: { token }
        });

        return passwordResetToken;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getPassowrdResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findFirst({
            where: { email }
        });

        return passwordResetToken;
    } catch (error) {
        console.error(error);
        return null;
    }
}