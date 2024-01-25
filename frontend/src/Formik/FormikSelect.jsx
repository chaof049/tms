/* eslint-disable react/prop-types */
import { Field } from "formik";

const FormikSelect = ({
  name,
  label,
  onChange,
  required,
  options,
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
              <select
                {...field}
                {...props}
                id={name}
                value={meta.value}
                onChange={onChange ? onChange : field.onChange}
              >
                {options.map((item, i) => {
                  return (
                    <option key={i} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
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

export default FormikSelect;
