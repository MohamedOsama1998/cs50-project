import { TextField, Alert, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setAuthError, updateUserInfo } from "../redux/actions/userActions";
import * as Yup from "yup";

const EditField = ({ children }) => {
  const userInfo = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const initialValues = {
    username: userInfo.username,
    email: userInfo.email,
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please enter a username"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    password: Yup.string().required("Please enter you current password"),
  });

  const onSubmit = (values, actions) => {
    dispatch(setAuthError(""));
    dispatch(
      updateUserInfo({
        ...values,
        type: "updateInfo",
      })
    )
      .then(() => {
        actions.setSubmitting(false);
        children.props.onClick();
      })
      .catch(() => {
        actions.setSubmitting(false);
      });
  };

  return (
    <>
      {userInfo.authErr ? (
        <Alert
          severity="error"
          onClose={() => {
            dispatch(setAuthError(""));
          }}
          style={{
            marginBottom: "20px",
          }}
        >
          {userInfo.authErr}
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
                Username:{" "}
              </Typography>
              <Field
                as={TextField}
                autoComplete="off"
                variant="standard"
                type="text"
                name="username"
                required
                value={values.username}
                error={
                  errors.username && touched.username && values.username !== ""
                    ? true
                    : false
                }
                helperText={
                  values.username !== "" ? (
                    <ErrorMessage name="username" />
                  ) : null
                }
              />
            </div>
            <div style={{ marginBottom: "25px" }}>
              <Typography variant="h5" gutterBottom component="span">
                Email address:{" "}
              </Typography>
              <Field
                as={TextField}
                autoComplete="off"
                variant="standard"
                type="email"
                name="email"
                required
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
            </div>
            <div>
              <Typography variant="h5" gutterBottom component="span">
                Current password:{" "}
              </Typography>
              <Field
                as={TextField}
                autoComplete="off"
                variant="standard"
                type="password"
                name="password"
                placeholder="********"
                required
                value={values.password}
                error={
                  errors.password && touched.password && values.password !== ""
                    ? true
                    : false
                }
                helperText={
                  values.password !== "" ? (
                    <ErrorMessage name="password" />
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
              Save
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditField;
