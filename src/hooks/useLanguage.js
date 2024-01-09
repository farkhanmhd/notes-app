import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

export const useLanguage = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const switchLanguage = () => {
    setLanguage(language === "en" ? "id" : "en");
    localStorage.setItem("language", language === "en" ? "id" : "en");
  };

  return { language, setLanguage, switchLanguage };
};
