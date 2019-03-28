import React from 'react';
import { Container } from 'reactstrap';
import Loader from './Loader';

const Layout = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <Container style={{ padding: '50px' }} fluid={true}>
      <Loader />
      {children}
    </Container>
  );
};

export default Layout;
