import { Link } from "react-router-dom";

const Category = (props) => {
  return (
    <Link to="/" className="w-16 m-5 text-center">
      <div className="w-10 h-10 bg-white rotate-45 m-auto">
      </div>
      <p className="mt-3 text-sm text-white">{ props.name }</p>
    </Link>
  );
};

export default Category;