import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Offcanvas, Row, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  useCart,
  useClearCart,
  useGetCart,
  useRemoveCart,
  useSession,
} from '../../../store/hooks/sessionHooks';
import { currencyFormat } from '../../../utils';
import { usePostOrder } from '../../../store/hooks/orderHooks';
import { useAddress, useGetAddress } from '../../../store/hooks/addressHooks';

function Cart() {
  const [show, setShow] = useState(false);
  const session = useSession();
  const cart = useCart();
  const address = useAddress();
  const getCart = useGetCart();
  const getAddress = useGetAddress();
  const clearCart = useClearCart();
  const removeCart = useRemoveCart();
  const postOrder = usePostOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      getCart();
      getAddress(session.customer.id ?? '');
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemoveCartItem = (index: number) => {
    removeCart(index);
  };

  const handleRequestOrder = () => {
    if (!session || !address) {
      toast.error('Falha ao buscar dados do cliente.');
    } else {
      toast.promise(
        postOrder({
          cpf: session.customer.cpf,
          enderecoId: address.id,
          produtoId: cart.map((item) => item.id),
          status: 'AGUARDANDO_ENVIO',
        }),
        {
          loading: 'Criando pedido...',
          success: (order) => {
            clearCart();
            handleClose();
            navigate(`/order/${order.pedidoId}`);
            return 'Pedido criado com sucesso!';
          },
          error: (error) => error.message,
        }
      );
    }
  };

  return (
    <>
      <Button onClick={handleShow} variant="outline-success">
        <FontAwesomeIcon icon={faCartShopping} />{' '}
        <Badge bg="success">{cart ? cart.length : 0}</Badge>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrinho</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Table striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr
                  key={uuidv4()}
                  className="tableRow"
                  onClick={() => handleRemoveCartItem(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{currencyFormat(item.price)}</td>
                  <td>{item.quantity}x</td>
                </tr>
              ))}
              {cart.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    Nenhum item no carrinho!
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Row className="m-3">
            <Button
              variant="success"
              onClick={handleRequestOrder}
              disabled={cart.length === 0}
            >
              Realizar pedido
            </Button>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
