'use client';

import { Input, Textarea } from '@nextui-org/react';
import { useFormState } from 'react-dom';
import FormButton from '@/components/common/form-button';
import { createPost } from '@/actions/posts';

export default function PostCreateForm({ topicId }: { topicId: string }) {
    const [formState, action] = useFormState(createPost.bind(null, topicId), { errors: {} });

    return (
        <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
                <h3 className="text-lg"> Create a Post </h3>

                <Input type="text" name="title" label="Title" placeholder="Title" labelPlacement="outside"
                       isInvalid={!!formState?.errors?.title} errorMessage={formState?.errors?.title?.join(',')}/>
                <Textarea type="text" name="content" label="Content" labelPlacement="outside"
                          placeholder="Enter content"
                          isInvalid={!!formState?.errors?.content}
                          errorMessage={formState?.errors?.content?.join(',')}/>
                <FormButton>
                    <span>
                        Create
                    </span>
                </FormButton>
                { formState?.errors?._form ? <div className="p-2 bg-red-200 border border-red-400 rounded"> formState?.errors._form.join(',')</div>: null }
            </div>
        </form>
    )
}
