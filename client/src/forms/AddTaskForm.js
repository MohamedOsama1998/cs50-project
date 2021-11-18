import { TextField, Alert } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getFormData } from "../helpers";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Axios from "axios";

const AddTaskForm = () => {
  const initialValues = {
    title: "",
    text: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter task title"),
    text: Yup.string().required("Please enter task description"),
  });

  const onSubmit = (values, actions) => {
    Axios({
      method: "PUT",
      url: "/addtask",
      data: getFormData(values),

      headers: { withCredentials: true },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
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
              // variant="standard"
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
              // variant="standard"
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
