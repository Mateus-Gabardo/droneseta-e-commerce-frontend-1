import { useFormik } from 'formik';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { object, string } from 'yup';
import { toast } from 'react-hot-toast';
import { cpf } from 'cpf-cnpj-validator';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetRegister } from '../../store/hooks/customerHooks';
import { removeMask } from '../../utils/removeMask';
import { useClearSession } from '../../store/hooks/sessionHooks';
import InitialScale from '../../shared/animations/InitialScale';

function RegisterPage() {
  const REQUIRED = 'Campo obrigatório!';
  const navigate = useNavigate();
  const getRegister = useGetRegister();
  const clearSession = useClearSession();

  const formik = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      senha: '',
      repetirSenha: '',
      cartaoCredito: '',
      endereco: {
        bairro: '',
        cep: '',
        cidade: '',
        complemento: '',
        estado: '',
        clienteId: '',
        logradouro: '',
        numero: null,
      },
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
        const register = getRegister({
          nome: values.nome,
          cpf: removeMask(values.cpf),
          senha: values.senha,
          cartaoCredito: values.cartaoCredito,
          endereco: {
            ...values.endereco,
            numero: values.endereco.numero ?? 0,
            cep: values.endereco.cep.replace('-', ''),
          },
        });
        toast.promise(register, {
          loading: 'Registrando...',
          error: (error) => error.message,
          success: () => {
            navigate('/');
            return 'Cadastro realizado com sucesso!';
          },
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error('Dados inválidos!');
        }
      }
    },
    validationSchema: object().shape({
      nome: string().required(REQUIRED),
      cpf: string().required(REQUIRED),
      senha: string().required(REQUIRED),
      repetirSenha: string().required(REQUIRED),
      cartaoCredito: string().required(REQUIRED),
      endereco: object().shape({
        bairro: string().required(REQUIRED),
        cep: string().required(REQUIRED),
        cidade: string().required(REQUIRED),
        complemento: string(),
        estado: string().required(REQUIRED),
        logradouro: string().required(REQUIRED),
        numero: string().required(REQUIRED),
      }),
    }),
  });

  useEffect(() => {
    clearSession();
  }, [clearSession]);

  const { values, handleChange, handleSubmit, errors, touched } = formik;

  return (
    <Container
      fluid
      style={{ height: '100vh', width: '100vw' }}
      className="noGutters d-flex justify-content-center align-items-center"
    >
      <InitialScale delay={0}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome Completo"
                      name="nome"
                      value={values.nome}
                      onChange={handleChange}
                    />
                    {errors.nome && touched.nome && (
                      <Form.Text style={{ color: 'red' }}>
                        {errors.nome}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>CPF</Form.Label>
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
                      <Form.Text style={{ color: 'red' }}>
                        {errors.cpf}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Cartão</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      name="cartaoCredito"
                      maxLength={19}
                      value={values.cartaoCredito}
                      onChange={handleChange}
                    />
                    {errors.cartaoCredito && touched.cartaoCredito && (
                      <Form.Text style={{ color: 'red' }}>
                        {errors.cartaoCredito}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=""
                      name="senha"
                      value={values.senha}
                      onChange={handleChange}
                    />
                    {errors.senha && touched.senha && (
                      <Form.Text style={{ color: 'red' }}>
                        {errors.senha}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Repita a senha: </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=""
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
                </Col>
              </Row>
              <Row className="border-top pt-3 mt-3">
                <Col>
                  <Form.Group>
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="00000-000"
                      name="endereco.cep"
                      value={values.endereco.cep}
                      onChange={handleChange}
                    />
                    {errors.endereco?.cep && touched.endereco?.cep && (
                      <Form.Text style={{ color: 'red' }}>
                        {errors.endereco.cep}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Estado"
                      name="endereco.estado"
                      value={values.endereco.estado}
                      onChange={handleChange}
                    />
                    {errors.endereco?.estado && touched.endereco?.estado && (
                      <Form.Text style={{ color: 'red' }}>
                        {errors.endereco.estado}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cidade"
                      name="endereco.cidade"
                      value={values.endereco.cidade}
                      onChange={handleChange}
                    />
                    {errors.endereco?.cidade && touched.endereco?.cidade && (
                      <Form.Text style={{ color: 'red' }}>
                        {errors.endereco.cidade}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Bairro"
                      name="endereco.bairro"
                      value={values.endereco.bairro}
                      onChange={handleChange}
                    />
                    {errors.endereco?.bairro && touched.endereco?.bairro && (
                      <Form.Text style={{ color: 'red' }}>
                        {errors.endereco.bairro}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Rua</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Rua"
                      name="endereco.logradouro"
                      value={values.endereco.logradouro}
                      onChange={handleChange}
                    />
                    {errors.endereco?.logradouro &&
                      touched.endereco?.logradouro && (
                        <Form.Text style={{ color: 'red' }}>
                          {errors.endereco.logradouro}
                        </Form.Text>
                      )}
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Número</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="10"
                      name="endereco.numero"
                      value={values.endereco.numero ?? ''}
                      onChange={handleChange}
                    />
                    {errors.endereco?.numero && touched.endereco?.numero && (
                      <Form.Text style={{ color: 'red' }}>
                        {errors.endereco.numero}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="endereco.complemento"
                  value={values.endereco.complemento}
                  onChange={handleChange}
                />
                {errors.endereco?.complemento &&
                  touched.endereco?.complemento && (
                    <Form.Text style={{ color: 'red' }}>
                      {errors.endereco.complemento}
                    </Form.Text>
                  )}
              </Form.Group>
              <Row className="border-top mt-3 p-3">
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
          </Card.Body>
        </Card>
      </InitialScale>
    </Container>
  );
}

export default RegisterPage;
