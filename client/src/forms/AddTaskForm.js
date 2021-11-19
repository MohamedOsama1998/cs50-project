import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getFormData } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { addTask, toggleAddTaskModal } from "../redux/actions/tasksActions";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

const AddTaskForm = () => {
  const modal = useSelector(({ tasks }) => tasks.modal);
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    text: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter task title"),
    text: Yup.string().required("Please enter task description"),
  });

  const onSubmit = (values, actions) => {
    dispatch(addTask(getFormData(values)));
    dispatch(toggleAddTaskModal(modal));
    actions.setSubmitting(false);
    actions.resetForm();
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
              rows={4}
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
                marginTop: "20px",
              }}
            >
              Add
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddTaskForm;
