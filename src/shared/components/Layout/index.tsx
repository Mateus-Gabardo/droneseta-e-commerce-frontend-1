import { ReactNode } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import HeaderComponent from '../Header';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Container fluid>
      <Col>
        <Row style={{ height: '12vh' }}>
          <HeaderComponent />
        </Row>
        <Row style={{ height: '88vh' }}>{children}</Row>
      </Col>
    </Container>
  );
}

export default Layout;
