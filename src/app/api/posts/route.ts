import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { z } from "zod";

const postSchema = z.object({
    title: z.string(),
    content: z.string(),
    img: z.string()
});


export async function GET() {
    // get user's posts
    try {
        // get session from auth
        const session = await getServerAuthSession();

        if(!session) return new Response(JSON.stringify({message: "Unauthorized"}), {status: 401})
        
        // extract user from session
        const { user } = session;

        // get user's posts
        const posts = await db.post.findMany({
            where: {
                authorId: user.id
            }
        })

        return new Response(JSON.stringify(posts), {status: 200})

    } catch (error) {
        return new Response(JSON.stringify({message: "Error getting posts"}), {status: 500})        
    }
}

export async function POST(req: Request) {
    // create a post
    try {
        // get session from auth
        const session = await getServerAuthSession();
        if(!session) return new Response(JSON.stringify({message: "Unauthorized"}), {status: 401})

        // extract user from session
        const { user } = session;

        // get data from request
        const data = await req.json();

        // validate data
        const {
            title,
            content,
            img
        } = postSchema.parse(data);

        // create post
        const post = await db.post.create({
            data: {
                title,
                content,
                img,
                authorId: user.id
            }
        })

        return new Response(JSON.stringify(post), {status: 201})
    } catch (error) {
        
    }
}