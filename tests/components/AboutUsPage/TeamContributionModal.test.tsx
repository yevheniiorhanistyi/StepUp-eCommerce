import { render, screen } from '@testing-library/react';
import TeamContributionModal from '@/components/AboutUs/TeamContributionModal';

const mockContributions = [
  { title: 'Contribution 1', description: 'Description 1', image: '/image1.jpg' },
  { title: 'Contribution 2', description: 'Description 2', image: '/image2.jpg' }
];

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div>{children}</div> : null,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  DialogDescription: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  DialogClose: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));
jest.mock('swiper/css', () => {});
jest.mock('swiper/css/pagination', () => {});
jest.mock('swiper/modules', () => ({ Pagination: {} }));

describe('TeamContributionModal', () => {
  test('displays contribution details only when the modal is open', () => {
    const { rerender } = render(
      <TeamContributionModal
        isOpen={false}
        onOpen={() => {}}
        onClose={() => {}}
        contributions={mockContributions}
      />
    );
    expect(screen.queryByText(mockContributions[0].title)).not.toBeInTheDocument();

    rerender(
      <TeamContributionModal
        isOpen={true}
        onOpen={() => {}}
        onClose={() => {}}
        contributions={mockContributions}
      />
    );

    mockContributions.forEach(({ title, description }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });
});
