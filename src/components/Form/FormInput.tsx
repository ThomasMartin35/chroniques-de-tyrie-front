// React Bootstrap
import Form from "react-bootstrap/Form";
// React Hook Form (Validation)
import type { UseFormRegisterReturn } from "react-hook-form";

///////////////////
//     Props     //
///////////////////

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  field: UseFormRegisterReturn;
}

///////////////////
//   Component   //
///////////////////

function FormInput({
  label,
  type = "text",
  placeholder,
  error,
  field,
}: FormInputProps) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>

      <Form.Control
        type={type}
        placeholder={placeholder}
        isInvalid={!!error}
        {...field}
      />

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default FormInput;
