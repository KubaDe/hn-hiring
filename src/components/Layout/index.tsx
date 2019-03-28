import React from 'react';
import { Container } from 'reactstrap';
import Loader from './Loader'


const Layout = ({children }: {children: JSX.Element[] | JSX.Element}) => {
  return(
  <Container style={{ marginTop: '50px', marginBottom: '50px'}} fluid>
    <Loader />
    {children}
  </Container>
  )
};

export default Layout
