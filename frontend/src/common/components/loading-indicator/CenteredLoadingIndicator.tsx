import React from 'react';
import './LoadingIndicator.css';
import styled from 'styled-components';
import { LoadingIndicator } from './LoadingIndicator';

export const CenteredLoadingIndicator: React.FC = () => {
  return (
    <LoadingContainerStyle>
      <LoadingIndicator />
    </LoadingContainerStyle>
  );
};

const LoadingContainerStyle = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
