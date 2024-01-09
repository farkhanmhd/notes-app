import NavigationLinks from "./NavigationLinks";
import { RiMenu2Fill, RiCloseLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { useLanguage } from "../../hooks/useLanguage";

const Navigation = ({ navState, setNav, onLogout }) => {
  const { language } = useLanguage();
  return (
    <aside
      className={`bg-gray-800 fixed top-0 left-0 bottom-0 ${
        navState ? "w-[300px]" : "w-[75px]"
      } overflow-hidden z-50 duration-[250ms]`}
    >
      <button
        onClick={setNav}
        className="w-[300px] px-7 py-3 flex items-center hover:bg-gray-700 duration-200"
      >
        {navState ? (
          <RiCloseLine className="text-2xl mr-7" onClick={setNav} />
        ) : (
          <RiMenu2Fill className="text-xl mr-8" onClick={setNav} />
        )}
        {language === "en" ? "Close Menu" : "Tutup Menu"}
      </button>

      <NavigationLinks onLogout={onLogout} />
    </aside>
  );
};

Navigation.propTypes = {
  navState: PropTypes.bool,
  setNav: PropTypes.func,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
