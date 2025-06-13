/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import AllTimeFavorites from '@/components/AllTimeFavorites/AllTimeFavorites';

describe('AllTimeFavorites', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render products correctly', async () => {
    const mockProducts = [
      {
        id: '1',
        name: { 'en-US': 'Product 1' },
        masterVariant: {
          images: [{ url: '/image1.jpg' }],
          prices: [{ value: { centAmount: 1000, currencyCode: 'USD' } }]
        }
      },
      {
        id: '2',
        name: { 'en-US': 'Product 2' },
        masterVariant: {
          images: [{ url: '/image2.jpg' }],
          prices: [{ value: { centAmount: 2000, currencyCode: 'USD' } }]
        }
      }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      } as Response)
    );

    await act(async () => {
      render(<AllTimeFavorites />);
    });

    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(await screen.findByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });

  it('should render empty if no products found', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      } as Response)
    );

    await act(async () => {
      render(<AllTimeFavorites />);
    });

    expect(screen.queryByText('Product 1')).toBeNull();
    expect(screen.queryByText('Product 2')).toBeNull();
  });

  it('should handle fetch failure gracefully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Internal Server Error'
      } as Response)
    );

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      render(<AllTimeFavorites />);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch products: Internal Server Error');

    consoleErrorSpy.mockRestore();
  });
});
