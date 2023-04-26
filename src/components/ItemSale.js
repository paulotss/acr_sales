import { Link } from "react-router-dom";

const ItemSale = (props) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

  return (
    <Link
      to={`/profile/sale/${props.data.id}`}
      className="flex justify-between p-2 border border-gray-300 cursor-pointer"
    >
      <div className="w-12 h-12">
        <img
          src={`${BASE_URL}/static/${props.data.cover}`}
          className="w-12"
        />
      </div>
      <p className="text-left">{props.data.title}</p>
      <p>DD/MM/AAAA</p>
    </Link>
  )
}

export default ItemSale;