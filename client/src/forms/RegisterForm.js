import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

const RegisterForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confPassword: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please enter a username"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Your password must be at least 8 characters long"),
    confPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const onSubmit = (values, actions) => {
    console.log(values);

    actions.setSubmitting(false);
  };

  return (
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
            label="Username"
            type="text"
            name="username"
            required
            fullWidth
            value={values.username}
            helperText={<ErrorMessage name="username" />}
            error={errors.username && touched.username ? true : false}
          ></Field>
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
          <Field
            disabled={isSubmitting}
            as={TextField}
            variant="standard"
            margin="normal"
            label="Confirm password"
            type="password"
            name="confPassword"
            required
            fullWidth
            value={values.confPassword}
            error={errors.confPassword && touched.confPassword ? true : false}
            helperText={<ErrorMessage name="confPassword" />}
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
            Register
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
