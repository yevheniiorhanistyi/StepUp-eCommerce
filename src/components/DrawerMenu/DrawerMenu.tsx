import Link from 'next/link';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from '../ui/button';
import { Menu, X, ChevronRight } from 'lucide-react';
import { IDrawerMenuProps } from '@/types/types';

const DrawerMenu = ({ navLinks, isAuthenticated, isOpen, setIsOpen }: IDrawerMenuProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger asChild>
        <Button
          aria-label="Open menu"
          className="rounded-full cursor-pointer transition-colors duration-300"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.blur();
            setIsOpen(!isOpen);
          }}
        >
          <Menu className="size-6" strokeWidth={1.6} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex items-end">
          <DrawerTitle>
            <VisuallyHidden>
              <DrawerDescription>
                This menu contains links to your cart, catalog, about us page, and user
                authentication options.
              </DrawerDescription>
            </VisuallyHidden>
          </DrawerTitle>
          <DrawerClose asChild>
            <Button
              aria-label="Close menu"
              className="rounded-full cursor-pointer transition-colors duration-300"
              variant="ghost"
              size="icon"
            >
              <X className="size-6" strokeWidth={1.6} />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-5 p-5">
          <Link
            className="flex items-center justify-between w-full text-xl hover:text-accent-foreground/90"
            href={'/cart'}
            onClick={() => setIsOpen(false)}
          >
            Cart
            <ChevronRight />
          </Link>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              className="flex items-center justify-between w-full text-xl hover:text-accent-foreground/90"
              href={href}
              onClick={() => setIsOpen(false)}
            >
              {label}
              <ChevronRight />
            </Link>
          ))}
          <p className="text-base sm:text-lg text-accent-foreground/90 -tracking-tighter">
            Become a StepUp Member for the best products, inspiration and stories in sport.
          </p>
          {!isAuthenticated && (
            <div className="flex items-center flex-wrap gap-4">
              <Link
                className="flex items-center gap-2"
                href={'/login'}
                onClick={() => setIsOpen(false)}
              >
                <Button className="text-base font-bold rounded-2xl cursor-pointer">Sign In</Button>
              </Link>
              <Link
                className="flex items-center gap-2"
                href={'/register'}
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant="outline"
                  className="text-base font-bold rounded-2xl cursor-pointer"
                >
                  Join Us
                </Button>
              </Link>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
