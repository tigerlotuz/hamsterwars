import { Field } from "formik";
import { TextField } from "@mui/material";
import { AnyObject } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

interface Props {
  name: string;
  label: string;
}

const TextFieldWrapper = ({ name, label }: Props) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: AnyObject) => (
        <>
          <TextField
            {...field}
            label={label}
            variant="outlined"
            error={meta && meta.touched && meta.error ? true : false}
            helperText={meta && meta.touched && meta.error ? meta.error : ""}
          />
        </>
      )}
    </Field>
  );
};

export default TextFieldWrapper;
