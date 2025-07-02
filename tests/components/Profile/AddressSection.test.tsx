import { AddressesSection } from '@/components/Profile/addresses/AddressSection';
import { useAuth } from '@/context/AuthContext';
import { render, screen, fireEvent } from '@testing-library/react';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

jest.mock('@/services/commercetools/client/createAnonymousClient', () => ({
  createAnonymousClient: jest.fn(() => ({}))
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    user: { id: 'user1' },
    isAuthenticated: true,
    isAuthChecked: true
  }))
}));

const mockAddresses = [
  {
    id: 'addr1',
    country: 'USA',
    city: 'New York',
    streetName: '5th Avenue',
    postalCode: '10001'
  },
  {
    id: 'addr2',
    country: 'Canada',
    city: 'Toronto',
    streetName: 'Queen St',
    postalCode: 'M5H 2N2'
  }
];

describe('AddressesSection', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'user1' }
    });
  });

  it('renders section title', () => {
    render(
      <AddressesSection
        type="billing"
        addresses={[]}
        defaultAddressId={undefined}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onSetDefault={jest.fn()}
      />
    );
    expect(screen.getByText(/Billing Addresses/i)).toBeInTheDocument();
  });

  it('renders all addresses passed as props', () => {
    render(
      <AddressesSection
        type="billing"
        addresses={mockAddresses}
        defaultAddressId="addr2"
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onSetDefault={jest.fn()}
      />
    );

    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    expect(screen.getByText(/Toronto/i)).toBeInTheDocument();
  });

  it('renders add new address button and opens dialog on click', () => {
    render(
      <AddressesSection
        type="billing"
        addresses={[]}
        defaultAddressId={undefined}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onSetDefault={jest.fn()}
      />
    );

    const addButton = screen.getByRole('button', { name: /add new address/i });
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(screen.getByText(/Billing Addresses Information/i)).toBeInTheDocument();
  });

  it('calls onDelete and onSetDefault callbacks when respective buttons clicked', () => {
    const onDeleteMock = jest.fn();
    const onSetDefaultMock = jest.fn();

    render(
      <AddressesSection
        type="billing"
        addresses={mockAddresses}
        defaultAddressId="addr1"
        onEdit={jest.fn()}
        onDelete={onDeleteMock}
        onSetDefault={onSetDefaultMock}
      />
    );

    const deleteButtons = screen.getAllByRole('button', { name: /delete address/i });
    const setDefaultButtons = screen.getAllByRole('switch', { name: /set default/i });

    fireEvent.click(deleteButtons[0]);
    expect(onDeleteMock).toHaveBeenCalledWith('addr1');

    fireEvent.click(setDefaultButtons[0]);
    expect(onSetDefaultMock).toHaveBeenCalledWith('addr1');
  });
});
