import { render, screen, fireEvent, within } from '@testing-library/react';
import { ProductSlider } from '@/components/ProductSlider/ProductSlider';
import type { ReactNode, FC } from 'react';

jest.mock('swiper/react', () => {
  const Swiper: FC<{ children: ReactNode }> = ({ children }) => (
    <div data-testid="swiper">{children}</div>
  );

  const SwiperSlide: FC<{ children: ReactNode }> = ({ children }) => (
    <div data-testid="swiperslide">{children}</div>
  );

  return { Swiper, SwiperSlide };
});

jest.mock('swiper/modules', () => ({
  Navigation: {}
}));

jest.mock('swiper/css', () => {});
jest.mock('swiper/css/navigation', () => {});

jest.mock('@/components/ProductSlider/ModalSlider', () => ({
  ModalSlider: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="modal-slider">Modal Open</div> : null
}));

describe('ProductSlider', () => {
  const mockImages = [{ url: '/image1.jpg' }, { url: '/image2.jpg' }, { url: '/image3.jpg' }];

  it('renders all images in the main swiper', () => {
    render(<ProductSlider images={mockImages} productName="Test Product" />);

    mockImages.forEach((_, index) => {
      const altText = `Test Product - ${index + 1}`;
      const images = screen.getAllByAltText(altText);
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('renders the "Click to zoom" tooltip container', () => {
    render(<ProductSlider images={mockImages} productName="Test Product" />);

    const allTooltipCandidates = screen.getAllByTestId('swiper');
    const tooltipContainer = allTooltipCandidates.find((container) => {
      const matches = within(container).queryAllByText(/Click to zoom/i);

      return matches.length > 0;
    });

    expect(tooltipContainer).toBeDefined();
  });

  it('opens modal when main image is clicked', () => {
    render(<ProductSlider images={mockImages} productName="Test Product" />);

    const mainImage = screen.getByAltText('Test Product - 1');
    fireEvent.click(mainImage);

    expect(screen.getByTestId('modal-slider')).toBeInTheDocument();
  });

  it('changes selected image when thumbnail is clicked', () => {
    render(<ProductSlider images={mockImages} productName="Test Product" />);

    const allImages = screen.getAllByAltText('Test Product - 2');
    expect(allImages.length).toBeGreaterThan(1);

    const thumbnailImage = screen
      .getAllByTestId('swiperslide')
      .flatMap((slide) => within(slide).queryAllByAltText('Test Product - 2'))[0];

    expect(thumbnailImage).toBeDefined();
    fireEvent.click(thumbnailImage);

    const selectedImage = screen.getByAltText('Test Product - 2');
    expect(selectedImage).toBeInTheDocument();
  });

  it('does not render thumbnail for the selected image', () => {
    render(<ProductSlider images={mockImages} productName="Test Product" />);
    const imgs = screen.getAllByAltText('Test Product - 1');
    expect(imgs.length).toBe(1);
  });
});
