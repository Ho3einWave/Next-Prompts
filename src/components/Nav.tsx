"use client";

import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
    signIn,
    signOut,
    useSession,
    getProviders,
    LiteralUnion,
    ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
interface Props {}

const Nav: NextPage<Props> = ({}) => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState<Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null>(null);

    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const loadProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        loadProviders();
    }, []);
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href={"/"} className="flex gap-2 flex-center">
                <Image
                    className="object-contain"
                    width={30}
                    height={30}
                    src={"/assets/images/logo.svg"}
                    alt="Next Prompts Logo"
                />
                <p className="logo_text">Next Prompts</p>
            </Link>
            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href={"/create-prompt"} className="black_btn">
                            Create Post
                        </Link>
                        <button
                            type="button"
                            onClick={() => {
                                signOut();
                            }}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>
                        <Link href={"/profile"}>
                            <Image
                                src={
                                    session.user && session.user.image
                                        ? session.user.image
                                        : "/assets/images/logo.svg"
                                }
                                height={37}
                                width={37}
                                className="rounded-full"
                                alt="User profile"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={
                                session.user && session.user.image
                                    ? session.user.image
                                    : "/assets/images/logo.svg"
                            }
                            height={37}
                            width={37}
                            className="rounded-full"
                            alt="User profile"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href={"/profile"}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href={"/create-prompt"}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
