import { NextPage } from "next";
import { ISODateString, Session } from "next-auth";
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

interface Props {
    name: string;
    desc: string;
    data: PostType[];
    handleEdit: (post: PostType) => void;
    handleDelete: (post: PostType) => void;
}

const Profile: NextPage<Props> = ({
    data,
    desc,
    name,
    handleDelete,
    handleEdit,
}) => {
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
            </h1>
            <p className="desc">{desc}</p>
            <div className="mt-16 prompt_layout">
                {data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Profile;
