"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

type PostType = {
    _id: string;
    creator: {
        image: string;
        username: string;
        email: string;
        id: string;
    };
    prompt: string;
    tag: string;
};

const PromptCardList = ({ data, handleTagClick }: { data: PostType[] }) => {
    return (
        <div className="mt-16 prompt-layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

interface Props {}

const Feed: NextPage<Props> = ({}) => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const handleSearchChange = (e) => {};
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("/api/prompt");
            const data = await res.json();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a user"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList data={posts} handleTagClick={() => {}} />
        </section>
    );
};

export default Feed;
