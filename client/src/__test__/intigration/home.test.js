import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

it('should navigate from home page to product page', () => {
  // Render the home page
  const { getByText, getByRole } = render(<App />);

  // Find and click on the first product link
  const productLink = getByText(/product name/i);
  fireEvent.click(productLink);

  // Verify the product page title is displayed
  expect(getByRole('heading', { name: /product name/i })).toBeInTheDocument();
});
