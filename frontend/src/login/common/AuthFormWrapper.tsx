import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';

interface Props {
  children: ReactNode;
}

export const AuthFormWrapper: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Row>
        <Col>
          <CenteredHeader>Welcome to Our Wishes</CenteredHeader>
        </Col>
      </Row>
      <VerticallyCenteredRow>
        <Col sm />
        <Col sm>
          <FormWrapperWithMargin>{children}</FormWrapperWithMargin>
        </Col>
        <Col sm />
      </VerticallyCenteredRow>
    </>
  );
};

const CenteredHeader = styled.h1`
  margin-top: 1vh;
  text-align: center;
`;

const VerticallyCenteredRow = styled(Row)`
  height: 70vh;
  align-items: center;
`;

const FormWrapperWithMargin = styled.div`
  margin-left: 1vh;
  margin-right: 1vh;
`;
