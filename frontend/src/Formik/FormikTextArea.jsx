/* eslint-disable react/prop-types */
import { Field } from "formik";

const FormikTextArea = ({
  name,
  label,
  type,
  onChange,
  required,
  ...props
}) => {
  return (
    <div>
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <div>
              <label htmlFor={name}>
                {label}{" "}
                {required ? <span style={{ color: "red" }}>*</span> : null}
              </label>
              <textarea
                {...field}
                {...props}
                type={type}
                id={name}
                value={meta.value}
                onChange={onChange ? onChange : field.onChange}
              ></textarea>
              {meta.touched && meta.error ? (
                <div style={{ color: "red" }}>{meta.error}</div>
              ) : null}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default FormikTextArea;
