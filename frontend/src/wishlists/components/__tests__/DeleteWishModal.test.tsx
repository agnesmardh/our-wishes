import React from 'react';
import { render, screen } from '@testing-library/react';
import { WishDTO } from '../../types/WishDTO';
import { userMock } from '../__mocks__/WishlistMock';
import { DeleteWishModal } from '../DeleteWishModal';
import userEvent from '@testing-library/user-event';

describe('<DeleteWishModal/>', () => {
  const renderDeleteWishModal = (wish: WishDTO, onCloseMock: () => void = jest.fn()) => {
    render(<DeleteWishModal wish={wish} onCloseModal={onCloseMock} show={true} />);
  };

  const wishMock = {
    id: '1',
    title: 'wishText',
    boughtBy: userMock,
    link: ''
  };
  it('should render a delete modal with a cancel and a delete button', () => {
    renderDeleteWishModal(wishMock);

    const dialog = screen.getByRole(/dialog/i);
    expect(dialog).toBeInTheDocument();

    const cancelButton = screen.getByRole(/button/i, { name: /Cancel/i });
    expect(cancelButton).toBeInTheDocument();
    const deleteButton = screen.getByRole(/button/i, { name: /Delete Wish/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it('should call delete mock with deleteWish = false when cancel is clicked', () => {
    const onCloseMock = jest.fn();
    renderDeleteWishModal(wishMock, onCloseMock);

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    userEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(onCloseMock).toHaveBeenCalledWith(false);
  });

  it('should call delete mock with deleteWish = false when cancel is clicked', () => {
    const onCloseMock = jest.fn();
    renderDeleteWishModal(wishMock, onCloseMock);

    const cancelButton = screen.getByRole('button', { name: /Delete Wish/i });
    userEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(onCloseMock).toHaveBeenCalledWith(true);
  });
});
