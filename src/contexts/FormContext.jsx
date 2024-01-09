import { createContext } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

const FormContext = createContext();

const UserFormProvider = ({ children }) => {
  const [name, onNameChange, setName] = useInput("");
  const [email, onEmailChange, setEmail] = useInput("");
  const [password, onPasswordChange, setPassword] = useInput("");
  const [confirmPassword, onConfirmPassword, setConfirmPassword] = useInput("");

  const values = {
    name,
    onNameChange,
    email,
    password,
    confirmPassword,
    onEmailChange,
    onPasswordChange,
    onConfirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
  };

  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};

UserFormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FormContext, UserFormProvider };
