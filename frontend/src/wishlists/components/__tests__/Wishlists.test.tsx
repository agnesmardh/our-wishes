import React from 'react';
import { render } from '@testing-library/react';
import { WishlistDTO } from '../../types/WishlistDTO';
import { Wishlists } from '../Wishlists';
import { wishlistMock } from '../__mocks__/WishlistMock';

describe('<Wishlists/>', () => {
  const renderWishlists = (wishlists: WishlistDTO[]) => {
    return render(<Wishlists wishlists={wishlists} activeWishlist={undefined} setActiveWishlist={jest.fn()} />);
  };
  it('should render a wish', () => {
    const wishlists = renderWishlists([wishlistMock]);

    const wishlistElement = wishlists.getByText(/Wishlists/i);
    expect(wishlistElement).toBeInTheDocument();
  });
});
