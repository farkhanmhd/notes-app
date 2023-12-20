import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="error-page fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center text-gray-900 gap-y-5">
      <h1 className="text-4xl text-pink-700 font-bold">404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link
        to={"/notes/"}
        className="bg-gray-100 text-gray-900 px-5 py-2 rounded-lg duration-[250ms] hover:bg-gray-300"
      >
        Back to HomePage
      </Link>
    </div>
  );
};

export default NotFoundPage;
