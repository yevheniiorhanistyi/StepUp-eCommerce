import { TeamContributionModalProps } from '@/types/types';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { X } from 'lucide-react';

const TeamContributionModal = ({
  isOpen,
  onOpen,
  onClose,
  contributions
}: TeamContributionModalProps): JSX.Element => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogContent className="w-[calc(100%-1rem)] max-w-[95rem] sm:max-w-[85vw] md:max-w-[70vw] space-y-4 pt-9 pb-0 px-4 overflow-y-auto overflow-x-hidden">
        <DialogClose asChild>
          <button
            className="absolute top-2 right-2 z-50 cursor-pointer rounded-xl hover:bg-muted active:scale-90"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
        </DialogClose>
        <Swiper
          className="w-full max-w-full"
          spaceBetween={20}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {contributions.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="space-y-4">
                <div className="relative w-full h-[40vh] hidden sm:block">
                  <Image
                    src={item.image}
                    sizes="(max-width: 768px) 100vw, 800px"
                    alt={item.title}
                    fill
                    className="object-cover lg:object-contain"
                  />
                </div>
                <DialogTitle>{item.title}</DialogTitle>
                <DialogDescription className="text-gray-700 text-sm">
                  {item.description}
                </DialogDescription>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
};

export default TeamContributionModal;
