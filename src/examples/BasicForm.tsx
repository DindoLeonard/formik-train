import axios from 'axios';
import { Formik } from 'formik';

const BasicForm = () => (
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ email: '', password: '', file: '' }}
      validate={(values) => {
        console.log('values', values);
        const errors = {};
        // if (!values.email) {
        //   errors.email = 'Required';
        // } else if (
        //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        // ) {
        //   errors.email = 'Invalid email address';
        // }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          type KeyValue = typeof values;
          type Keys = keyof KeyValue;
          type Values = KeyValue[Keys];
          const valuesCopy: { [key: string]: Values } = values;

          formData.append(key, valuesCopy[key]);
        });

        // formData.append('file', values?.file);
        // formData.append('email', values?.email);
        // formData.append('password', values?.password);

        const result = await axios.post(
          'http://localhost:3500/upload-formik-test',
          formData
        );
        console.log('result', result);

        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <input
            type="file"
            name="file"
            onChange={(e) => {
              console.log('fileInput', e?.currentTarget?.files?.[0]);
              // setFieldValue('file', e?.target?.files?.[0]);
              setFieldValue('file', e?.currentTarget?.files?.[0]);
            }}
            onBlur={handleBlur}
            // value={values.file}
          />

          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default BasicForm;
