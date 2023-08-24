"use client";

import { NextPage } from "next";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
    children: ReactNode;
    session: Session | null | undefined;
}

const Provider: NextPage<Props> = ({ children, session }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
