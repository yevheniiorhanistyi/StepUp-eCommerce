import { ITeamContributionModalProps } from '@/types/types';
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
}: ITeamContributionModalProps): JSX.Element => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogContent className="w-[calc(100%-1rem)] md:max-w-[900px] md:w-[85vw] max-[769px]:min-w-[85vw] flex pt-10 pb-0 px-6 overflow-clip">
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
              <div className="pb-9 flex flex-col gap-4">
                <div className="relative w-full md:h-[45vh] max-md:h-[35vh] max-sm:h-[20vh] overflow-clip flex grow shrink">
                  <Image
                    src={item.image}
                    sizes="(max-width: 768px) 100vw, 800px"
                    alt={item.title}
                    width={600}
                    height={200}
                    className="object-contain min-w-full min-h-full relative"
                  />
                </div>
                <div className="flex flex-col gap-4 grow shrink">
                  <DialogTitle>{item.title}</DialogTitle>
                  <DialogDescription className="text-gray-700 text-sm">
                    {item.description}
                  </DialogDescription>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
};

export default TeamContributionModal;
