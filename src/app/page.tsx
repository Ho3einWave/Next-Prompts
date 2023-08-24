import { NextPage } from "next";
import Feed from "@/components/Feed";
interface Props {}

const Home: NextPage<Props> = ({}) => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="blue_gradient text-center">
                    {" "}
                    AI-Powered Prompts
                </span>
            </h1>
            <p className="desc text-center">
                Next Prompts is a open-source AI prompting tool for modern world
                to discover, create and share creative prompts
            </p>
            <Feed />
        </section>
    );
};

export default Home;
