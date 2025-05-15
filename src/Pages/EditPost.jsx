import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import usePostDetails from "../hooks/use-post-details";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignupSchema } from "../Components/ValidationSchema/Validation";
import { editPosts, postsAction } from "../Store/postSlice";
import Loading from "../Components/Loading/Loading";

export default function EditPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { record ,loading,error} = usePostDetails();

  const formik = useFormik({
    initialValues: {
      title: record ? record?.title : "",
      description: record ? record?.description : "",
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
          className="container  bg-body p-5 rounded-4 w-50"
        >
          <h2 className="text-center mb-2">Edit Post</h2>

          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              isInvalid={!!formik.errors.title && formik.touched.title}
              onBlur={formik.handleBlur}
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
              onChange={formik.handleChange}
              value={formik.values.description}
              isInvalid={
                !!formik.errors.description && formik.touched.description
              }
              onBlur={formik.handleBlur}
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
