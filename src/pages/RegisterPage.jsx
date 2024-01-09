import { register } from "../utils/api";
import { useUserForm } from "../hooks/useUserForm";
import UserForms from "../components/Forms/UserForms";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/Modal/Modal";

const RegisterPage = () => {
  const {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
  } = useUserForm();

  const navigate = useNavigate();

  const [modalState, setModalState] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  async function onRegister(event, { name, email, password }) {
    event.preventDefault();
    const registerResponse = await register({ name, email, password });
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMessage(registerResponse.responseJson.message);
    setModalState(true);

    if (registerResponse.error) {
      setTitle("Error");
      return;
    }
    setTitle("Success");
  }

  return (
    <>
      {modalState && (
        <Modal
          content={message}
          title={title}
          onClose={() => {
            setModalState(false);
            title === "Success" && navigate("/login");
          }}
        />
      )}
      <UserForms
        type="register"
        onSubmit={(e) => onRegister(e, { name, email, password })}
      />
    </>
  );
};

export default RegisterPage;
