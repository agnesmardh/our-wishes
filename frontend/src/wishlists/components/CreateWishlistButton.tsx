import { Plus } from 'react-bootstrap-icons';
import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

interface Props {
  onClick: () => void;
}

export const CreateWishlistButton: React.FC<Props> = ({ onClick }: Props) => {
  return (
    <CreateButton onClick={onClick} title={'Create a wishlist'}>
      <Plus size={32} />
    </CreateButton>
  );
};

const CreateButton = styled(Button)`
  background-color: #675491ff;
  position: fixed;
  bottom: 20px;
  left: 100%;
  margin-left: -100px; /*104.5px is half of the button's width*/
  z-index: 100;
  display: block;
  height: 64px;
  width: 64px;
  border-radius: 50%;

  &:hover {
    background-color: #8a74b3;
  }
`;
