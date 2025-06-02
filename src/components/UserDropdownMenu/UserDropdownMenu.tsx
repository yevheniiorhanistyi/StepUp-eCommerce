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
import { getInitials } from '@/lib/utils';

interface UserDropdownMenuProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDropdownMenu = ({ isAuthenticated, setIsAuthenticated }: UserDropdownMenuProps) => {
  const { user, isUserLoading } = useAuth();
  const userName = `${user?.firstName} ${user?.lastName}`.trim();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  const renderUserButton = (): JSX.Element => {
    if (isUserLoading) {
      return (
        <Button
          aria-label="User menu"
          className="rounded-full cursor-pointer transition-colors duration-300 border-0"
          variant="ghost"
          size="icon"
        >
          <CircleUserRound className="size-6 animate-pulse opacity-50" strokeWidth={1.6} />
        </Button>
      );
    }

    if (isAuthenticated && user?.firstName) {
      return (
        <Button
          aria-label="User menu"
          className="rounded-full cursor-pointer transition-colors duration-300 border-0 bg-black text-white"
          variant="ghost"
          size="icon"
        >
          <span className="uppercase text-[16px]/[16px] font-semibold">
            {getInitials(userName)}
          </span>
        </Button>
      );
    }

    return (
      <Button
        aria-label="User menu"
        className="rounded-full cursor-pointer transition-colors duration-300 border-0"
        variant="ghost"
        size="icon"
      >
        <CircleUserRound className="size-6" strokeWidth={1.6} />
      </Button>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{renderUserButton()}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel className="font-semibold">{`Hi, ${userName}!`}</DropdownMenuLabel>
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
