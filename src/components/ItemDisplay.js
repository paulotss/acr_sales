import { Link } from "react-router-dom";

const ItemDisplay = (props) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  return (
    <Link to={ `/item/${props.id}` } className="m-3 w-64">
      <div
        className="w-64 h-64 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BASE_URL}/static/${props.cover})`
        }}

      >
      </div>
      <p className="text-green-900 mt-2">{ props.title }</p>
      <h4 className="text-green-900 text-xl font-bold">
        { props.price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) }
      </h4>
    </Link>
  );
};

export default ItemDisplay;