import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import Logo from '../../assets/logo.svg';

interface Props {
  children: ReactNode;
}

export const AuthFormWrapper: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Row className={'align-items-center '}>
        <Col />
        <Col>
          <a href={'/'}>
            <CenteredImage src={Logo} alt="logo" width={300} height={300} />
          </a>
        </Col>
        <Col />
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

const CenteredImage = styled.img`
  display: block;
  margin: 1vh auto auto;
`;

const VerticallyCenteredRow = styled(Row)`
  height: 45vh;
  align-items: center;
`;

const FormWrapperWithMargin = styled.div`
  margin-left: 1vh;
  margin-right: 1vh;
`;
