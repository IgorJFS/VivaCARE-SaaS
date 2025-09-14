'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import logo from '../../../../../public/logo-odonto.png';

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Banknote, CalendarCheck2, ChevronLeft, ChevronRight, Folder, List, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className='flex min-h-screen w-full'>
      <aside
        className={clsx('flex flex-col border-r bg-background transition-all duration-300 p-4 h-full', {
          'w-20': isCollapsed,
          'w-64': !isCollapsed,
          'hidden md:flex md:fixed': true,
        })}
      >
        <div className='mb-6'>
          {!isCollapsed && (
            <Image src={logo} alt='Logo' priority quality={100} style={{ width: 'auto', height: 'auto' }} />
          )}
        </div>
        <Button
          className='bg-gray-100 hover:bg-gray-50 text-zinc-900 self-end mb-2'
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {!isCollapsed ? <ChevronLeft className='w-12 h-12' /> : <ChevronRight className='w-12 h-12' />}
        </Button>
        {isCollapsed && (
          <nav className='flex flex-col gap-1 overflow-hidden mt-2'>
            <NavItem
              href='/dashboard'
              icon={<CalendarCheck2 />}
              label='Calendar'
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <NavItem
              href='/dashboard/services'
              icon={<Folder />}
              label='Services'
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <NavItem
              href='/dashboard/profile'
              icon={<SettingsIcon />}
              label='My Profile'
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <NavItem
              href='/dashboard/plans'
              icon={<Banknote />}
              label='My Plans'
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          </nav>
        )}
        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <nav className='flex flex-col gap-1 overflow-hidden'>
              <span className='text-sm text-gray-400 font-medium mt-1 uppercase'>Dashboard</span>
              <NavItem
                href='/dashboard'
                icon={<CalendarCheck2 />}
                label='Calendar'
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
              <NavItem
                href='/dashboard/services'
                icon={<Folder />}
                label='Services'
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
              <span className='text-sm text-gray-400 font-medium mt-1 uppercase'>My Account</span>
              <NavItem
                href='/dashboard/profile'
                icon={<SettingsIcon />}
                label='My Profile'
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
              <NavItem
                href='/dashboard/plans'
                icon={<Banknote />}
                label='My Plans'
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </aside>
      <div
        className={clsx('flex flex-1 flex-col transition-all duration-300', {
          'md:ml-20': isCollapsed,
          'md:ml-64': !isCollapsed,
        })}
      >
        <header className='md:hidden flex items-center justify-between border-b px-2 md:px-6 h-14 z-10 sticky top-0 bg-white'>
          <Sheet>
            <div className='flex items-center gap-4'>
              <SheetTrigger asChild>
                <Button onClick={() => setIsCollapsed(false)} variant='outline' size='icon' className='md:hidden'>
                  <List className='h-4 w-4' />
                </Button>
              </SheetTrigger>
              <h1 className='text-base md:text-lg font-semibold'>VivaCARE Menu</h1>
            </div>
            <SheetContent side='left' className='sm:max-w-xs text-black p-4'>
              <SheetTitle>VivaCARE</SheetTitle>
              <SheetDescription>Management Menu</SheetDescription>
              <nav className='grid gap-2 text-base pt-5'>
                <NavItem
                  href='/dashboard'
                  icon={<CalendarCheck2 />}
                  label='Calendar'
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
                <NavItem
                  href='/dashboard/services'
                  icon={<Folder />}
                  label='Services'
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
                <NavItem
                  href='/dashboard/profile'
                  icon={<SettingsIcon />}
                  label='My Profile'
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
                <NavItem
                  href='/dashboard/plans'
                  icon={<Banknote />}
                  label='My Plans'
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className='flex-1 py-4 px-2 md:p-6'>{children}</main>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
}

function NavItem({ href, icon, label, pathname, isCollapsed }: NavItemProps) {
  return (
    <Link href={href}>
      <div
        className={clsx('flex items-center gap-2 p-3  rounded-md  transition-colors', {
          'bg-blue-500 text-white': pathname === href,
          'text-gray-700 hover:bg-gray-200': pathname !== href,
        })}
      >
        <span className='w-6 h-6'>{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
