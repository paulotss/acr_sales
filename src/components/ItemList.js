import { Link } from "react-router-dom";

const ItemList = (props) => {
  const { id, title, price, description, cover } = props;

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  return (
    <Link to={ `/item/${id}` } className="flex mb-5 flex-row">
      <div
        className="mr-5 w-1/3 h-64 bg-contain bg-center bg-no-repeat bg-gray-300 rounded-xl"
        style={{
          backgroundImage: `url("https://tebas-bucket.s3.sa-east-1.amazonaws.com/${cover}")`
        }}
      >
      </div>
      <div className="w-2/3">
        <div className="flex justify-start text-green-900">
          <h4 className="text-xl">{ title }</h4>
          <h2 className="font-bold text-2xl ml-3">
            { price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) }
          </h2>
        </div>
        <p className="text-green-900 text-sm w-80">{ description }</p>
      </div>
    </Link>
  )
};

export default ItemList;