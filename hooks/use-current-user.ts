import { useSession } from "next-auth/react";
import { cookies } from 'next/headers';

export const useCurrentUser = () => {
    const session = useSession();

    return session.data?.user;
};