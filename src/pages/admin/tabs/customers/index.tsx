import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  useHideLoading,
  useLoading,
  useShowLoading,
} from '../../../../store/hooks/loadingHooks';
import {
  useCustomers,
  useDeleteCustomer,
  useGetCustomers,
} from '../../../../store/hooks/customerHooks';
import Loading from '../../../../shared/components/Loading';

function CustomersTab() {
  const isLoading = useLoading();
  const customers = useCustomers();
  const navigate = useNavigate();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const getCustomers = useGetCustomers();
  const deleteCustomer = useDeleteCustomer();

  const fetchCustomers = async () => {
    showLoading();
    try {
      await getCustomers();
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
    fetchCustomers();
  }, []);

  const handleDeleteCustomer = (customerId: string) => {
    const deletingCustomer = deleteCustomer(customerId);
    toast.promise(deletingCustomer, {
      error: 'Falha ao excluir pedido!',
      loading: 'Excluindo produto...',
      success: 'Pedido excluido com sucesso!',
    });
    deletingCustomer.finally(() => {
      fetchCustomers();
    });
  };

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
              <th>Tipo</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {customers &&
              customers.content &&
              customers.content.map((customer) => (
                <tr key={customer.clienteId}>
                  <td>{customer.clienteId}</td>
                  <td>{customer.nome}</td>
                  <td>{customer.cpf}</td>
                  <td>{customer.cartaoCredito}</td>
                  <td>{customer.tipoCliente}</td>
                  <td>
                    <Button
                      onClick={() =>
                        handleDeleteCustomer(customer.clienteId ?? '')
                      }
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
    </Container>
  );
}

export default CustomersTab;
