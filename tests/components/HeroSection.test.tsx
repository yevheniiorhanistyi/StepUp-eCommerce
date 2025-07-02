import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/HeroSection/HeroSection';

describe('HeroSection', () => {
  it('renders the correct words', () => {
    const words = ['Run', 'Jump', 'Live', 'Step Up'];
    render(<HeroSection />);

    words.forEach((word) => {
      expect(screen.getByText(word)).toBeInTheDocument();
    });
  });

  it('renders the "Shop Now" button with correct link', () => {
    render(<HeroSection />);

    const button = screen.getByRole('link', { name: /Shop Now/i });
    expect(button).toHaveAttribute('href', '/catalog');
  });

  it('renders the subtitle correctly', () => {
    render(<HeroSection />);

    expect(screen.getByText(/Step into comfort. Stay in style./i)).toBeInTheDocument();
  });

  it('renders the background image', () => {
    render(<HeroSection />);

    const videos = screen.getAllByTestId('hero-video');
    expect(videos).toHaveLength(2);
  });
});
