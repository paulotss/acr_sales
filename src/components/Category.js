import { Link } from "react-router-dom";

const Category = (props) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  return (
    <Link
      to={ `/search/${ props.id }` }
      className="w-16 m-5 text-center flex flex-col justify-center items-center"
    >
      <div className="w-10 h-10">
        <img
          src={`${BASE_URL}/static/${props.urlImage}`}
          className="w-10 h-10"
        />
      </div>
      <p className="mt-3 text-sm text-white">{ props.title }</p>
    </Link>
  );
};

export default Category;