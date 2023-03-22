import axios from 'axios';

const ItemProfile = (props) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  

  return (
    <div className="flex justify-between items-center w-full p-5 border">
      <div
        className="h-24 w-24 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${BASE_URL}/static/${props.cover}')`
        }}
      >
      </div>
      <div className="text-left w-full p-2">{ props.title }</div>
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