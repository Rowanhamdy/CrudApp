import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertPosts } from "../Store/postSlice";
import Loading from "../Components/Loading/Loading";
import { useFormik } from "formik";
import { SignupSchema } from "../Components/ValidationSchema/Validation";
import { Link } from "react-router-dom";
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
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const handleSubmitWithTouch = (e) => {
    e.preventDefault();
    formik.setTouched({ title: true, description: true });
    formik.handleSubmit(e);
  };
  return (
    <>
      <div className="backgound ">
        
        <Form
          onSubmit={handleSubmitWithTouch}
          className="container  bg-body p-5 rounded-4 w-75"
        >
            <div className="d-flex justify-content-between">
            <h2 className=" mb-2">Add Post</h2>
            <div className="d-flex">
            <Button className="nav mb-4 ps-2 me-2" variant="danger" as={Link} to="/logout">
          LogOut
        </Button>
        <Button className="nav mb-4 ps-2 " variant="warning" as={Link} to="/">
          Dashboard
        </Button>
            </div>
            
            </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.title && formik.touched.title}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                !!formik.errors.description && formik.touched.description
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Loading loading={loading} error={error}>
            <Button type="submit" className="border-0 bg-warning">
              Submit
            </Button>
          </Loading>
        </Form>
      </div>
    </>
  );
}
