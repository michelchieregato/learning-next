import Link from 'next/link';
import paths from '@/paths';
import React from 'react';
import { PostsWithData } from '@/db/queries/posts';

interface Props {
    fetchFunction: () => Promise<PostsWithData[]>;
}

async function listPosts(fetchFunction: () => Promise<PostsWithData[]>): Promise<React.ReactNode> {
    const posts = await fetchFunction();

    return posts.map((post) => {
        return (
            <div key={post.id} className="border rounded p-2">
                <Link href={paths.postShow(post.topic.slug, post.id)}>
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <div className="flex flex-row gap-8">
                        <p className="text-xs text-gray-400">By {post.user.name}</p>
                        <p className="text-xs text-gray-400">
                            {post._count.comments} comments
                        </p>
                    </div>
                </Link>
            </div>
        );
    });
}

export default async function PostList({fetchFunction}: Props) {
    return <div className="space-y-2">{ await listPosts(fetchFunction)}</div>;
}
