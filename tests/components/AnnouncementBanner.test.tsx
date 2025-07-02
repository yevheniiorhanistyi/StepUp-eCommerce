import { render, screen } from '@testing-library/react';
import AnnouncementBanner from '@/components/AnnouncementBanner/AnnouncementBanner';

jest.mock('@/constants/constants', () => ({
  SOCIAL_LOGOS: ['facebook.png', 'twitter.png', 'instagram.png']
}));

describe('AnnouncementBanner', () => {
  it('renders the text and label correctly', () => {
    const label = 'Seasonal Sale';
    const text = ['Up to 50% off!', 'Hurry, limited time offer!'];

    render(<AnnouncementBanner label={label} text={text} socials={false} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    text.forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
  });
});
