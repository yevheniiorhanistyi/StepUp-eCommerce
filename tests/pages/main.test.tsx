import { render, screen } from '@testing-library/react';
import Main from '@/app/page';

jest.mock('@/components/AnnouncementBanner/AnnouncementBanner', () => ({
  __esModule: true,
  default: jest.fn(() => <div>AnnouncementBanner</div>)
}));

jest.mock('@/components/HeroSection/HeroSection', () => ({
  __esModule: true,
  default: jest.fn(() => <div>HeroSection</div>)
}));

jest.mock('@/components/BrandCarousel/BrandCarousel', () => ({
  __esModule: true,
  default: jest.fn(() => <div>BrandCarousel</div>)
}));

jest.mock('@/components/PopularCategories/PopularCategories', () => ({
  __esModule: true,
  default: jest.fn(() => <div>PopularCategories</div>)
}));

jest.mock('@/components/AllTimeFavorites/AllTimeFavorites', () => ({
  __esModule: true,
  default: jest.fn(() => <div>AllTimeFavorites</div>)
}));

describe('Main', () => {
  it('should render all components', () => {
    render(<Main />);

    expect(screen.getByText('HeroSection')).toBeInTheDocument();
    expect(screen.getByText('BrandCarousel')).toBeInTheDocument();
    expect(screen.getByText('PopularCategories')).toBeInTheDocument();
    expect(screen.getByText('AllTimeFavorites')).toBeInTheDocument();
  });
});
