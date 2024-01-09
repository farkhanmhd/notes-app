import { useState } from "react";
import { login } from "../utils/api";
import { useUserForm } from "../hooks/useUserForm";
import UserForms from "../components/Forms/UserForms";
import PropTypes from "prop-types";
import Modal from "../components/Modal/Modal";

const LoginPage = ({ loginSuccess }) => {
  const { email, password, setEmail, setPassword } = useUserForm();
  const [modalState, setModalState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  async function onLogin(event, { email, password }) {
    event.preventDefault();
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    } else {
      setModalState(true);
      setErrorMessage(data);
    }
    setEmail("");
    setPassword("");
  }

  return (
    <>
      {modalState && (
        <Modal
          content={errorMessage}
          title={"Error"}
          onClose={() => setModalState(false)}
        />
      )}
      <UserForms
        type="login"
        onSubmit={(e) => onLogin(e, { email, password })}
      />
    </>
  );
};

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
