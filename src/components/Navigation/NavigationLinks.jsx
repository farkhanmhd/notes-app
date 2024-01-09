import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { FaNoteSticky, FaBoxArchive } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineTranslate } from "react-icons/md";
import { ImSun } from "react-icons/im";
import { RiMoonClearLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";

const NavigationLinks = ({ onLogout }) => {
  const { language, switchLanguage } = useLanguage();
  const { theme, switchTheme } = useTheme();

  const linkClass =
    "flex items-center gap-x-8 text-lg pl-7 py-3 pr-10 hover:bg-gray-700 duration-200";

  return (
    <nav className="w-[300px]">
      <ul className="flex flex-col ">
        <li className={`w-[300px]`}>
          <Link to="/notes/new" className={linkClass}>
            <BiSolidEdit className="text-xl" />{" "}
            {language === "en" ? "New Note" : "Buat Catatan"}
          </Link>
        </li>

        <li className="w-[300px]">
          <Link to="/notes" className={linkClass}>
            <FaNoteSticky />{" "}
            {language === "en" ? "Active Notes" : "Catatan Aktif"}
          </Link>
        </li>
        <li className="w-[300px]">
          <Link to="/archived" className={linkClass}>
            <FaBoxArchive />{" "}
            {language === "en" ? "Archived Notes" : "Catatan Terarsip"}
          </Link>
        </li>
        <li className="w-[300px]">
          <button className={`${linkClass} w-[300px]`} onClick={switchLanguage}>
            <MdOutlineTranslate />{" "}
            {language === "en" ? "Switch Language" : "Ganti Bahasa"}
          </button>
        </li>
        <li className="w-[300px]">
          <button className={`${linkClass} w-[300px]`} onClick={switchTheme}>
            {theme === "light" ? <RiMoonClearLine /> : <ImSun />}{" "}
            {language === "en" ? "Switch Theme" : "Ganti Tema"}
          </button>
        </li>
        <li className="w-[300px]" onClick={onLogout}>
          <button className={`${linkClass} w-[300px]`}>
            <FiLogOut /> {language === "en" ? "Logout" : "Keluar"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

NavigationLinks.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default NavigationLinks;
