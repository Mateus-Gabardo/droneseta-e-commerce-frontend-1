import { Container } from 'react-bootstrap';

function Loading() {
  return (
    <Container
      fluid
      style={{ height: '100vh', width: '100vw' }}
      className="justify-content-center align-items-center"
    >
      carregando...
    </Container>
  );
}

export default Loading;
