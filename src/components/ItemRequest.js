import useConvertDate from "../hooks/useConvertDate";

const ItemRequest = (props) => {
  const { convertedDate } = useConvertDate(props.createdAt);

  return (
    <div className="flex justify-between p-2 border border-gray-300">
      <div className="w-24">
        <img
          src={`https://tebas-bucket.s3.sa-east-1.amazonaws.com/${props.data.cover}`}
          className="w-24"
        />
      </div>
      <p className="text-left">{props.data.title}</p>
      <p>{convertedDate}</p>
    </div>
  )
}

export default ItemRequest;