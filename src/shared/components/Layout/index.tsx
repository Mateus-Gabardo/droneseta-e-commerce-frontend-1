import { ReactNode, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import HeaderComponent from '../Header';
import { useSession } from '../../../store/hooks/sessionHooks';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const session = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!session || !session.customer) {
      toast.error('Sessão inválida, por favor realize login.');
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
