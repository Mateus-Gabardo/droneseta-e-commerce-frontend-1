import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSession } from '../../store/hooks/sessionHooks';
import AdminTabs from './tabs';

function AdminPage() {
  const session = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!session || session.customer.tipoCliente !== 'ADM') {
      toast.error('Acesso negado.');
      navigate('/');
    }
  }, []);
  return (
    <Container fluid>
      <AdminTabs />
    </Container>
  );
}

export default AdminPage;
