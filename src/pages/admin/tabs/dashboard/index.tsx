import { useEffect } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  useHideLoading,
  useLoading,
  useShowLoading,
} from '../../../../store/hooks/loadingHooks';
import Loading from '../../../../shared/components/Loading';
import {
  useBestSellers,
  useGetBestSellers,
} from '../../../../store/hooks/productHooks';
import { currencyFormat } from '../../../../utils';

function DashboardTab() {
  const isLoading = useLoading();
  const navigate = useNavigate();
  const products = useBestSellers();
  const getBestSellers = useGetBestSellers();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();

  const fetchBestSellers = async () => {
    showLoading();
    try {
      await getBestSellers();
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
    fetchBestSellers();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <Row style={{ fontSize: '24px', color: '#1976d2', fontWeight: 'bold' }}>
        Produtos mais vendidos
      </Row>
      <Row className="mt-3">
        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Imagem</th>
              <th>Tamanho</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product.produtoId}>
                  <td>{product.produtoId}</td>
                  <td>{product.nome}</td>
                  <td>{product.descricao}</td>
                  <td>{product.imagem}</td>
                  <td>{product.tamanhoCamiseta}</td>
                  <td>{currencyFormat(product.preco)}</td>
                  <td>{product.quantidade}x</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default DashboardTab;
