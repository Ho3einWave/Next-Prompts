import NextAuth, { ISODateString, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

interface pSessionType extends Session {
    user?: {
        id?: string | null | undefined;
        email?: string | null | undefined;
        name?: string | null | undefined;
        image?: string | null | undefined;
    };
    expires: ISODateString;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            httpOptions: {
                timeout: 10000,
            },
        }),
    ],
    callbacks: {
        async session({ session }: { session: pSessionType }) {
            if (session && session.user) {
                const sessionUser = await User.findOne({
                    email: session.user.email,
                });
                session.user.id = sessionUser._id.toString();
                return session;
            }
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                const userExists = User.findOne({
                    email: profile?.email,
                });
                console.log(userExists);
                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name
                            ?.replace(" ", "")
                            .toLocaleLowerCase(),
                        image: profile?.image,
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
