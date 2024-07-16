import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { z } from "zod";


const postSchema = z.object({
    title: z.string(),
    content: z.string(),
    img: z.string()
});

const paramsSchema = z.object({
    params : z.object({
        postid: z.string()
    })
});

export async function GET(
    req: Request,
    context : z.infer<typeof paramsSchema>
) {
    try {
        const { params } = paramsSchema.parse(context);

        // get user's posts
        const posts = await db.post.findMany({
            where: {
                authorId: params.postid
            }
        })

        return new Response(JSON.stringify(posts), {status: 200})

    } catch (error) {

        if(error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), {status: 400})
        }

        return new Response(JSON.stringify(null), {status: 500})        
    }
}

export async function DELETE(
    req: Request,
    context : z.infer<typeof paramsSchema>
) {
    try {

        const { params } = paramsSchema.parse(context);
        
        // check if user is authorized
        if(!await verifyUser(context.params.postid)) {
            return new Response(JSON.stringify({message: "Unauthorized"}), {status: 401})
        }

        await db.post.delete({
            where: {
                id: params.postid
            }
        })

        return new Response(JSON.stringify({message: "Post deleted"}), {status: 200})

    } catch (error) {
        if(error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), {status: 400})
        }

        return new Response(JSON.stringify(null), {status: 500})
    }
}

export async function PATCH(
    req: Request,
    context : z.infer<typeof paramsSchema>
) {
    try {
        const { params } = paramsSchema.parse(context);

        // check if user is authorized
        if(!await verifyUser(context.params.postid)) {
            return new Response(JSON.stringify({message: "Unauthorized"}), {status: 401})
        }

        const data = await req.json();
        const {
            title,
            content,
            img        
        } = postSchema.parse(data);

        await db.post.update({
            where: {
                id: params.postid
            },
            data: {
                title,
                content,
                img
            }
        })

        return new Response(JSON.stringify({message: "Post updated"}), {status: 200})

    } catch (error) {
        if(error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), {status: 400})
        }

        return new Response(JSON.stringify(null), {status: 500})
    }
}



async function verifyUser(postId : string) {
    const session = await getServerAuthSession();
    if(!session) return false;
    const count = await db.post.count({
        where: {
            authorId: session.user.id,
            id: postId
        }
    }) // count all posts
    return count > 0;
}