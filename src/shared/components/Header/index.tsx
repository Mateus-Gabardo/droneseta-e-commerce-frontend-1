import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../../images/entrega-drone.png';
import Cart from '../Cart';
import TopSlide from '../../animations/TopSlide';
import { useSession } from '../../../store/hooks/sessionHooks';

function HeaderComponent() {
  const navigate = useNavigate();
  const session = useSession();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateOrders = () => {
    navigate('/orders');
  };

  const handleNavigateDashboard = () => {
    navigate('/admin');
  };

  return (
    <Container
      className="d-flex flex-column"
      fluid
      style={{ backgroundColor: '#6D8B74' }}
    >
      <Row
        style={{ flex: '1' }}
        className="d-flex align-items-center  flex-row"
      >
        <Col className="col-auto">
          <Row
            className="d-flex col-auto"
            style={{ cursor: 'pointer' }}
            onClick={handleNavigateHome}
          >
            <TopSlide delay={0}>
              <Col className="d-flex" xs="auto">
                <img src={Logo} alt="Drone carregando entrega" height="70px" />
              </Col>
            </TopSlide>
            <Col className="d-flex justify-content-start" xs="auto">
              <h1
                className="d-flex align-items-center"
                style={{
                  color: 'white',
                  fontSize: '42px',
                  flex: '1',
                }}
              >
                Droneseta
              </h1>
            </Col>
            <TopSlide delay={2}>
              <Col className="d-flex" xs="auto">
                <img src={Logo} alt="Drone carregando entrega" height="70px" />
              </Col>
            </TopSlide>
          </Row>
        </Col>
        <Col className="d-flex justify-content-end">
          <Row>
            {session && session.customer.tipoCliente === 'ADM' && (
              <Col>
                <Button
                  variant="outline-light"
                  style={{ width: '160px' }}
                  onClick={handleNavigateDashboard}
                >
                  Admin Dashboard
                </Button>
              </Col>
            )}
            <Col>
              <Button
                variant="outline-light"
                style={{ width: '130px' }}
                onClick={handleNavigateOrders}
              >
                Meus pedidos
              </Button>
            </Col>
            <Col>
              <Cart />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HeaderComponent;
