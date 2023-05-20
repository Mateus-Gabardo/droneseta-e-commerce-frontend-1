import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import Loading from '../../../../shared/components/Loading';
import {
  useHideLoading,
  useLoading,
  useShowLoading,
} from '../../../../store/hooks/loadingHooks';
import { useGetOrders, useOrders } from '../../../../store/hooks/orderHooks';

function OrdersTab() {
  const isLoading = useLoading();
  const orders = useOrders();
  const navigate = useNavigate();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const getOrders = useGetOrders();

  const fetchOrders = async () => {
    showLoading();
    try {
      await getOrders();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      navigate('/admin');
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <Row className="mt-4">
        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Cartão Crédito</th>
              <th>Total</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.content &&
              orders.content.map((order) => (
                <tr key={order.pedidoId}>
                  <td>{order.pedidoId}</td>
                  <td>{order.cliente.nome}</td>
                  <td>{order.cliente.cpf}</td>
                  <td>{order.cliente.cartaoCredito ?? 'Nenhum'}</td>
                  <td>
                    {order.produtos
                      .map((product) => product.preco)
                      .reduce((a, b) => a + b)}
                  </td>
                  <td>
                    <Button onClick={() => null} size="sm" variant="primary">
                      <FontAwesomeIcon icon={faTrash} /> Confirmar pedido
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

export default OrdersTab;
