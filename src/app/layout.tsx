import { NextPage } from "next";
import { ReactNode } from "react";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/globals.css";

export const metadata = {
    title: "Next Prompts",
    description: "Discover & Share AI Prompts",
};

interface Props {
    children: ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider session={undefined}>
                    <div className="main">
                        <div className="gradient"></div>
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default Layout;
