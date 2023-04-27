const ItemRequest = (props) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

  return (
    <div className="flex justify-between p-2 border border-gray-300">
      <div className="w-24">
        <img
          src={`https://tebas-bucket.s3.sa-east-1.amazonaws.com/${props.data.cover}`}
          className="w-24"
        />
      </div>
      <p className="text-left">{props.data.title}</p>
      <p>DD/MM/AAAA</p>
    </div>
  )
}

export default ItemRequest;