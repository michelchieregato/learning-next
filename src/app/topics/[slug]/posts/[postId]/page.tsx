import Link from "next/link";
import paths from "@/paths";
import React, { Suspense } from 'react';
import PostShow from '@/components/posts/post-show';
import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import { fetchCommentsByPostId } from '@/db/queries/comment';
import PostShowLoading from '@/components/posts/post-show-loading';

interface PostShowPageProps {
    params: {
        slug: string;
        postId: string;
    };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
    const { slug, postId } = params;

    return (
        <div className="space-y-3">
            <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
                {"< "}Back to {slug}
            </Link>
            <Suspense fallback={<PostShowLoading></PostShowLoading>}>
             <PostShow postId={params.postId}/>
            </Suspense>
             <CommentCreateForm postId={postId} startOpen />
             <CommentList postId={postId} />
        </div>
    );
}
