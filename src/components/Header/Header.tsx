'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ShoppingBasket } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import DrawerMenu from '../DrawerMenu/DrawerMenu';
import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu';
import { ROUTES } from '@/constants/constants';

const navLinks = [
  { href: ROUTES.Catalog, label: 'Catalog' },
  { href: ROUTES.About, label: 'About Us' }
];

const Header = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const { isAuthenticated, setAuthentication } = useAuth();

  const cartQuantity = cart?.totalLineItemQuantity ?? 0;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <header className="px-5 sm:px-10 py-4 grow-0 shrink-0 basis-auto">
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
        <Link className="flex items-center gap-2" href={ROUTES.Home}>
          <Image
            className="h-[35px] w-[17px] sm:h-[51px] sm:w-[25px]"
            src="/images/logo.png"
            width={25}
            height={51}
            alt="Logo"
          />
          <h1 className="text-2xl sm:text-3xl tracking-wide font-[family-name:var(--font-mr-dafoe)]">
            StepUp
          </h1>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map(({ href, label }) => (
              <NavigationMenuItem key={href} className="hidden sm:flex">
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Link className="sm:text-lg" href={href}>
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <UserDropdownMenu
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setAuthentication}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={ROUTES.Cart}>
                <Button
                  aria-label="Cart"
                  className="rounded-full cursor-pointer transition-colors duration-300 relative"
                  variant="ghost"
                  size="icon"
                >
                  <ShoppingBasket className="size-6" strokeWidth={1.6} />
                  {cartQuantity > 0 && (
                    <Badge className="h-6 w-6 rounded-full absolute top-2 right-2 translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-xs">
                      {cartQuantity}
                    </Badge>
                  )}
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="sm:hidden">
              <DrawerMenu
                navLinks={navLinks}
                isAuthenticated={isAuthenticated}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
