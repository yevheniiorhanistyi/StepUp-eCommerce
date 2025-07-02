import { render, screen } from '@testing-library/react';
import BrandCarousel from '@/components/BrandCarousel/BrandCarousel';
import { BRAND_LOGOS } from '@/constants/constants';

jest.mock('embla-carousel-react', () => ({
  useEmblaCarousel: jest.fn(() => [
    { current: null },
    {
      slideNext: jest.fn(),
      slidePrev: jest.fn(),
      nextDisabled: false,
      prevDisabled: false
    }
  ])
}));

jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('@/constants/constants', () => ({
  BRAND_LOGOS: ['brand1.png', 'brand2.png', 'brand3.png']
}));

describe('BrandCarousel', () => {
  it('should render correct number of carousel items', () => {
    render(<BrandCarousel />);

    const carouselItems = screen.getAllByRole('img');
    expect(carouselItems).toHaveLength(BRAND_LOGOS.length);
  });
});
