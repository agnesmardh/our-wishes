import { Spinner } from 'react-bootstrap';
import React from 'react';
import styled from 'styled-components';

export const LoginLoadingIndicator: React.FC = () => {
  return (
    <CenteredSpinner>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </CenteredSpinner>
  );
};

const CenteredSpinner = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  opacity: 0.5;
  transform: translate(-50%, -50%);
`;
