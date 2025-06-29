import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}