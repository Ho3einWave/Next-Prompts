"use client";

import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { ISODateString, Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@/components/Profile";

interface Props {}

type PostType = {
    _id: string;
    creator: {
        image: string;
        username: string;
        email: string;
        _id: string;
    };
    prompt: string;
    tag: string;
};

interface pSessionType extends Session {
    user?: {
        id?: string | null | undefined;
        email?: string | null | undefined;
        name?: string | null | undefined;
        image?: string | null | undefined;
    };
    expires: ISODateString;
}

const Page: NextPage<Props> = ({}) => {
    const { data: session }: { data: pSessionType | null } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            if (session?.user && session.user.id) {
                const res = await fetch(`/api/users/${session.user.id}/posts`);
                const data = await res.json();
                setPosts(data);
            }
        };

        fetchPosts();
    }, []);

    const handleEdit = (post: PostType) => {
        router.push(`/update-prompt?id=${post._id}`);
    };
    const handleDelete = async (post: PostType) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });
                const filterdPosts = posts.filter(
                    (p: PostType) => p._id !== post._id
                );
                setPosts(filterdPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <Profile
            name={"My"}
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default Page;
