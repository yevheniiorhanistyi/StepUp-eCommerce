import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEnvVar = (value: string | undefined, name: string): string => {
  if (!value) throw new Error(`Missing environment variable: ${name}`);

  return value;
};

export const getCookieValue = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}[\]\\/+^])/g, '\\$1')}=([^;]*)`)
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getInitials = (firstName: string, lastName: string) =>
  `${(firstName?.[0] ?? '').toUpperCase()}${(lastName?.[0] ?? '').toUpperCase()}`;
