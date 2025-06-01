import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalSlider } from '@/components/ProductSlider/ModalSlider';

jest.mock('swiper/css', () => {});
jest.mock('swiper/css/navigation', () => {});
jest.mock('swiper/css/pagination', () => {});

jest.mock('next/image', () => {
  const NextImage = jest.requireActual('next/image').default;

  return {
    __esModule: true,
    default: NextImage
  };
});

jest.mock('swiper/react', () => {
  const Swiper = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper">{children}</div>
  );

  const SwiperSlide = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="slide">{children}</div>
  );

  return { Swiper, SwiperSlide };
});

jest.mock('swiper/modules', () => ({
  Navigation: jest.fn(),
  Pagination: jest.fn()
}));

jest.mock('@/components/ui/dialog', () => {
  const Dialog = ({
    open,
    children
  }: {
    open: boolean;
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
  }) => {
    return open ? <div data-testid="dialog">{children}</div> : null;
  };

  return {
    Dialog,
    DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
    DialogDescription: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
    DialogClose: ({ children }: { children: React.ReactNode }) => <>{children}</>
  };
});

describe('ModalSlider', () => {
  const images = [{ url: '/img1.jpg' }, { url: '/img2.jpg' }, { url: '/img3.jpg' }];
  const productName = 'Test Product';

  it('renders correctly when isOpen=true: title, description and all images', () => {
    render(
      <ModalSlider
        isOpen={true}
        onClose={jest.fn()}
        images={images}
        productName={productName}
        initialIndex={1}
      />
    );

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: productName })).toBeInTheDocument();
    expect(screen.getByText('Image Gallery')).toBeInTheDocument();
    expect(screen.getByTestId('swiper')).toBeInTheDocument();

    images.forEach((img, i) => {
      const altText = `${productName} ${i + 1}`;
      const renderedImg = screen.getByAltText(altText) as HTMLImageElement;
      expect(renderedImg).toBeInTheDocument();

      const srcUrl = new URL(renderedImg.src);
      expect(srcUrl.searchParams.get('url')).toBe(img.url);
    });

    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
  });

  it('does not render content when isOpen=false', () => {
    render(
      <ModalSlider
        isOpen={false}
        onClose={jest.fn()}
        images={images}
        productName={productName}
        initialIndex={0}
      />
    );
    expect(screen.queryByRole('heading', { name: productName })).toBeNull();
    expect(screen.queryByTestId('dialog')).toBeNull();
  });

  it('calls onClose when "Close" button is clicked', async () => {
    const onCloseMock = jest.fn();
    render(
      <ModalSlider
        isOpen={true}
        onClose={onCloseMock}
        images={images}
        productName={productName}
        initialIndex={0}
      />
    );

    const closeButton = screen.getByLabelText('Close');
    await userEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
