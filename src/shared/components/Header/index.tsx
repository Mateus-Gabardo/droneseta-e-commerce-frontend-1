import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../../images/entrega-drone.png';
import Cart from '../Cart';
import TopSlide from '../../animations/TopSlide';

function HeaderComponent() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
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
          <Cart />
        </Col>
      </Row>
    </Container>
  );
}

export default HeaderComponent;
