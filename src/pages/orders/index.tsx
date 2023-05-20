import { Button, Container, Row, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  useConfirmOrder,
  useGetCustomerOrders,
  useOrders,
} from '../../store/hooks/orderHooks';
import { useSession } from '../../store/hooks/sessionHooks';
import {
  useHideLoading,
  useLoading,
  useShowLoading,
} from '../../store/hooks/loadingHooks';
import Loading from '../../shared/components/Loading';

function OrdersPage() {
  const getCustomerOrders = useGetCustomerOrders();
  const session = useSession();
  const orders = useOrders();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const navigate = useNavigate();
  const isLoading = useLoading();
  const confirmOrder = useConfirmOrder();

  const fetchOrders = async () => {
    showLoading();
    try {
      await getCustomerOrders(session?.customer.id ?? '');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      navigate('/');
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleConfirmOrder = (orderId: string) => {
    toast.promise(confirmOrder(orderId), {
      loading: 'Confirmando pagamento...',
      success: 'Pagamento confirmado com sucesso!',
      error: (error) => error.message,
    });
  };

  const handleSelectOrder = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <Row
        className="p-3"
        style={{ fontSize: '24px', color: '#6D8B74', fontWeight: 'bold' }}
      >
        Pedidos
      </Row>
      <Row className="m-3">
        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cartão Crédito</th>
              <th>Status</th>
              <th>Total</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.content &&
              orders.content.map((order) => (
                <tr
                  key={order.pedidoId}
                  onClick={() => handleSelectOrder(order.pedidoId)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{order.pedidoId}</td>
                  <td>{order.cliente.cartaoCredito ?? 'Nenhum'}</td>
                  <td>{order.status}</td>
                  <td>
                    {order.produtos
                      .map((product) => product.preco)
                      .reduce((a, b) => a + b)}
                  </td>
                  <td>
                    <Button
                      onClick={() => handleConfirmOrder(order.pedidoId)}
                      size="sm"
                      variant="primary"
                    >
                      <FontAwesomeIcon icon={faCheck} /> Confirmar pedido
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default OrdersPage;
