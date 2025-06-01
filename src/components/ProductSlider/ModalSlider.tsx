'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { Swiper as SwiperType } from 'swiper';
import { useRef } from 'react';

type ModalSliderProps = {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string }[];
  productName: string;
  initialIndex: number;
};

export function ModalSlider({
  isOpen,
  onClose,
  images,
  productName,
  initialIndex
}: ModalSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-full p-4 space-y-4">
        <DialogClose asChild>
          <button className="absolute top-2 right-2 z-50" onClick={onClose} aria-label="Close">
            <X className="w-8 h-8" />
          </button>
        </DialogClose>

        <div>
          <DialogTitle className="text-lg font-semibold">{productName}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Image Gallery
          </DialogDescription>
        </div>

        <div className="relative w-full h-[80vh] aspect-[4/3]">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            initialSlide={initialIndex}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="h-full w-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={image.url}
                    alt={`${productName} ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </DialogContent>
    </Dialog>
  );
}
