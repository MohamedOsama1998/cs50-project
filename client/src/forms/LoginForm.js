import { TextField, Alert } from "@mui/material";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { loginUser, setAuthError } from "../redux/actions/userActions";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

const LoginForm = () => {
  const [authErr, setAuthErr] = useState("");
  const dispatch = useDispatch();
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
    setAuthErr("");
    dispatch(loginUser(values))
      .then(() => {
        actions.setSubmitting(false);
      })
      .catch((err) => {
        setAuthErr(err);
        actions.setSubmitting(false);
      });
  };

  return (
    <>
      {authErr ? (
        <Alert
          severity="error"
          onClose={() => {
            dispatch(setAuthError(""));
          }}
        >
          {authErr}
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
              error={
                errors.email && touched.email && values.email !== ""
                  ? true
                  : false
              }
              helperText={
                values.email !== "" ? <ErrorMessage name="email" /> : null
              }
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
              error={
                errors.password && touched.password && values.password !== ""
                  ? true
                  : false
              }
              helperText={
                values.password !== "" ? <ErrorMessage name="password" /> : null
              }
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
