import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

it('should allow logging out', async () => {
  // Render the cart page
  const { getByText } = render(<App />);

  // Find the "Logout" button
  const logoutButton = getByText(/logout/i);

  // Click on the "Logout" button
  fireEvent.click(logoutButton);

  // Wait for the logout to complete
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Verify the user is logged out
  expect(screen.queryByText(/logged out/i)).toBeInTheDocument();
});
