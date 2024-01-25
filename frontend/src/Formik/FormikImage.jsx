/* eslint-disable react/prop-types */
import axios from "axios";
import { Field } from "formik";
const FormikImage = ({
  name,
  label,
  type,
  onChange,
  required,
  setFieldValue,
  formik,
  ...props
}) => {
  // edit handleFile by self
  let handleFile = async (e, form) => {
    const formData = new FormData();
    let images = [...e.target.files];
    images.forEach((file, index) => {
      formData.append(`files`, file);
    });
    try {
      let result = await axios({
        url: "http://localhost:8000/files",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      form.setFieldValue("profileImage", result.data.result[0]);

    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Field name={name}>
        {({ field, form, meta }) => {
          return (
            <div className="mb-4">
              <label htmlFor={name} className="block text-sm text-gray-700">
                {label}
              </label>
              <input
                {...field}
                {...props}
                type="file"
                value=""
                id={name}
                onChange={(e) => handleFile(e, form)}
                className="w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
              {console.log(form.values.profileImage)}
              {<img src={form.values.profileImage}></img>}
              {meta.touched && meta.error ? (
                <div className="text-red-600 text-sm">{meta.error}</div>
              ) : null}
            </div>
          );
        }}
      </Field>
    </div>
  );
};
export default FormikImage;
