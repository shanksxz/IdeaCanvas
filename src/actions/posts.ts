"use server"

import { authenticateUser } from "./auth";
import { db } from "~/server/db";
import { z } from "zod";
import { Response } from "~/utils";

const postSchema = z.object({
    title: z.string(),
    content: z.string(),
    img: z.string().optional()
});

export const createPost = async ( foo : z.infer<typeof postSchema>) => {
    try {
       
        const session = await authenticateUser();

        console.log("session", session);

        if(session.status !== 200) {
            return Response(session.status, session.message, null);
        }

        // validate data
        const { title, content, img } = postSchema.parse(foo);

        const post = await db.post.create({
            data : {
                title,
                content,
                authorId : session.data?.id as string,
                img, 
            }
        })

        return Response(200, "Post created successfully", post);

    } catch (error) {
        if(error instanceof z.ZodError) {
            return Response(400, "Bad request", error.issues);
        }

        return Response(500, "Internal server error", null);
    }
}

export const getPosts = async () => {
    try {

        const session = await authenticateUser();
        if(session.status !== 200) {
            return Response(session.status, session.message, null);
        }

        const blogs = await db.post.findMany({
            where : {
                authorId : session.data?.id
            }
        });

        return Response(200, "Posts fetched successfully", blogs);

    } catch (error) {
        return Response(500, "Internal server error", null);
    }
}

export const deletePost = async (postid : string) => {
    try {

        // check if user is authorized
        const user = verifyUser(postid);

        if(!user) {
            return Response(401, "Unauthorized", null);
        }

        await db.post.delete({
            where : {
                id : postid
            }
        });

        return Response(200, "Post deleted successfully", null);

    } catch (error) {
        return Response(500, "Internal server error", null);
    }
}

export const getPost = async (postid : string) => {
    try {

        const user = await authenticateUser();
        if(user.status !== 200) {
            return Response(user.status, user.message, null);
        }

        const post = await db.post.findFirst({
            where : {
                id : postid,
            }
        });

        if(!post) {
            return Response(404, "Post not found", null);
        }

        return Response(200, "Post fetched successfully", post);
    } catch (error) {
        return Response(500, "Internal server error", null);
    }
}


export const getAllBlogs = async() => {
    // get all the blogs except for the curr user's 
    try {

        const session = await authenticateUser();
        if(session.status !== 200) {
            return Response(session.status, session.message, null);
        }

        const blogs = await db.post.findMany({
            where : {
                authorId : {
                    not : session.data?.id
                }
            }
        });

        return Response(200, "Posts fetched successfully", blogs);

    } catch (error) {
        return Response(500, "Internal server error", null);
    }
}


async function verifyUser(postid: string) {
    try {
        const user = await authenticateUser();
        if(user.status !== 200) {
            return false;
        }

        const post = await db.post.findFirst({
            where: {
                id: postid
            }
        });

        if(!post) {
            return false;
        }

        if(post.authorId !== user.data?.id) {
            return false;
        }
    } catch (error) {
        return false;
    }
}