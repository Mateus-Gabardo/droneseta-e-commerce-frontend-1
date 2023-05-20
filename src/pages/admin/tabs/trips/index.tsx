import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { useGetTrips, useTrips } from '../../../../store/hooks/tripHooks';
import {
  useHideLoading,
  useLoading,
  useShowLoading,
} from '../../../../store/hooks/loadingHooks';
import Loading from '../../../../shared/components/Loading';

function TripsTab() {
  const isLoading = useLoading();
  const trips = useTrips();
  const navigate = useNavigate();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const getTrips = useGetTrips();

  const fetchTrips = async () => {
    showLoading();
    try {
      await getTrips();
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
    fetchTrips();
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
              <th>Status</th>
              <th>Quantidade de camisetas</th>
            </tr>
          </thead>
          <tbody>
            {trips &&
              trips.content &&
              trips.content.map((trip) => (
                <tr key={trip.viagemId}>
                  <td>{trip.viagemId}</td>
                  <td>{trip.status}</td>
                  <td>{trip.qtdCamisetas}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default TripsTab;
