"use client";

import { NextPage } from "next";
import { useState, useEffect, ChangeEvent } from "react";
import PromptCard from "./PromptCard";

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

const PromptCardList = ({
    data,
    handleTagClick,
}: {
    data: PostType[];
    handleTagClick: (tag: string) => void;
}) => {
    return (
        <div className="mt-16 prompt_layout">
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
    const [searchTimeout, setSearchTimeout] = useState<ReturnType<
        typeof setTimeout
    > | null>(null);
    const [posts, setPosts] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const filterPrompts = (searchtext: string) => {
        const regex = new RegExp(searchtext, "i");

        return posts.filter(
            (item: PostType) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const sResult = filterPrompts(e.target.value);
                setSearchResult(sResult);
            }, 500)
        );
    };
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("/api/prompt");
            const data = await res.json();
            setPosts(data);
            setSearchResult(data);
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

            <PromptCardList
                data={searchResult}
                handleTagClick={(tag: string) => {
                    setSearchText(tag);
                    const sResult = filterPrompts(tag);
                    setSearchResult(sResult);
                }}
            />
        </section>
    );
};

export default Feed;
