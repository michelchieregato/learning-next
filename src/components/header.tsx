import {
    Input,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from '@nextui-org/react';
import React, { Suspense } from 'react';
import Link from 'next/link';
import paths from '@/paths';
import HeaderAuth from '@/components/header-auth';
import SearchInput from '@/components/search-input';

export default async function Header() {
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href={paths.home()} className="font-bold">
                    Discuss
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Suspense>
                        <SearchInput></SearchInput>
                    </Suspense>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <HeaderAuth/>
            </NavbarContent>
        </Navbar>
    )
}
