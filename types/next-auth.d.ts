import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            email: string;
            name: string;
            isAdmin: boolean;
            accessToken: string;
        };
    }

    interface User {
        id: number;
        email: string;
        name: string;
        isAdmin: boolean;
        accessToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: number;
        email: string;
        name: string;
        isAdmin: boolean;
        accessToken: string;
    }
}