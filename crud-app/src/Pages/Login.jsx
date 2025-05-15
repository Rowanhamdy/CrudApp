import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { authActions } from "../Store/authSlice";
import { Col, Container, Row } from "react-bootstrap";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(4, "Too Short!").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.get(`http://localhost:3006/users`);
        const users = res.data;
        const matchedUser = users.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );
        if (matchedUser) {
          dispatch(authActions.login({ id: matchedUser.id }));
          navigate("/");
        } else {
          setLoginError("Invalid email or password");
        }
      } catch (error) {
        console.log(error);

        setLoginError("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <>
      <div className="backgound py-5  min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
            <Form
          onSubmit={formik.handleSubmit}
          className=" p-4 shadow rounded bg-white"
        >
          <h2 className="text-center mb-4">Login</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.email && formik.touched.email}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.password && formik.touched.password}
            />
            <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
          </Form.Group>
          {loginError && <div className="text-danger mb-3"> {loginError}</div>}
          <Button type="submit" className="border-0 bg-info">
            Submit
          </Button>
        </Form>
            </Col>
          </Row>
        </Container>
        
      </div>
    </>
  );
}
