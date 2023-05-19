import deleteIcon from '../media/delete.png'

const ItemProfile = (props) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  return (
    <div className="flex justify-end items-center w-full border mb-2 h-14 rounded-lg">
      <div
        className="h-14 w-24 rounded-lg"
      >
        <img
          src={`https://tebas-bucket.s3.sa-east-1.amazonaws.com/${props.cover}`}
          className="h-14 w-32 object-cover rounded-lg"
        />
      </div>
      <div className="text-left w-full p-2 font-bold">{ props.title }</div>
      <div className="text-left w-32 p-2">
        { props.amount } <span className="italic">und.</span>
      </div>
      <div className="w-24 text-center color-red">
        <button
          className="text-red-900"
          onClick={ props.deleteAdvert }
        >
          <img src={ deleteIcon } id={ props.id } />
        </button>
      </div>
    </div>
  );
}

export default ItemProfile;