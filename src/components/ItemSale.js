import { Link } from "react-router-dom";
import useConvertDate from "../hooks/useConvertDate";

const ItemSale = (props) => {
  const { convertedDate } = useConvertDate(props.createdAt);

  return (
    <Link
      to={`/profile/sale/${props.data.id}`}
      className="flex justify-start items-center mb-2 border rounded-lg h-14 cursor-pointer hover:bg-gray-100"
    >
      <div className="h-14 w-24">
        <img
          src={`https://tebas-bucket.s3.sa-east-1.amazonaws.com/${props.data.cover}`}
          className="h-14 w-24 object-cover rounded-lg"
        />
      </div>
      <p className="text-left p-2 w-full font-bold">{props.data.title}</p>
      <p className="w-72 italic">{convertedDate}</p>
    </Link>
  )
}

export default ItemSale;