import { db } from '@/db';
import { Post, Topic, User } from '@prisma/client';

export type PostsWithData = Post & {
    _count: { comments: number },
    user: User,
    topic: Topic,
};

export const fetchPostsBySearchTerm = async (term: string): Promise<PostsWithData[]> => {
    return db.post.findMany( {
        include: {
            topic: true,
            user: true,
            _count: { select: { comments: true} },
        },
        take: 20,
        where: {
            OR: [
                { title: { contains: term } },
                { content: { contains: term } },
            ]
        },
    });
}

export const fetchTopPosts = async (): Promise<PostsWithData[]> => {
    return db.post.findMany( {
        orderBy: {
            comments: {
                _count: 'desc',
            }
        },
        include: {
            topic: true,
            user: true,
            _count: { select: { comments: true} },
        },
        take: 20,
    });
}

export const fetchPostsByTopic = async (slug?: string): Promise<PostsWithData[]> => {
    return db.post.findMany({
        where: {
            topic: {
                slug,
            }
        },
        include: {
            topic: true,
            user: true,
            _count: { select: { comments: true} },
        },
        take: 5,
    });
}
