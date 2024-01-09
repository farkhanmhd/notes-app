import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

const NotFoundPage = () => {
  const { language } = useLanguage();
  return (
    <div className="error-page fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center text-gray-900 gap-y-5">
      <h1 className="text-5xl text-pink-700 font-bold">
        404 {language === "en" ? "Page Not Found" : "Halaman Tidak Ditemukan"}
      </h1>
      <p className="dark:text-slate-200">
        {language === "en" ? "Page Not Found" : "Halaman Tidak Ditemukan"}
      </p>
      <Link
        to={"/notes/"}
        className="bg-gray-100 text-gray-900 px-5 py-2 rounded-lg duration-[250ms] hover:bg-gray-300"
      >
        {language === "en" ? "Go Back" : "Kembali"}
      </Link>
    </div>
  );
};

export default NotFoundPage;
