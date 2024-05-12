'use client';

import { Input, Textarea } from '@nextui-org/react';
import { createTopic } from '@/actions/topic';
import { useFormState } from 'react-dom';
import FormButton from '@/components/common/form-button';

export default function TopicCreateForm() {
    const [formState, action] = useFormState(createTopic, { errors: {} });

    return (
        <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
                <h3 className="text-lg"> Create a Topic </h3>

                <Input type="text" name="slug" label="Topic" placeholder="Name" labelPlacement="outside"
                       isInvalid={!!formState.errors?.slug} errorMessage={formState.errors?.slug?.join(',')}/>
                <Textarea type="text" name="description" label="Description" labelPlacement="outside"
                          placeholder="Enter description"
                          isInvalid={!!formState.errors?.description}
                          errorMessage={formState.errors?.description?.join(',')}/>
                <FormButton>
                    <span>
                        Submit
                    </span>
                </FormButton>
                { formState.errors?._form ? <div className="p-2 bg-red-200 border border-red-400 rounded"> formState.errors._form.join(',')</div>: null }
            </div>
        </form>
    )
}
