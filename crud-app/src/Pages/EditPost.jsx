import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignupSchema } from "../Components/ValidationSchema/Validation";
import { editPosts, postsAction } from "../Store/postSlice";
import Loading from "../Components/Loading/Loading";
import usePostDetails from "../hooks/use-post-details";

export default function EditPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { record, loading, error } = usePostDetails();

  const formik = useFormik({
    initialValues: {
      title: record?.title || "",
      description: record?.description || "",
    },
    enableReinitialize: true,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(
        editPosts({
          id: record.id,
          title: values.title,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(postsAction.cleanRecord());
          navigate("/");
        })
        .catch((err) => console.error(err));
    },
  });

  const handleSubmitWithTouch = (e) => {
    e.preventDefault();
    formik.setTouched({ title: true, description: true });
    formik.handleSubmit(e);
  };

  if (loading || !record) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Loading loading={loading} error={error} />
      </div>
    );
  }

  return (
    <div className="py-5 backgound min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Form
              onSubmit={handleSubmitWithTouch}
              className="bg-white p-4 rounded shadow-sm"
            >
              <h2 className="text-center mb-4">Edit Post</h2>

              <Form.Group className="mb-3" controlId="editPostTitle">
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

              <Form.Group className="mb-4" controlId="editPostDescription">
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
