'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

const HeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-screen overflow-hidden px-4 sm:px-10 py-5">
      <div className="relative z-10 flex flex-col justify-between w-full h-full max-w-[1440px] mx-auto">
        <div className="max-w-[280px] pt-10 z-10">
          <div className="flex flex-col gap-2 md:gap-3 mb-0 md:mb-4">
            {['Run', 'Jump', 'Live', 'Step Up'].map((word) => (
              <span
                className="text-6xl md:text-7xl font-bold text-shadow-lg max-[640px]:text-white"
                key={word}
              >
                {word}
              </span>
            ))}
          </div>
          <Button
            asChild
            size="lg"
            className="mt-4 w-full cursor-pointer py-6 max-[640px]:bg-white max-[640px]:text-black"
          >
            <Link href="/catalog">Shop Now</Link>
          </Button>
        </div>

        <h2 className="text-white md:text-xl font-bold self-end z-10 text-shadow-lg max-[515px]:text-black">
          Step into comfort. Stay in style.
        </h2>
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute rotate-[-45deg] left-[5%] top-[-22%] w-[145%] h-[145%] max-w-none flex justify-end">
          {['/videos/vid1.mp4', '/videos/vid2.mp4'].map((src, idx) => (
            <div
              key={idx}
              className="relative w-1/2 h-full overflow-hidden border-r-[15px] border-white last:border-r-0"
            >
              <video
                data-testid="hero-video"
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
