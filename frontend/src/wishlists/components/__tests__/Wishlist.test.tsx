import React from 'react';
import { render } from '@testing-library/react';
import { WishlistDTO } from '../../types/WishlistDTO';
import { Wishlist } from '../Wishlist';
import userEvent from '@testing-library/user-event';
import { wishlistMock } from '../__mocks__/WishlistMock';

describe('<Wishlist/>', () => {
  const renderWishlist = (wishlist: WishlistDTO, onClick: () => void = jest.fn()) => {
    return render(<Wishlist wishlist={wishlist} active={false} onClick={onClick} />);
  };

  it('should render a wish', () => {
    const wishlist = renderWishlist(wishlistMock);

    const wishlistElement = wishlist.getByRole('button', { name: /titel/i });
    expect(wishlistElement).toBeInTheDocument();
  });

  it('should call onClick and be active when clicked on', () => {
    const onClickMock = jest.fn();
    const wishlist = renderWishlist(wishlistMock, onClickMock);

    const wishlistElement = wishlist.getByRole('button', { name: /titel/i });
    expect(wishlistElement).toBeInTheDocument();
    userEvent.click(wishlistElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
