import { ReactNode, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Header';
import { useSession } from '../../../store/hooks/sessionHooks';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const session = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session]);
  return (
    <Container fluid>
      <Col>
        <Row style={{ height: '80px' }}>
          <HeaderComponent />
        </Row>
        <Row>{children}</Row>
      </Col>
    </Container>
  );
}

export default Layout;
