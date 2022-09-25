import { Link } from "react-router-dom";

const ItemDisplay = (props) => {
  return (
    <Link to="/" className="m-3">
      <div className="w-64 h-64 bg-gray-300"></div>
      <p className="text-green-900 mt-2">{ props.title }</p>
      <h4 className="text-green-900 text-xl font-bold">
        { props.price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) }
      </h4>
    </Link>
  );
};

export default ItemDisplay;