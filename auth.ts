import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/sign-in",
        error: "/error",
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: {id: user.id},
                data: {
                    emailVerified: new Date(),
                }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if(account?.provider !== 'credentials') return true;

            const existingUser = await getUserById(user.id as string);

            if(!existingUser?.emailVerified) return false;

            if(existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if(!twoFactorConfirmation) return false;

                // Delete two factor confirmation for next sign in.
                await prisma.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });
            };

            return true;
        },
        async session({ token, session }) {
            if(token.sub && session.user) {
                session.user.id = token.sub;
            }

            if(token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if(session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
                session.user.phone = token.phone as string;
            }

            return session;
        },
        async jwt({ token }) {
            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if(!existingUser) return token;

            token.role = existingUser.role;

            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

            token.phone = existingUser.phone;

            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig,
})