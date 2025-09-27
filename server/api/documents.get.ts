import prisma from '../utils/prisma';

export default defineEventHandler(async () => {
    return await prisma.document.findMany({
        select: {
            id: true,
            filename: true,
            content_raw: true,
            content: true,
        },
        orderBy: { createdAt : 'desc' },
    });
});