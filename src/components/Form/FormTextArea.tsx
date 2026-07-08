// React Boostrap
import Form from "react-bootstrap/Form";
// React Hook Form (Validation)
import type { UseFormRegisterReturn } from "react-hook-form";
// Styles
import "./FormField.css";

/////////////////////
//     Props       //
/////////////////////
interface FormTextareaProps {
  label: string;
  rows?: number;
  placeholder?: string;
  error?: string;
  helperText?: string;
  field: UseFormRegisterReturn;
}

//////////////////////
//    Component     //
//////////////////////
function FormTextarea({
  label,
  rows = 5,
  placeholder,
  error,
  helperText,
  field,
}: FormTextareaProps) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>

      <Form.Control
        as="textarea"
        rows={rows}
        placeholder={placeholder}
        isInvalid={!!error}
        {...field}
      />

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>

      {helperText && <Form.Text className="text-muted">{helperText}</Form.Text>}
    </Form.Group>
  );
}

export default FormTextarea;
