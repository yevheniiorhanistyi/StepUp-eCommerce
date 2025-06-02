'use client';
import { CircleUserRound } from 'lucide-react';

const UserIcon = (): JSX.Element => {
  return (
    <div className="max-w-[270px] max-h-[270px] rounded-full bg-muted min-[900px]:flex hidden self-center justify-center shrink basis-1/3">
      <CircleUserRound className="w-full h-full text-muted-foreground " strokeWidth={0.2} />
    </div>
  );
};

export default UserIcon;
