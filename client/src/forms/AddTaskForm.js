import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions/tasksActions";
import { setSnackbar } from "../redux/actions/snackBarActions";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

const AddTaskForm = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    text: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter task title"),
    text: Yup.string().required("Please enter task description"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    dispatch(addTask(values))
      .then(() => {
        setSubmitting(false);
        dispatch(
          setSnackbar({
            isOpen: true,
            text: "Your new task has been added successfully",
            severity: "success",
          })
        );
        children.props.onClick();
      })
      .catch((err) => {
        if (err.response.status === 500) {
          navigate("/error", { replace: true });
        } else {
          setSubmitting(false);
          console.log(err);
        }
      });
  };

  return (
    <>
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
              label="Task title"
              type="text"
              name="title"
              required
              fullWidth
              value={values.title}
              error={
                errors.title && touched.title && values.title !== ""
                  ? true
                  : false
              }
              helperText={
                values.title !== "" ? <ErrorMessage name="title" /> : null
              }
            />
            <Field
              disabled={isSubmitting}
              as={TextField}
              margin="normal"
              label="Task description"
              type="text"
              name="text"
              required
              fullWidth
              multiline
              minRows={4}
              value={values.text}
              error={
                errors.text && touched.text && values.text !== "" ? true : false
              }
              helperText={
                values.text !== "" ? <ErrorMessage name="text" /> : null
              }
            />
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              variant="outlined"
              size="large"
              style={{
                marginRight: "10px",
              }}
            >
              Add
            </LoadingButton>
            {children}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddTaskForm;
