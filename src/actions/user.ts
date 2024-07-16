"use server"
import { db } from "~/server/db"
import { Response } from "~/utils"

export const getUser = async( id: string) => {
    try {

        const user = await db.user.findFirst({
            where : {
                id
            }
        })

        if(!user) {
            return Response(404, "User not found", null)
        }

        return Response(200, "User fetched successfully", user)

    } catch (error) {
        return Response(500, "Internal server error", null)
    }
}