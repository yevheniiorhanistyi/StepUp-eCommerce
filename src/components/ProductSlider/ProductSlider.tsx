'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper';
import { ModalSlider } from './ModalSlider';
interface ProductSliderProps {
  images: { url: string }[];
  productName: string;
}

export function ProductSlider({ images, productName }: ProductSliderProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]?.url ?? null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (index: number) => {
    setSelectedImage(images[index].url);
    mainSwiperRef.current?.slideTo(index);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const selectedIndex = images.findIndex((img) => img.url === selectedImage);

  return (
    <>
      <div className="row-start-1 col-span-1 md:col-start-1 flex flex-col sm:flex-row gap-4">
        {images.length > 1 && (
          <div className="hidden sm:block w-20">
            <Swiper
              direction="vertical"
              spaceBetween={10}
              slidesPerView="auto"
              className="h-[450px]"
            >
              {images.map((image, index) => {
                const isSelected = image.url === selectedImage;
                if (isSelected) return null;

                return (
                  <SwiperSlide key={index} className="!h-auto">
                    <div
                      className="relative w-20 aspect-square overflow-hidden hover:shadow-sm hover:cursor-pointer"
                      onClick={() => handleSlideChange(index)}
                    >
                      <Image
                        src={image.url}
                        alt={`${productName} - ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

        <div className="relative w-full aspect-[3/2] max-w-[600px] overflow-hidden">
          <Swiper
            navigation
            modules={[Navigation]}
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              const newIndex = swiper.activeIndex;
              setSelectedImage(images[newIndex].url);
            }}
            initialSlide={selectedIndex >= 0 ? selectedIndex : 0}
            className="h-full w-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative w-full h-full group"
                  style={{
                    cursor: 'url("/zoom-in.png") 12 12, zoom-in'
                  }}
                  onClick={handleImageClick}
                >
                  <Image
                    src={image.url}
                    alt={`${productName} - ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-2 right-2 bg-gray-500/30 text-gray-500 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to zoom
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <ModalSlider
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        productName={productName}
        initialIndex={selectedIndex}
      />
    </>
  );
}
