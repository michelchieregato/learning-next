'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
    const session = useSession();
    console.log('Ao menos uma vez aquiii');

    if (session.data?.user) {
        return <div>
            User { session.data.user.name } is signed in.
        </div>
    }
    return <div>
        User not signed in.
    </div>
}
