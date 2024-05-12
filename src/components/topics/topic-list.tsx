import { db } from '@/db';
import React from 'react';
import Link from 'next/link';
import paths from '@/paths';
import { Chip } from '@nextui-org/chip';

async function listTopics(): Promise<React.ReactNode> {
    const topics = await db.topic.findMany();
    return topics.map((topic) => {
        return <Link key={topic.id} href={paths.topicShow(topic.slug)}>
            <Chip color="warning" variant="shadow">
                { topic.slug }
            </Chip>
        </Link>
    });
}

export default async function TopicList() {
    const topics = await listTopics();

    return (
        <div className="flex flex-col gap-2">
            { topics }
        </div>
    )
}
