import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useGetProducts, useProducts } from '../../store/hooks/productHooks';
import {
  useHideLoading,
  useLoading,
  useShowLoading,
} from '../../store/hooks/loadingHooks';
import Loading from '../../shared/components/Loading';
import ProductCard from '../../shared/components/ProductCard';

function HomePage() {
  const products = useProducts();
  const getProducts = useGetProducts();
  const isLoading = useLoading();
  const hideLoading = useHideLoading();
  const showLoading = useShowLoading();

  useEffect(() => {
    const fetchProducts = async () => {
      showLoading();
      try {
        await getProducts();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        hideLoading();
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <Row className="p-5 justify-content-around">
        {products &&
          products.content.map((product) => (
            <ProductCard
              id={product.produtoId}
              key={product.descricao}
              name={product.nome}
              image={product.imagem}
              description={product.descricao}
              price={product.preco}
              size={product.tamanhoCamiseta}
            />
          ))}
      </Row>
    </Container>
  );
}

export default HomePage;
