import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { FaNoteSticky, FaBoxArchive } from "react-icons/fa6";

const NavigationLinks = () => {
  const linkClass =
    "flex items-center gap-x-8 text-lg pl-7 py-3 pr-10 hover:bg-gray-700 duration-200";

  return (
    <nav className="w-[300px]">
      <ul className="flex flex-col ">
        <li className="w-[300px]">
          <Link to="/notes/new" className={linkClass}>
            <BiSolidEdit className="text-xl" /> New Notes
          </Link>
        </li>
        <li className="w-[300px]">
          <Link to="/notes" className={linkClass}>
            <FaNoteSticky /> Notes
          </Link>
        </li>
        <li className="w-[300px]">
          <Link to="/archived" className={linkClass}>
            <FaBoxArchive /> Archived
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationLinks;
