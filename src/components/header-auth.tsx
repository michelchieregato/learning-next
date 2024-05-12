'use client';

import { Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { signIn, signOut } from '@/actions/auth';
import React from 'react';
import { useSession } from 'next-auth/react';

export default function HeaderAuth() {
    const session = useSession();
    if (session?.status === 'loading') {
        return <div> Loading... </div>
    } if (!session?.data?.user) {
        return (
            <>
                <NavbarItem>
                    <form action={signIn}>
                        <Button type="submit" color="secondary" variant="bordered">
                            Sign in
                        </Button>
                    </form>
                </NavbarItem>
                <NavbarItem>
                    <form action={signIn}>
                        <Button type="submit" color="primary" variant="flat">
                            Sign up
                        </Button>
                    </form>
                </NavbarItem>
            </>
        )
    }
    return (
        <form action={signOut}>
            <Popover placement="left">
                <PopoverTrigger>
                    <Avatar src={session?.data?.user.image || ''} className="cursor-pointer"/>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="p-4">
                        <form action={signOut}>
                            <Button type="submit" color="primary" variant="flat">
                                Sign out
                            </Button>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        </form>
    )

}
