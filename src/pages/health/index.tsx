import { Button, Stack } from 'react-bootstrap';

function HealthPage() {
  return (
    <div>
      <Stack direction="horizontal" gap={2}>
        <Button as="a" variant="primary">
          Button as link
        </Button>
        <Button as="a" variant="success">
          Button as link
        </Button>
      </Stack>
    </div>
  );
}

export default HealthPage;
