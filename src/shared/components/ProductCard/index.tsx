import { Button, Card } from 'react-bootstrap';
import { currencyFormat } from '../../../utils';
import { useAddCart } from '../../../store/hooks/sessionHooks';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  size: string;
}

function ProductCard({
  id,
  name,
  image,
  description,
  price,
  size,
}: ProductCardProps) {
  const addCart = useAddCart();

  const handleAddCart = () => {
    addCart({
      id,
      name,
      price,
      quantity: 1,
    });
  };

  return (
    <Card style={{ width: '280px' }}>
      <Card.Img
        className="p-5"
        variant="top"
        height="300px"
        src={`images/${image}`}
      />
      <Card.Body className="d-flex flex-column ">
        <Card.Title>
          {name} - {size}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text style={{ fontSize: '32px', color: 'green' }}>
          {currencyFormat(price)}
        </Card.Text>

        <Button
          variant="success"
          style={{ width: '100%' }}
          onClick={handleAddCart}
        >
          Comprar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
