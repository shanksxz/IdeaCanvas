"use server"

import { getServerAuthSession } from '~/server/auth';
import { db as prisma } from '~/server/db';
import { Response } from '~/utils';

export const authenticateUser = async () => {
    try {
        const session = await getServerAuthSession();

        console.log('session inside main', session);

        if (!session?.user?.email) {
            return Response(401, 'Unauthorized', null);
        }

        const user = await prisma.user.findFirst({
            where: {
                email : session.user.email,
            },
        });

        if (!user) {
            return Response(404, 'User not found', null);
        }

        return Response(200, 'User authenticated', user);
    } catch (error) {
        return Response(500, 'Error authenticating user', null);
    }
}