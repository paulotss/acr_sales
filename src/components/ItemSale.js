import { Link } from "react-router-dom";
import useConvertDate from "../hooks/useConvertDate";

const ItemSale = (props) => {
  const { convertedDate } = useConvertDate(props.createdAt);

  return (
    <Link
      to={`/profile/sale/${props.data.id}`}
      className="flex justify-between p-2 border border-gray-300 cursor-pointer"
    >
      <div className="w-24">
        <img
          src={`https://tebas-bucket.s3.sa-east-1.amazonaws.com/${props.data.cover}`}
          className="w-24"
        />
      </div>
      <p className="text-left">{props.data.title}</p>
      <p>{convertedDate}</p>
    </Link>
  )
}

export default ItemSale;