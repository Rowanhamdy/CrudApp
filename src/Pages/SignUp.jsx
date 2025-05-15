// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SignUp() {
  const navigate = useNavigate();
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
        const response = await fetch(
          `http://localhost:3006/users?email=${values.email}`
        );
        const checkUsers = await response.json();
        if (checkUsers.length > 0) {
          alert("Email already registered. Please use a different email.");
          return;
        }

        await fetch("http://localhost:3006/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        console.log(response);

        alert("User registered successfully!");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="backgound  ">
      <Form
        onSubmit={formik.handleSubmit}
        className="container  bg-body p-5 rounded-4 w-50 "
      >
        <h2 className="text-center">Sign Up</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.email && formik.touched.email}
            onBlur={formik.handleBlur}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
        <Button variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
