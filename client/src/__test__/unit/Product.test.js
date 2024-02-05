import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../../Components/Product/Product';

describe('ProductCard component', () => {
  it('should render the product name', () => {
    const product = {
      name: 'Moka',
      Race: 'Europe',
      description: 'good chat',
      price: 20,
    };

    render(<ProductCard product={product} />);

    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
  });

  it('should render the product description', () => {
    const product = {
      name: 'Moka',
      Race: 'Europe',
      description: 'good chat',
      price: 20,
    };

    render(<ProductCard product={product} />);

    expect(screen.getByText(product.description)).toBeInTheDocument();
  });

  it('should render the product price', () => {
    const product = {
      name: 'Moka',
      Race: 'Europe',
      description: 'good chat',
      price: 20,
    };

    render(<ProductCard product={product} />);

    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
  });
});
