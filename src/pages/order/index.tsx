import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import StepBar from '../../shared/components/StepBar';
import { useGetOrder, useOrder } from '../../store/hooks/orderHooks';

function OrderPage() {
  const [step, setStep] = useState(0);
  const { orderId } = useParams();
  const order = useOrder();
  const getOrder = useGetOrder();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      setStep(handleGetStep(order?.status));
    }
  }, [order]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (order?.status !== 'FINALIZADO') {
      const interval = setInterval(fetchOrder, 30000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  const fetchOrder = async () => {
    try {
      await getOrder(orderId ?? '');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      navigate('/');
    }
  };

  const handleGetStep = (status: string): number => {
    switch (status) {
      case 'AGUARDANDO_PAGAMENTO':
        return 0;
      case 'AGUARDANDO_ENVIO':
        return 1;
      case 'SAIU_ENTREGA':
        return 2;
      case 'FINALIZADO':
        return 3;
      default:
        return 0;
    }
  };

  return (
    <Container
      fluid
      style={{ width: '100vw', height: '88.8vh' }}
      className="d-flex align-items-center justify-content-center"
    >
      <Col>
        <Row
          className="noGutters d-flex justify-content-center"
          style={{ fontWeight: 'bold' }}
        >
          {order &&
            `Endereço de entrega: 
            ${order.endereco.logradouro} - ${order.endereco.numero} 
            ${order.endereco.cidade}/${order.endereco.estado} [${order.endereco.cep}]`}
        </Row>
        <Row
          className="noGutters d-flex justify-content-center"
          style={{ fontSize: '24px', color: '#6D8B74', fontWeight: 'bold' }}
        >
          Seu pedido número: #{orderId}
        </Row>
        <Row className="mt-5">
          <StepBar step={step} />
        </Row>
      </Col>
    </Container>
  );
}

export default OrderPage;
