import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserProfile from './UserProfile';

const queryClient = new QueryClient();

describe('UserProfile', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProfile />
      </QueryClientProvider>
    );
  });

  test('renders user profile information', async () => {
    // Mock the fetchUserData function
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        id: '1',
        username: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        description: 'Lorem ipsum dolor sit amet',
        image: 'profile.jpg',
      }),
    });

    // Wait for the user profile to load
    await screen.findByText('John Doe');

    // Assert that the user profile information is rendered correctly
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('Lorem ipsum dolor sit amet')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  });

  test('toggles between different sections', async () => {
    // Mock the fetchUserData function
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        id: '1',
        username: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        description: 'Lorem ipsum dolor sit amet',
        image: 'profile.jpg',
      }),
    });

    // Wait for the user profile to load
    await screen.findByText('John Doe');

    // Click on the "Liked" section
    fireEvent.click(screen.getByText('Liked'));
    expect(screen.getByText('Liked Events')).toBeInTheDocument();

    // Click on the "Events" section
    fireEvent.click(screen.getByText('Events'));
    expect(screen.getByText('User Events')).toBeInTheDocument();

    // Click on the "Followers" section
    fireEvent.click(screen.getByText('Followers'));
    expect(screen.getByText('User Followers')).toBeInTheDocument();

    // Click on the "Following" section
    fireEvent.click(screen.getByText('Following'));
    expect(screen.getByText('User Following')).toBeInTheDocument();
  });

  // Add more tests as needed...
});