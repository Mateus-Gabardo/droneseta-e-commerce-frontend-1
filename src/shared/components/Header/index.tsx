import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../../images/entrega-drone.png';
import Cart from '../Cart';

function HeaderComponent() {
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
        <Col>
          <Row>
            <Col className="d-flex" xs="auto">
              <img src={Logo} alt="Drone carregando entrega" height="70px" />
            </Col>
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
            <Col className="d-flex" xs="auto">
              <img src={Logo} alt="Drone carregando entrega" height="70px" />
            </Col>
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
