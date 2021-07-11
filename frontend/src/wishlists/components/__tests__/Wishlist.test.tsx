import React from 'react';
import { render } from '@testing-library/react';
import { WishlistDTO } from '../../types/WishlistDTO';
import { Wishlist } from '../Wishlist';
import { wishlistMock } from '../__mocks__/WishlistMock';

describe('<Wishlist/>', () => {
  const renderWishlist = (wishlist: WishlistDTO) => {
    return render(<Wishlist wishlist={wishlist} />);
  };

  it('should render a wishlist', () => {
    const wishlist = renderWishlist(wishlistMock);

    const wishlistElement = wishlist.getByText('titel');
    expect(wishlistElement).toBeInTheDocument();
  });
});
