import { cpf } from 'cpf-cnpj-validator';
import { useFormik } from 'formik';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useGetLogin } from '../../store/hooks/customerHooks';
import { removeMask } from '../../utils/removeMask';
import { useClearSession } from '../../store/hooks/sessionHooks';
import InitialScale from '../../shared/animations/InitialScale';

function LoginPage() {
  const REQUIRED = 'Campo obrigatório!';
  const navigate = useNavigate();
  const getLogin = useGetLogin();
  const clearSession = useClearSession();

  const formik = useFormik({
    initialValues: {
      cpf: '',
      senha: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const login = getLogin({
        cpf: removeMask(values.cpf),
        senha: values.senha,
      });
      toast.promise(login, {
        loading: 'Realizando login...',
        error: (error) => error.message,
        success: () => {
          navigate('/');
          return 'Login realizado com sucesso';
        },
      });
    },
    validationSchema: object().shape({
      cpf: string().required(REQUIRED),
      senha: string().required(REQUIRED),
    }),
  });

  useEffect(() => {
    clearSession();
  }, [clearSession]);

  const { values, handleChange, handleSubmit, errors, touched } = formik;

  return (
    <Container
      fluid
      style={{ width: '100vw', height: '100vh' }}
      className="d-flex justify-content-center align-items-center"
    >
      <InitialScale delay={0}>
        <Card style={{ width: '470px' }}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>CPF: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="000.000.000-00"
                  name="cpf"
                  maxLength={14}
                  value={values.cpf}
                  onChange={(event) => {
                    event.target.value = cpf.format(event.target.value);
                    handleChange(event);
                  }}
                />
                {errors.cpf && touched.cpf && (
                  <Form.Text style={{ color: 'red' }}>{errors.cpf}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Senha: </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="****"
                  name="senha"
                  value={values.senha}
                  onChange={handleChange}
                />
                {errors.senha && touched.senha && (
                  <Form.Text style={{ color: 'red' }}>{errors.senha}</Form.Text>
                )}
              </Form.Group>
              <Row className="border-top mt-3 pt-3 p-3">
                <Button variant="primary" type="submit">
                  Logar
                </Button>
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={() => navigate('/register')}
                >
                  Registrar
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </InitialScale>
    </Container>
  );
}

export default LoginPage;
