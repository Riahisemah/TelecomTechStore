import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

it('should allow adding products to the cart', async () => {
  // Render the product page
  const { getByText, getByLabelText, getByRole } = render(<App />);

  // Find the "Add to Cart" button
  const addToCartButton = getByText(/add to cart/i);

  // Find the quantity input and set the quantity to 2
  const quantityInput = getByLabelText(/quantity/i);
  fireEvent.change(quantityInput, { target: { value: 2 } });

  // Click on the "Add to Cart" button
  fireEvent.click(addToCartButton);

  // Wait for the cart update
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Verify the cart icon shows the correct number of items
  const cartIcon = getByRole('img', { name: /cart/i });
  expect(cartIcon.getAttribute('data-badge')).toBe('2');
});
