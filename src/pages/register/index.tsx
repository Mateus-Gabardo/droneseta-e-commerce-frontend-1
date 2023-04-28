import { useFormik } from 'formik';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { object, string } from 'yup';
import { toast } from 'react-hot-toast';
import { cpf } from 'cpf-cnpj-validator';
import { useNavigate } from 'react-router-dom';
import { useGetRegister } from '../../store/hooks/customerHooks';
import { removeMask } from '../../utils/removeMask';

function RegisterPage() {
  const REQUIRED = 'Campo obrigatório!';

  const getRegister = useGetRegister();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      senha: '',
      repetirSenha: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.senha !== values.repetirSenha) {
        toast.error('As duas senhas precisam ser iguais!');
        return;
      }
      if (!cpf.isValid(values.cpf)) {
        toast.error('O CPF precisa ser válido!');
        return;
      }
      if (values.senha.length < 8) {
        toast.error('A senha precisa conter 8 caracteres!');
        return;
      }
      try {
        getRegister({
          nome: values.nome,
          cpf: removeMask(values.cpf),
          senha: values.senha,
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error('Dados inválidos!');
        }
        return;
      }
      navigate('/login');
    },
    validationSchema: object().shape({
      nome: string().required(REQUIRED),
      cpf: string().required(REQUIRED),
      senha: string().required(REQUIRED),
      repetirSenha: string().required(REQUIRED),
    }),
  });

  const { values, handleChange, handleSubmit, errors, touched } = formik;

  return (
    <Container
      fluid
      style={{ width: '100vw', height: '100vh' }}
      className="d-flex justify-content-center align-items-center"
    >
      <Form
        onSubmit={handleSubmit}
        style={{
          width: '400px',
          backgroundColor: '#DEDEDE',
          borderRadius: '10px',
        }}
        className="p-3"
      >
        <Form.Group>
          <Form.Label>Nome: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome Completo"
            name="nome"
            value={values.nome}
            onChange={handleChange}
          />
          {errors.nome && touched.nome && (
            <Form.Text style={{ color: 'red' }}>{errors.nome}</Form.Text>
          )}
        </Form.Group>
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
        <Form.Group>
          <Form.Label>Repita a senha: </Form.Label>
          <Form.Control
            type="password"
            placeholder="****"
            name="repetirSenha"
            value={values.repetirSenha}
            onChange={handleChange}
          />
          {errors.repetirSenha && touched.repetirSenha && (
            <Form.Text style={{ color: 'red' }}>
              {errors.repetirSenha}
            </Form.Text>
          )}
        </Form.Group>
        <Row className="p-3">
          <Button variant="success" type="submit">
            Registrar
          </Button>
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default RegisterPage;
