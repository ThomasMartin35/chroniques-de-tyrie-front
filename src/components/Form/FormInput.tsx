// React
import { useState } from "react";
// React Bootstrap
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
// React Hook Form (Validation)
import type { UseFormRegisterReturn } from "react-hook-form";
// Lucide Icons
import { Eye, EyeOff } from "lucide-react";
// Styles
import "./FormField.css";

///////////////////
//     Props     //
///////////////////

interface FormInputProps {
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  error?: string;
  field: UseFormRegisterReturn;
  showPasswordToggle?: boolean;
  helperText?: string;
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
  showPasswordToggle = false,
  helperText,
}: FormInputProps) {
  /**
   * State to manage the visibility of the password input. When true, the password will be shown as plain text; when false, it will be masked. This state is only relevant if showPasswordToggle is true and the input type is "password".
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Determine the input type based on the showPassword state and the provided type prop. If showPasswordToggle is true and showPassword is true, the input type will be "text" to reveal the password; otherwise, it will use the provided type (defaulting to "text").
   */
  const inputType = showPasswordToggle && showPassword ? "text" : type;

  ///////////////////
  //    Render     //
  ///////////////////
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>

      {showPasswordToggle && type === "password" ? (
        <InputGroup>
          <Form.Control
            type={inputType}
            placeholder={placeholder}
            isInvalid={!!error}
            {...field}
          />

          <button
            type="button"
            className="form-input__password-toggle"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </InputGroup>
      ) : (
        <>
          <Form.Control
            type={inputType}
            placeholder={placeholder}
            isInvalid={!!error}
            {...field}
          />

          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </>
      )}

      {helperText && <Form.Text className="text-muted">{helperText}</Form.Text>}
    </Form.Group>
  );
}

export default FormInput;
