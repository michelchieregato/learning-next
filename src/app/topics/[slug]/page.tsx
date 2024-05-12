import { db } from '@/db';
import { notFound } from 'next/navigation';
import React from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import PostCreateForm from '@/components/posts/post-creation-form';
import PostList from '@/components/posts/post-list';
import { fetchPostsByTopic } from '@/db/queries/posts';

interface TopicShowProps {
    params: {
        slug: string;
    }
}

export default async function TopicShow({ params }: TopicShowProps) {
    const { slug } = params;

    const topic = await db.topic.findUnique({
        where: {
            slug: slug,
        },
    });

    if (!topic) {
        notFound();
    }

    const fetchPostFunction = fetchPostsByTopic.bind(slug);

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-3">
                <h1 className="text-2xl font-bold mb-2">
                    {topic.slug}
                </h1>
                <span>
                    {topic.description}
                </span>
            </div>
            <div>
                <Popover placement="left">
                    <PopoverTrigger>
                        <Button color="primary">
                            New Post
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PostCreateForm topicId={topic.id}/>
                    </PopoverContent>
                </Popover>
            </div>

            <PostList fetchFunction={fetchPostFunction}></PostList>
        </div>

    )
}
