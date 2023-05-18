import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Offcanvas, Row, Table } from 'react-bootstrap';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCart, useRemoveCart } from '../../../store/hooks/sessionHooks';
import { currencyFormat } from '../../../utils';

function Cart() {
  const cart = useCart();
  const removeCart = useRemoveCart();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemoveCartItem = (index: number) => {
    removeCart(index);
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
            <Button variant="success" disabled={cart.length === 0}>
              Realizar pedido
            </Button>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
