import { render, screen } from '@testing-library/react';
import PopularCategories from '@/components/PopularCategories/PopularCategories';

describe('PopularCategories', () => {
  it('should render all categories correctly', () => {
    render(<PopularCategories />);

    const categoryTitles = screen.getAllByRole('heading', { level: 3 });
    expect(categoryTitles).toHaveLength(3);

    const categoryLinks = screen.getAllByRole('link');

    categoryLinks.forEach(() => {
      const categoryTitles = screen.getAllByText(/Training Shoes|Running Shoes|Casual Sneakers/i);
      categoryTitles.forEach((title) => {
        expect(title).toBeInTheDocument();
      });

      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toBeInTheDocument();
      });
    });

    const categoryDescriptions = screen.getAllByText(
      /Versatile performance shoes|Enhance your performance|Find your perfect pair/i
    );
    expect(categoryDescriptions).toHaveLength(3);
  });
});
