import { Container, Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <Container
      fluid
      style={{ height: '80vh', width: '100vw', position: 'absolute' }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner variant="success" style={{ width: '100px', height: '100px' }} />
    </Container>
  );
}

export default Loading;
