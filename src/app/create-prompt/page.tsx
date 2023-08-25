"use client";

import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { useSession, UseSessionOptions } from "next-auth/react";
import { Session, ISODateString } from "next-auth";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

interface Props {}
interface pSessionType extends Session {
    user?: {
        id?: string | null | undefined;
        email?: string | null | undefined;
        name?: string | null | undefined;
        image?: string | null | undefined;
    };
    expires: ISODateString;
}

const CreatePrompt: NextPage<Props> = ({}) => {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const { data: session }: { data: pSessionType | null } = useSession();
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (session && session.user && session?.user.email) {
                const res = await fetch("/api/prompt/new", {
                    method: "POST",
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session.user.id,
                        tag: post.tag,
                    }),
                });

                if (res.ok) {
                    router.push("/");
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSumbit={createPrompt}
        />
    );
};

export default CreatePrompt;
