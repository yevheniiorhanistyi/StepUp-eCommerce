import UserIcon from '@/components/Profile/details/UserIcon';
import { render, screen } from '@testing-library/react';

describe('UserIcon', () => {
  it('renders UserIcon SVG', () => {
    render(<UserIcon />);

    const icon = screen.getByTestId('user-icon');
    expect(icon.tagName.toLowerCase()).toBe('svg');
  });
});
