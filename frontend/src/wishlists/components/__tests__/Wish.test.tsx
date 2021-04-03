import React from 'react';
import { render, screen } from '@testing-library/react';
import { Wish } from '../Wish';
import { WishDTO } from '../../types/WishDTO';

describe('<Wish/>', () => {
  const renderWish = (wish: WishDTO) => {
    render(<Wish wish={wish} />);
  };
  it('should render a wish', () => {
    renderWish({
      id: '1',
      text: 'wishText'
    });

    const wishElement = screen.getByText(/Wish: wishText/i);
    expect(wishElement).toBeInTheDocument();
  });
});
