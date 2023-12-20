import NavigationLinks from "./NavigationLinks";

const Navigation = () => {
  return (
    <aside className="bg-gray-800 fixed top-0 left-0 bottom-0 w-[75px] lg:w-[300px] overflow-hidden z-50 duration-[250ms]">
      <NavigationLinks />
    </aside>
  );
};

export default Navigation;
