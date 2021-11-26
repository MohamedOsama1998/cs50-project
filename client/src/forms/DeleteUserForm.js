import {
  TextField,
  Alert,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { checkUserPassword, deleteUser } from "../redux/actions/userActions";
import * as Yup from "yup";

const DeleteUserForm = ({ children }) => {
  const [authErr, setAuthErr] = useState("");
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    password: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Please your old password"),
  });

  const onSubmit = (values, actions) => {
    setAuthErr("");
    dispatch(checkUserPassword(values))
      .then(() => {
        setDialog(true);
        actions.setSubmitting(false);
      })
      .catch((err) => {
        actions.setSubmitting(false);
        setAuthErr(err);
      });
  };

  const handleDelete = () => {
    dispatch(deleteUser()).catch((err) => {
      setLoading(false);
      console.log(err);
    });
  };

  return (
    <>
      {authErr ? (
        <Alert
          severity="error"
          onClose={() => {
            setAuthErr("");
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
              color="error"
              loading={isSubmitting}
            >
              delete
            </LoadingButton>
          </Form>
        )}
      </Formik>
      <Dialog
        open={dialog}
        onClose={() => {
          setDialog(false);
        }}
      >
        <DialogTitle>Delete account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? <br />
            You will permanently lose access to this account and lose all your
            data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={() => {
              setDialog(false);
            }}
            autoFocus
            loading={loading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton onClick={handleDelete} color="error" loading={loading}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteUserForm;
