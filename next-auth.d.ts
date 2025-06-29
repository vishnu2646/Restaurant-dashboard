import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole
    isTwoFactorEnabled: boolean,
    phone: string
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER";
    }
}