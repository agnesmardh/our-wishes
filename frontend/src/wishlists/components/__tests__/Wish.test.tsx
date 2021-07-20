import React from 'react';
import { render, screen } from '@testing-library/react';
import { Wish } from '../Wish';
import { WishDTO } from '../../types/WishDTO';
import { userMock } from '../__mocks__/WishlistMock';
import userEvent from '@testing-library/user-event';

describe('<Wish/>', () => {
  const renderWish = (wish: WishDTO, deleteWishFn = jest.fn()) => {
    render(<Wish deleteWish={deleteWishFn} wish={wish} />);
  };

  const mockWish: WishDTO = {
    id: '1',
    title: 'wishText',
    boughtBy: userMock,
    link: ''
  };

  it('should render a wish', () => {
    renderWish(mockWish);

    const wishElement = screen.getByText(/wishText/i);
    expect(wishElement).toBeInTheDocument();
  });

  it('should call delete wish with the wishDTO when delete is pressed', () => {
    const mockDeleteWish = jest.fn();
    renderWish(mockWish, mockDeleteWish);

    const trashIconButton = screen.getByRole(/button/i, { name: /delete/i });
    userEvent.click(trashIconButton);

    const deleteWishModalButton = screen.getByRole(/button/i, { name: /Delete Wish/i });
    userEvent.click(deleteWishModalButton);

    expect(mockDeleteWish).toHaveBeenCalledTimes(1);
    expect(mockDeleteWish).toHaveBeenCalledWith(mockWish);
  });
});
