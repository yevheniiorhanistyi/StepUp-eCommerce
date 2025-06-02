'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CircleUserRound, KeyRound, UserRoundPlus, User, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { getCookieValue, getInitials } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface UserDropdownMenuProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDropdownMenu = ({ isAuthenticated, setIsAuthenticated }: UserDropdownMenuProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      setFirstName(getCookieValue('user_first_name') || '');
      setLastName(getCookieValue('user_last_name') || '');
      setEmail(getCookieValue('user_email') || '');
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  const renderUserInfo = () => (
    <>
      <DropdownMenuLabel className="flex items-center gap-3 px-4 py-2">
        <Avatar className="h-8 w-8 text-sm text-white">
          <AvatarFallback className="bg-black">{getInitials(firstName, lastName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col leading-tight">
          <span className="text-base font-semibold text-foreground">
            {firstName} {(lastName?.[0] ?? '').toUpperCase()}.
          </span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild className="px-5 cursor-pointer">
        <Link href="/profile" className="flex items-center gap-2 w-full">
          <User />
          <span className="text-base">Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={handleLogout}
        className="flex items-center gap-2 px-5 mb-1 cursor-pointer"
      >
        <LogOut />
        <span>Log out</span>
      </DropdownMenuItem>
    </>
  );

  const renderAuthOptions = () => (
    <>
      <DropdownMenuItem asChild>
        <Link href="/login" className="flex items-center gap-2 w-full cursor-pointer">
          <KeyRound />
          <span className="text-base">Sign In</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/register" className="flex items-center gap-2 w-full cursor-pointer">
          <UserRoundPlus />
          <span className="text-base">Join Us</span>
        </Link>
      </DropdownMenuItem>
    </>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="User menu"
          className="rounded-full cursor-pointer transition-colors border-0"
          variant="ghost"
          size="icon"
        >
          <CircleUserRound className="size-6" strokeWidth={1.6} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAuthenticated ? renderUserInfo() : renderAuthOptions()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
