import { TextField, Alert } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getFormData } from "../helpers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { authUser } from "../redux/actions/userActions";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Axios from "axios";

const LoginForm = () => {
  const [err, setErr] = useState("");
  const userDispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Your password must be at least 8 characters long"),
  });

  const onSubmit = (values, actions) => {
    setErr("");
    Axios({
      method: "POST",
      url: "/login",
      data: getFormData(values),

      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        userDispatch(authUser(res.data));
        navigate("/tasks", { replace: true });
        actions.setSubmitting(false);
      })
      .catch((err) => {
        setErr(err.response.data.message);
        actions.setSubmitting(false);
      });
  };

  return (
    <>
      {err ? (
        <Alert
          severity="error"
          onClose={() => {
            setErr("");
          }}
        >
          {err}
        </Alert>
      ) : null}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, isSubmitting, touched, values }) => (
          <Form>
            <Field
              disabled={isSubmitting}
              as={TextField}
              autoComplete="off"
              margin="normal"
              variant="standard"
              label="Email"
              type="email"
              name="email"
              required
              fullWidth
              value={values.email}
              error={errors.email && touched.email ? true : false}
              helperText={<ErrorMessage name="email" />}
            />
            <Field
              disabled={isSubmitting}
              as={TextField}
              margin="normal"
              variant="standard"
              label="Password"
              type="password"
              name="password"
              required
              fullWidth
              value={values.password}
              error={errors.password && touched.password ? true : false}
              helperText={<ErrorMessage name="password" />}
            />
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              variant="outlined"
              size="large"
              style={{
                marginTop: "20px",
              }}
            >
              Login
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
