import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";

export const useUserForm = () => {
  const {
    name,
    onNameChange,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    confirmPassword,
    onConfirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
  } = useContext(FormContext);

  return {
    name,
    onNameChange,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    confirmPassword,
    onConfirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
  };
};

export default useUserForm;
