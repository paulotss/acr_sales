import axios from 'axios';

const ItemProfile = (props) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  return (
    <div className="flex justify-between items-center w-full p-5 border">
      <div
        className="h-24 w-24 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://tebas-bucket.s3.sa-east-1.amazonaws.com/${props.cover}")`
        }}
      >
      </div>
      <div className="text-left w-full p-2">{ props.title }</div>
      <div className="text-left w-full p-2">Quant.: { props.amount }</div>
      <div className="w-24 text-center color-red">
        <button
          className="text-red-900"
          value={ props.id }
          onClick={ props.deleteAdvert }
        >
          del
        </button>
      </div>
    </div>
  );
}

export default ItemProfile;