import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  useDeleteProduct,
  useGetProducts,
  useProducts,
} from '../../../../store/hooks/productHooks';
import {
  useHideLoading,
  useLoading,
  useShowLoading,
} from '../../../../store/hooks/loadingHooks';
import Loading from '../../../../shared/components/Loading';
import ProductCreationModal from './ProductCreationModal';
import { currencyFormat } from '../../../../utils';

function ProductsTab() {
  const [show, setShow] = useState(false);
  const isLoading = useLoading();
  const products = useProducts();
  const navigate = useNavigate();
  const getProducts = useGetProducts();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const deleteproduct = useDeleteProduct();

  const fetchProducts = async () => {
    showLoading();
    try {
      getProducts();
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
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    const deleteProduct = deleteproduct(productId);
    toast.promise(deleteProduct, {
      error: 'Falha ao excluir pedido!',
      loading: 'Excluindo produto...',
      success: 'Pedido excluido com sucesso!',
    });
    deleteProduct.finally(() => {
      fetchProducts();
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      <Row className="justify-content-end">
        <Button
          style={{ width: '150px' }}
          variant="outline-success"
          onClick={() => setShow(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Novo produto
        </Button>
      </Row>
      <Row className="mt-4">
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
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.content &&
              products.content.map((product) => (
                <tr key={product.produtoId}>
                  <td>{product.produtoId}</td>
                  <td>{product.nome}</td>
                  <td>{product.descricao}</td>
                  <td>{product.imagem}</td>
                  <td>{product.tamanhoCamiseta}</td>
                  <td>{currencyFormat(product.preco)}</td>
                  <td>{product.quantidade}x</td>
                  <td>
                    <Button
                      onClick={() => handleDeleteProduct(product.produtoId)}
                      size="sm"
                      variant="danger"
                    >
                      <FontAwesomeIcon icon={faTrash} /> Excluir
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
      <ProductCreationModal
        show={show}
        handleClose={() => setShow(false)}
        handleUpdateProducts={() => fetchProducts()}
      />
    </Container>
  );
}

export default ProductsTab;
