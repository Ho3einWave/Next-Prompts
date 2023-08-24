import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session }): Session {},
        async signIn({ profile }) {
            try {
                await connectToDB();

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
});
