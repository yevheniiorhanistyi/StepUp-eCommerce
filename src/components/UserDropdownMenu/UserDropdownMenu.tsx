'use client';

import Link from 'next/link';
import { CircleUserRound, KeyRound, UserRoundPlus, User, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';

interface UserDropdownMenuProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDropdownMenu = ({ isAuthenticated, setIsAuthenticated }: UserDropdownMenuProps) => {
  const { user } = useAuth();
  const userName = `${user?.firstName} ${user?.lastName}`;
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="User menu"
          className="rounded-full cursor-pointer transition-colors duration-300 border-0"
          variant="ghost"
          size="icon"
        >
          <CircleUserRound className="size-6" strokeWidth={1.6} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel>{`Hi, ${userName}!`}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link className="flex items-center gap-2 w-full cursor-pointer" href="/profile">
                <User />
                <span className="text-base">Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 w-full cursor-pointer text-[16px]/[20px]"
              onClick={handleLogout}
            >
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link className="flex items-center gap-2 w-full cursor-pointer" href="/login">
                <KeyRound />
                <span className="text-base">Sign In</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link className="flex items-center gap-2 w-full cursor-pointer" href="/register">
                <UserRoundPlus />
                <span className="text-base">Join Us</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
