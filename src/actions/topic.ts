'use server';

import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';

const topicSchema = z.object({
    slug: z.string().min(3).regex(/^[a-z-]+$/, { message: 'Must match my regex!' }),
    description: z.string().min(10),
});

interface TopicFormState {
    errors?: {
        slug?: string[],
        description?: string[],
        _form?: string[],
    }
}

export async function createTopic(formState: TopicFormState, formData: FormData): Promise<TopicFormState> {
    const session = await auth();

    await new Promise(resolve => setTimeout(resolve, 5000));

    const validateData = topicSchema.safeParse({
        slug: formData.get('slug'),
        description: formData.get('description'),
    });

    if (!validateData.success) {
        return { errors: validateData.error.flatten().fieldErrors };
    } else if (!session?.user) {
        return {
            errors: {
                _form: ["You must be signed in to edit stuff"],
            },
        }
    }

    let topic;
    try {
        topic = await db.topic.create({
            data: { slug: validateData.data.slug, description: validateData.data.description },
        });
    } catch (error) {
        return {
            errors: {
                _form: ['Error creating'],
            }
        }
    }


    revalidatePath(paths.home());
    redirect(paths.topicShow(topic.id));
}
