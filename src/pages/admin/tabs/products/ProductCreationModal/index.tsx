import { useFormik } from 'formik';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import { Product } from '../../../../../shared/@types/product';
import { usePostProduct } from '../../../../../store/hooks/productHooks';
import { ProductSizeOptions } from '../../../../../shared/constants';

interface ProductCreationModalProps {
  show: boolean;
  handleClose: () => void;
  handleUpdateProducts: () => void;
}

function ProductCreationModal({
  show,
  handleClose,
  handleUpdateProducts,
}: ProductCreationModalProps) {
  const postProduct = usePostProduct();
  const formik = useFormik({
    initialValues: {
      produtoId: '',
      nome: '',
      descricao: '',
      preco: 0,
      quantidade: 1,
      tamanhoCamiseta: '',
      imagem: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      try {
        handleSubmitForm(values);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    },
  });

  const handleSubmitForm = async (values: Product) => {
    const post = postProduct(values);
    toast.promise(post, {
      error: 'Falha ao criar produto.',
      loading: 'Criando produto...',
      success: 'Produto criado com sucesso!',
    });
    post.finally(() => {
      resetForm();
      handleClose();
      handleUpdateProducts();
    });
  };

  const { handleSubmit, values, handleChange, resetForm, setFieldValue } =
    formik;

  return (
    <Modal
      show={show}
      onHide={() => {
        resetForm();
        handleClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              name="nome"
              type="text"
              value={values.nome}
              onChange={handleChange}
              placeholder="Camiseta"
              required
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              name="descricao"
              value={values.descricao}
              onChange={handleChange}
              as="textarea"
              required
              rows={3}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Imagem</Form.Label>
                <Form.Control
                  name="imagem"
                  type="text"
                  value={values.imagem}
                  onChange={handleChange}
                  placeholder="camiseta1.png"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tamanho</Form.Label>
                <Select
                  options={ProductSizeOptions}
                  name="tamanhoCamiseta"
                  required
                  onChange={(value) =>
                    setFieldValue('tamanhoCamiseta', value?.value ?? '')
                  }
                  value={ProductSizeOptions.find(
                    (value) => value.value === values.tamanhoCamiseta
                  )}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  min={1}
                  name="preco"
                  type="text"
                  required
                  max={9999999}
                  value={values.preco}
                  onChange={handleChange}
                  placeholder="50"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  min={1}
                  name="quantidade"
                  type="number"
                  required
                  value={values.quantidade}
                  onChange={handleChange}
                  placeholder="1"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="border-top mt-2 pt-3 justify-content-end">
            <Col className="col-auto">
              <Button
                variant="secondary"
                onClick={() => {
                  resetForm();
                  handleClose();
                }}
              >
                Fechar
              </Button>
            </Col>
            <Col className="col-auto">
              <Button variant="success" type="submit">
                Criar produto
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProductCreationModal;
