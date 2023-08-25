import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextRequest } from "next/server";

interface Props {
    params: {
        id: string;
    };
}

export const GET = async (req: NextRequest, { params }: Props) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({ creator: params.id })
            .populate("creator")
            .exec();
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};
