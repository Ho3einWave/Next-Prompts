import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextRequest } from "next/server";
interface Props {
    params: {
        id: string;
    };
}
// GET (read)
export const GET = async (req: NextRequest, { params }: Props) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id)
            .populate("creator")
            .exec();
        if (!prompt) return new Response("Prompt not found", { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch the prompt", { status: 500 });
    }
};

export const PATCH = async (req: NextRequest, { params }: Props) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id).exec();
        if (!prompt) return new Response("Prompt not found", { status: 404 });
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to update the prompt", { status: 500 });
    }
};

export const DELETE = async (req: NextRequest, { params }: Props) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id).exec();

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete the prompt", { status: 500 });
    }
};
