import React from 'react';
import { render, screen } from '@testing-library/react';
import { WishlistDTO } from '../../types/WishlistDTO';
import { Wishlist } from '../Wishlist';

describe('<Wishlist/>', () => {
  const renderWishlist = (wishlist: WishlistDTO) => {
    render(<Wishlist wishlist={wishlist} />);
  };
  it('should render a wish', () => {
    renderWishlist({
      id: '1',
      owner: 'Mattias',
      wishes: [
        {
          id: '1',
          text: 'wishText'
        }
      ]
    });

    const wishlistElement = screen.getByText(/Owner: Mattias/i);
    expect(wishlistElement).toBeInTheDocument();
  });
});
