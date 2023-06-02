import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TaskForm = () => {
  const [tasks, setTasks] = useState([]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required.'),
    description: Yup.string().required('Description is required.'),
  });

  const handleSubmit = (values, { resetForm }) => {
    setTasks([...tasks, values]);
    resetForm(); // Reset the form after submission

    console.log(values);
  };

  return (
    <div>
      <h1>Task Form</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>

      <Formik
        initialValues={{ title: '', description: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="title">Title:</label>
              <Field
                name="title"
                placeholder="Enter a title"
                type="text"
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="description">Description:</label>
              <Field
                name="description"
                placeholder="Enter a description"
                component="textarea"
              />
              <ErrorMessage name="description" component="div" className="error" />
            </div>

            <button type="submit" disabled={Object.keys(errors).length || !touched}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;