import { useNavigate } from 'react-router-dom';
import deleteIcon from '../media/delete.png'
import editIcon from '../media/editar.png'

const ItemProfile = (props) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end items-center w-full border mb-2 h-14 rounded-lg">
      <div
        className="h-14 w-24 rounded-lg"
      >
        <img
          src={`https://tebas-bucket.s3.sa-east-1.amazonaws.com/${props.cover}`}
          alt=""
          className="h-14 w-32 object-cover rounded-lg"
        />
      </div>
      <div className="text-left w-full p-2 font-bold">{ props.title }</div>
      <div className="text-left w-32 p-2">
        { props.amount } <span className="italic">und.</span>
      </div>
      <div className="w-32 text-center">
        <button
          className="m-1"
          onClick={ () => { navigate(`/profile/adverts/edit/${props.id}`) } }
        >
          <img src={ editIcon } alt="" id={ props.id } className="w-7" />
        </button>
        <button
          className="m-1"
          onClick={ props.deleteAdvert }
        >
          <img src={ deleteIcon } alt="" id={ props.id } className="w-6" />
        </button>
      </div>
    </div>
  );
}

export default ItemProfile;