import React from 'react';
import { render, screen } from '@testing-library/react';
import { WishlistDTO } from '../../types/WishlistDTO';
import { Wishlists } from '../Wishlists';

describe('<Wishlists/>', () => {
  const renderWishlists = (wishlists: WishlistDTO[]) => {
    render(<Wishlists wishlists={wishlists} />);
  };
  it('should render a wish', () => {
    renderWishlists([
      {
        id: '1',
        owner: 'Mattias',
        wishes: [
          {
            id: '1',
            text: 'wishText'
          }
        ]
      }
    ]);

    const wishlistElement = screen.getByText(/Wishlists/i);
    expect(wishlistElement).toBeInTheDocument();
  });
});
