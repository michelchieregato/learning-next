import React from 'react';
import TopicCreateForm from '@/components/topics/topic-create-form';
import { Avatar, Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import TopicList from '@/components/topics/topic-list';
import PostList from '@/components/posts/post-list';
import { fetchTopPosts } from '@/db/queries/posts';


export default function Home() {
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-3">
                <h1 className="text-xl m-2">Top Posts</h1>
                <PostList fetchFunction={fetchTopPosts}></PostList>
            </div>
            <div className="border shadow px-2 py-3">
                <Popover placement="left">
                    <PopoverTrigger>
                        <Button color="primary">
                            New Post
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <TopicCreateForm/>
                    </PopoverContent>
                </Popover>
                <Divider className="my-2"></Divider>
                <h3 className="text-lg">
                    Topics
                </h3>
                <TopicList/>
            </div>
        </div>
    );
}
