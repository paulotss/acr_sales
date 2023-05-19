import useConvertDate from "../hooks/useConvertDate";

const ItemRequest = (props) => {
  const { convertedDate } = useConvertDate(props.createdAt);

  return (
    <div className="flex justify-start items-center mb-2 border border h-14 rounded-lg">
      <div className="h-14 w-24">
        <img
          src={`https://tebas-bucket.s3.sa-east-1.amazonaws.com/${props.data.cover}`}
          className="h-14 w-24 object-cover rounded-lg"
        />
      </div>
      <p className="text-left p-2 font-bold w-full">{props.data.title}</p>
      <p className="w-72 italic p-2">{convertedDate}</p>
    </div>
  )
}

export default ItemRequest;