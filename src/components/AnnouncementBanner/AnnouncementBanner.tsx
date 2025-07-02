import Link from 'next/link';
import Image from 'next/image';
import { SOCIAL_LOGOS } from '@/constants/constants';
import { IAnnouncementBannerProps } from '@/types/types';

const AnnouncementBanner = ({ label, text, socials }: IAnnouncementBannerProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center text-xs sm:text-sm p-4 bg-neutral-950 text-amber-50">
      {label && <span className="font-bold">{label}</span>}
      <div className="flex flex-col">
        {text.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {socials && (
        <div className="flex flex-row items-center gap-5">
          {SOCIAL_LOGOS.map((logo) => (
            <Link key={logo} href={'#'}>
              <div className="relative w-[18px] h-[18px]">
                <Image
                  src={`/images/socials/${logo}`}
                  alt={logo.replace('.png', '')}
                  fill
                  className="object-contain"
                  sizes="18px"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementBanner;
