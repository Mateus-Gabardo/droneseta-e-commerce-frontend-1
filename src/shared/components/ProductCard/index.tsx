import { Button, Card } from 'react-bootstrap';
import { currencyFormat } from '../../../utils';

interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  price: number;
  size: string;
}

function ProductCard({
  name,
  image,
  description,
  price,
  size,
}: ProductCardProps) {
  console.log(`images/${image}`);
  return (
    <Card style={{ width: '280px' }}>
      <Card.Img variant="top" height="300px" src={`images/${image}`} />
      <Card.Body className="d-flex flex-column ">
        <Card.Title>
          {name} - {size}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text style={{ fontSize: '32px', color: 'green' }}>
          {currencyFormat(price)}
        </Card.Text>

        <Button variant="success" style={{ width: '100%' }}>
          Comprar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
