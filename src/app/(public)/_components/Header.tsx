'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LogIn, MenuIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { handleRegister } from '../_actions/login';

export function Header() {
  const { data: isLoggedIn, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  console.log(isLoggedIn);
  console.log('isLoggedIn');

  const navItems = [
    { href: '#professionals', label: 'Professionals' },
    //{ href: "/contact", label: "Contact" },
  ];

  async function handleLogin() {
    await handleRegister('github');
  }

  const NavLink = () => (
    <>
      {navItems.map(item => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          asChild
          className='bg-transparent hover:bg-transparent text-black font-normal shadow-none'
        >
          <Link className='text-base' href={item.href}>
            {item.label}
          </Link>
        </Button>
      ))}
      {status === 'loading' ? (
        <>Loading...</>
      ) : isLoggedIn ? (
        <Link
          className='flex items-center justify-center gap-2 bg-zinc-900 text-white py-1 rounded-md px-4 hover:bg-zinc-800'
          href='/dashboard'
        >
          Acess Dashboard
        </Link>
      ) : (
        <Button onClick={handleLogin} className='cursor-pointer'>
          <LogIn />
          Clinic Dashboard
        </Button>
      )}
    </>
  );

  return (
    <header className='fixed top-0 right-0 left-0 z-[999] py-6 px-6 bg-white'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link className='text-3xl font-bold text-zinc-900' href='/'>
          Viva<span className='text-emerald-500'>CARE</span>
        </Link>
        <nav className='hidden md:flex items-center space-x-4'>
          <NavLink />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className='md:hidden'>
            <Button className='text-black hover:bg-transparent' variant='ghost' size='icon'>
              <MenuIcon className='w-6 h-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-[240px] sm:w-[300px] z-[9999] p-5'>
            <SheetTitle>Menu</SheetTitle>
            <SheetHeader></SheetHeader>
            <SheetDescription>Check our links</SheetDescription>
            <nav className='flex flex-col space-y-4 mt-6'>
              <NavLink />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
