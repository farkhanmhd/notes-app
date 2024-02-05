import bgImage from "../../assets/image/login.jpg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserForm } from "../../hooks/useUserForm";
import { useLanguage } from "../../hooks/useLanguage";
import { MdOutlineTranslate } from "react-icons/md";
import { ImSun } from "react-icons/im";
import { RiMoonClearLine } from "react-icons/ri";
import { useTheme } from "../../hooks/useTheme";

const UserForms = ({ type, onSubmit }) => {
  const { theme, switchTheme } = useTheme();
  const {
    name,
    email,
    password,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    confirmPassword,
    onConfirmPassword,
  } = useUserForm();
  const inputClass =
    "p-3 rounded-lg bg-slate-200 dark:bg-zinc-700 dark:text-white";
  const { language, switchLanguage } = useLanguage();

  let title, buttonText, accountText, link;

  if (type === "login") {
    title =
      language === "en"
        ? "Login to Capella"
        : "Masuk ke Capella";
    buttonText = language === "en" ? "Login" : "Masuk";
    accountText =
      language === "en" ? "Don't have an account?" : "Belum punya akun?";
    link = language === "en" ? "Register" : "Daftar";
  } else if (type === "register") {
    title =
      language === "en"
        ? "Register to Notes Application"
        : "Daftar ke Aplikasi Catatan";
    buttonText = language === "en" ? "Register" : "Daftar";
    accountText =
      language === "en" ? "Already have an account?" : "Sudah punya akun?";
    link = language === "en" ? "Login" : "Masuk";
  }

  const allowRegister =
    name === "" ||
    email === "" ||
    password.length < 6 ||
    password !== confirmPassword;

  const allowLogin = email === "" || password === "";

  const registerBtnCheck =
    name && email && password.length > 6 && password === confirmPassword
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-blue-300";

  const loginBtnCheck =
    email && password ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300";

  return (
    <div
      className={`${
        type === "login" ? "login-page" : "register-page"
      } w-screen h-screen duration-200 flex`}
    >
      <section
        className={`login-image h-full w-[calc(100%-600px)] bg-cover bg-no-repeat`}
        style={{ backgroundImage: `url(${bgImage})` }}
      ></section>
      <section className="login-form-section h-full w-[600px] flex justify-center items-center flex-col gap-10 dark:bg-black shadow-lg">
        <form className="flex flex-col w-4/6 gap-10" onSubmit={onSubmit}>
          <h1 className="self-start text-2xl font-bold dark:text-slate-200">
            {title}
          </h1>
          {type === "register" && (
            <input
              type="text"
              name="name"
              id="name"
              className={inputClass}
              placeholder={
                language === "en" ? "Enter your name" : "Masukkan nama Anda"
              }
              value={name}
              onChange={onNameChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            id="email"
            className={inputClass}
            placeholder={
              language === "en" ? "Enter your email" : "Masukkan email Anda"
            }
            value={email}
            onChange={onEmailChange}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            className={inputClass}
            placeholder={
              language === "en"
                ? "Enter your password"
                : "Masukkan kata sandi Anda"
            }
            value={password}
            onChange={onPasswordChange}
            required
          />
          {type === "register" && (
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              className={inputClass}
              placeholder={
                language === "en"
                  ? "Confirm your password"
                  : "Konfirmasi kata sandi Anda"
              }
              value={confirmPassword}
              onChange={onConfirmPassword}
              required
            />
          )}
          <button
            className={`${
              type === "login" ? loginBtnCheck : registerBtnCheck
            } text-white rounded-lg p-3 duration-[250ms]`}
            disabled={type === "login" ? allowLogin : allowRegister}
          >
            {buttonText}
          </button>
        </form>
        <p className="dark:text-slate-200">
          {accountText}{" "}
          <Link
            to={`/${type === "login" ? "register" : ""}`}
            className=" text-blue-500"
          >
            {link}
          </Link>
        </p>
        <div className="flex">
          <button
            className={`flex items-center text-black py-3 px-5 gap-3 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 duration-[250ms]`}
            onClick={switchLanguage}
          >
            <MdOutlineTranslate className="dark:text-slate-200" />
            <span className="dark:text-slate-200">
              {language === "en"
                ? "Switch to Indonesian"
                : "Ganti ke Bahasa Inggris"}
            </span>
          </button>
          <button
            className={`flex items-center  text-black py-3 px-5 gap-3 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 duration-[250ms]`}
            onClick={switchTheme}
          >
            {theme === "light" ? (
              <RiMoonClearLine className="dark:text-slate-200" />
            ) : (
              <ImSun className="dark:text-slate-200" />
            )}
            <span className="dark:text-slate-200">
              {language === "en" ? "Switch Theme" : "Ganti Tema"}
            </span>
          </button>
        </div>
        <p className=" dark:text-slate-200 text-sm">
          &#169; Copyright 2024 by{" "}
          <Link
            to={"https://github.com/farkhanmhd"}
            target="_blank"
            className="text-blue-500"
          >
            farkhanmhd
          </Link>
        </p>
      </section>
    </div>
  );
};

UserForms.propTypes = {
  type: PropTypes.oneOf(["login", "register"]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UserForms;
