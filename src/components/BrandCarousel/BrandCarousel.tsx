'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

import { BRAND_LOGOS } from '@/constants/constants';

const BrandCarousel = (): JSX.Element => {
  return (
    <section className="w-full flex items-center justify-center">
      <Carousel
        opts={{
          align: 'center',
          loop: true
        }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="w-full max-w-[1440px] mx-auto"
      >
        <CarouselContent>
          {BRAND_LOGOS.map((logo, index) => (
            <CarouselItem key={index} className="basis-1/3 md:basis-1/5">
              <div className="relative flex items-center justify-center h-24 px-4">
                <Link href="/catalog" className="relative w-[100px] h-[50px] block">
                  <Image
                    src={`/images/brands/${logo}`}
                    alt={logo.replace('.png', '')}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 100px"
                    className="rounded-sm"
                  />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default BrandCarousel;
