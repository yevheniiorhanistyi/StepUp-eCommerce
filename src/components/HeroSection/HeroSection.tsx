'use client';

import { motion } from 'framer-motion';

import Link from 'next/link';
import { Button } from '../ui/button';

const HeroSection = (): JSX.Element => {
  const videos = [
    {
      src: '/videos/vid1.mp4',
      poster: '/images/posters/poster-1.webp'
    },
    {
      src: '/videos/vid2.mp4',
      poster: '/images/posters/poster-2.webp'
    }
  ];

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[75vh] overflow-hidden px-4 sm:px-10 py-5">
      <div className="relative z-10 flex flex-col justify-between w-full h-full max-w-[1440px] mx-auto">
        <div className="max-w-[280px] pt-10 z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-2 md:gap-3 mb-0 md:mb-4"
          >
            {['Run', 'Jump', 'Live', 'Step', 'Up'].map((word, index) => (
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.4, delay: 0.1 * index, ease: 'easeOut' }}
                className="text-6xl md:text-7xl font-bold text-shadow-lg max-md:text-shadow-lg/50 max-md:text-white"
                key={word}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Button
              asChild
              size="lg"
              className="mt-4 mb-15 w-full cursor-pointer py-6 max-md:bg-white max-md:shadow-lg/50 max-md:text-black"
            >
              <Link href="/catalog">Shop Now</Link>
            </Button>
          </motion.div>
        </div>
      </div>
      <h2 className="absolute bottom-4 right-4 text-white md:text-xl font-bold self-end z-10 text-shadow-lg max-[515px]:text-black">
        Step into comfort. Stay in style.
      </h2>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute rotate-[-45deg] left-[5%] top-[-22%] w-[145%] h-[145%] max-w-none flex justify-end">
          {videos.map(({ src, poster }, idx) => (
            <div
              key={idx}
              className="relative w-1/2 h-full overflow-hidden border-r-[15px] border-white last:border-r-0"
            >
              <video
                data-testid="hero-video"
                src={src}
                poster={poster}
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
