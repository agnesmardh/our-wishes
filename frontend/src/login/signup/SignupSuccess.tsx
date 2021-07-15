import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Check2Circle } from 'react-bootstrap-icons';
import styled from 'styled-components';

export const SignupSuccess: React.FC = () => {
  return (
    <>
      <Row>
        <CenteredCol className={'align-items-center'}>
          <Check2Circle size={400} color={'green'} />
        </CenteredCol>
      </Row>
      <Row>
        <CenteredCol>
          <h3>
            You have successfully signed up for Our Wishes! Please check the email you provided for a verification
            email.
          </h3>
        </CenteredCol>
      </Row>
    </>
  );
};

const CenteredCol = styled(Col)`
  text-align: center;
`;
