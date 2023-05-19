import { Col, Container, Row } from 'react-bootstrap';
import StepBar from '../../shared/components/StepBar';

function OrderPage() {
  return (
    <Container
      fluid
      style={{ width: '100vw', height: '88.8vh' }}
      className="d-flex align-items-center justify-content-center"
    >
      <Col>
        <Row
          className="noGutters d-flex justify-content-center"
          style={{ fontSize: '24px', color: '#6D8B74', fontWeight: 'bold' }}
        >
          Seu pedido número: #9434934
        </Row>
        <Row className="mt-5">
          <StepBar />
        </Row>
      </Col>
    </Container>
  );
}

export default OrderPage;
