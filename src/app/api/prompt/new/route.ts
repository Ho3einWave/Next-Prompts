import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
export const POST = async (req: Request, res: Response) => {
    const { userId, prompt, tag } = await req.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag }).save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response("Fai1ed to create a new prompt", { status: 500 });
    }
};
