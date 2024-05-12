'use server';

import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';

const postSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

interface PostFormState {
    errors?: {
        title?: string[],
        content?: string[],
        _form?: string[],
    }
}

export async function createPost(topicId: string, formState: PostFormState, formData: FormData): Promise<PostFormState> {
    const session = await auth();

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(1);
    const validateData = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });

    console.log(2);
    if (!validateData.success) {
        console.log('a');
        return { errors: validateData.error.flatten().fieldErrors };
    } else if (!session?.user) {
        console.log('b');
        return {
            errors: {
                _form: ['You must be signed in to edit stuff'],
            },
        }
    }
    console.log(3);
    let post;
    try {
        console.log(4);
        post = await db.post.create({
            data: {
                title: validateData.data.title,
                content: validateData.data.content,
                userId: session.user.id,
                topicId: topicId,
            },
            include: {
                topic: true,
            }
        });
        console.log(post);
        console.log('Criado!!!');
    } catch (error) {
        console.log(5);
        return {
            errors: {
                _form: ['Error creating'],
            },
        }
    }

    console.log(6);

    revalidatePath(paths.topicShow(post.topic.slug));
    redirect(paths.postShow(post.topic.slug, post.topic.id));
}
