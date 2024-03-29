import { Link } from "react-router-dom";

const ItemDisplay = (props) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  return (
    <Link to={ `/item/${props.id}` } className="m-3 w-64">
      <div
        className="w-64 h-48 bg-gray-300 rounded-lg"
      >
        <img
          src={ `https://tebas-bucket.s3.sa-east-1.amazonaws.com/${props.cover}` }
          className="object-contain w-64 h-48"
        />
      </div>
      <p className="text-green-900 mt-2">{ props.title }</p>
      <h4 className="text-green-900 text-xl font-bold">
        { props.price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) }
      </h4>
    </Link>
  );
};

export default ItemDisplay;