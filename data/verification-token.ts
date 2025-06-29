import { prisma } from "@/lib/prisma";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verifivationToken = await prisma.verificationToken.findFirst({
            where: { email }
        });

        return verifivationToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verifivationToken = await prisma.verificationToken.findFirst({
            where: { token }
        });

        return verifivationToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}