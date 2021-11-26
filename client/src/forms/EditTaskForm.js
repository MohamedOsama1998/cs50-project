import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { updateTaskContents } from "../redux/actions/tasksActions";
import { useDispatch } from "react-redux";

const EditTaskForm = ({ task, children }) => {
  const dispatch = useDispatch();
  const initialValues = {
    title: task.title,
    text: task.text,
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter task title"),
    text: Yup.string().required("Please enter task description"),
  });

  const onSubmit = (values, actions) => {
    dispatch(updateTaskContents({ ...values, taskID: task.taskID }))
      .then(() => {
        actions.setSubmitting(false);
        children.props.onClick();
      })
      .catch((err) => {
        actions.setSubmitting(false);
        console.log(err);
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
              color="success"
            >
              Confirm
            </LoadingButton>
            {children}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditTaskForm;
