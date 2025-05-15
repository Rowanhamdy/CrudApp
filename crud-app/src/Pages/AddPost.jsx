import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { insertPosts } from "../Store/postSlice";
import Loading from "../Components/Loading/Loading";
import { useFormik } from "formik";
import { SignupSchema } from "../Components/ValidationSchema/Validation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AddPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.posts);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * 500);
      dispatch(
        insertPosts({
          id,
          title: values.title,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    },
  });

  const handleSubmitWithTouch = (e) => {
    e.preventDefault();
    formik.setTouched({ title: true, description: true });
    formik.handleSubmit(e);
  };

  return (
    <div className="py-5 backgound min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Form
              onSubmit={handleSubmitWithTouch}
              className="bg-white p-4 rounded shadow-sm"
            >
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                <h2 className="mb-3 mb-md-0">Add Post</h2>
                <div className="d-flex gap-2">
                  <Button
                    variant="danger"
                    className="text-white"
                    as={Link}
                    to="/logout"
                  >
                    Log Out
                  </Button>
                  <Button variant="light" as={Link} to="/">
                    Dashboard
                  </Button>
                </div>
              </div>

              <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter post title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.title && !!formik.errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="postDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  placeholder="Enter description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.description && !!formik.errors.description
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Loading loading={loading} error={error}>
                <Button type="submit" variant="info" className="w-100">
                  Submit
                </Button>
              </Loading>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
