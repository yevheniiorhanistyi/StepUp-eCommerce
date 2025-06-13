import AboutUsPage from '@/components/AboutUs/AboutUsPage';
import teamMembers from '@/components/AboutUs/teamData';
import { render, screen } from '@testing-library/react';

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));
jest.mock('swiper/css', () => {});
jest.mock('swiper/css/pagination', () => {});
jest.mock('swiper/modules', () => ({
  Pagination: {}
}));

describe('AboutUsPage', () => {
  test('renders team members correctly', () => {
    render(<AboutUsPage />);
    teamMembers.forEach((member) => {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.role)).toBeInTheDocument();
      expect(screen.getByText(member.bio)).toBeInTheDocument();
    });
  });

  test('renders all expected social media links', () => {
    render(<AboutUsPage />);
    teamMembers.forEach((member) => {
      const githubLink = screen.getByRole('link', { name: `GitHub — ${member.name}` });
      const linkedInLink = screen.getByRole('link', { name: `LinkedIn — ${member.name}` });
      expect(githubLink).toHaveAttribute('href', member.github);
      expect(linkedInLink).toHaveAttribute('href', member.linkedin);
    });
  });
});
