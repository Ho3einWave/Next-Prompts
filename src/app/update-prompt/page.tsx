"use client";

import { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session, ISODateString } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";

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

const UpdatePrompt: NextPage<Props> = ({}) => {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const { data: session }: { data: pSessionType | null } = useSession();
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${promptId}`);
            const data = await res.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };
        if (promptId) getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        if (!promptId) return alert("prompt ID not found");
        try {
            if (session && session.user && session?.user.email) {
                const res = await fetch(`/api/prompt/${promptId}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        prompt: post.prompt,
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
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSumbit={updatePrompt}
        />
    );
};

export default UpdatePrompt;
