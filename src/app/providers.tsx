'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

export default function Providers ({ children }: any) {
    return (
        <SessionProvider>
            <NextUIProvider>
                { children }
            </NextUIProvider>
        </SessionProvider>
    )
}