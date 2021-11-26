import { TextField, Alert, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setAuthError, updateUserPassword } from "../redux/actions/userActions";
import * as Yup from "yup";

const ChangePasswordForm = ({ children }) => {
  const [authErr, setAuthErr] = useState("");
  const dispatch = useDispatch();
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Please your old password"),
    newPassword: Yup.string()
      .required("Please enter your new password")
      .min(8, "Your password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const onSubmit = (values, actions) => {
    setAuthErr("");
    dispatch(updateUserPassword(values))
      .then(() => {
        actions.setSubmitting(false);
        children.props.onClick();
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
          style={{
            marginBottom: "20px",
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
        {({ errors, touched, values, isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: "25px" }}>
              <Typography variant="h5" gutterBottom component="span">
                Current password:{" "}
              </Typography>
              <Field
                as={TextField}
                autoComplete="off"
                variant="standard"
                type="password"
                name="oldPassword"
                placeholder="********"
                required
                value={values.oldPassword}
                error={
                  errors.oldPassword &&
                  touched.oldPassword &&
                  values.oldPassword !== ""
                    ? true
                    : false
                }
                helperText={
                  values.oldPassword !== "" ? (
                    <ErrorMessage name="oldPassword" />
                  ) : null
                }
              />
            </div>
            <div style={{ marginBottom: "25px" }}>
              <Typography variant="h5" gutterBottom component="span">
                New password:{" "}
              </Typography>
              <Field
                as={TextField}
                autoComplete="off"
                variant="standard"
                type="password"
                name="newPassword"
                placeholder="********"
                required
                value={values.newPassword}
                error={
                  errors.newPassword &&
                  touched.newPassword &&
                  values.newPassword !== ""
                    ? true
                    : false
                }
                helperText={
                  values.newPassword !== "" ? (
                    <ErrorMessage name="newPassword" />
                  ) : null
                }
              />
            </div>
            <div>
              <Typography variant="h5" gutterBottom component="span">
                Confirm new password:{" "}
              </Typography>
              <Field
                as={TextField}
                autoComplete="off"
                variant="standard"
                type="password"
                name="confirmPassword"
                placeholder="********"
                required
                value={values.confirmPassword}
                error={
                  errors.confirmPassword &&
                  touched.confirmPassword &&
                  values.confirmPassword !== ""
                    ? true
                    : false
                }
                helperText={
                  values.confirmPassword !== "" ? (
                    <ErrorMessage name="confirmPassword" />
                  ) : null
                }
              />
            </div>
            {children}
            <LoadingButton
              type="submit"
              variant="outlined"
              size="large"
              style={{
                marginTop: "20px",
              }}
              color="success"
              loading={isSubmitting}
            >
              confirm
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordForm;
