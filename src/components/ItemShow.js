import axios from '../http'
import whatsappIcon from '../media/whatsapp.png';

const ItemShow = (props) => {
  const { title, price, description, cover } = props;
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const getUser = async () => {

  }

  return (
    <article className="flex justify-center">
      <div
        className="shrink-0 h-96 w-96 m-2 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://tebas-bucket.s3.sa-east-1.amazonaws.com/${cover}")`
        }}
      >
      </div>
      <div>
        <p className="mb-3 text-2xl font-bold text-green-900">
          { price.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }) }
        </p>
        <p className="mb-3 text-xl font-bold text-green-900">{ title }</p>
        <p className="mb-3 text-green-900">{ description }</p>
        <div className="p-2 bg-gray-300 border-2 border-green-900">
          <p className="text-xl font-bold text-green-900">Pix: 06.196.928/0001-70</p>
          <p className="text-xl font-bold text-green-900">Nome: {props.userName}</p>
          <div className="font-bold text-green-900 mt-2 flex">
            <a
              href={`https://web.whatsapp.com/send?phone=55${props.userWhats}`}
              target="_blank"
              className="w-7 h-7 mr-1"
            >
              <img src={ whatsappIcon } />
            </a>
            <a
              href={`https://web.whatsapp.com/send?phone=55${props.userWhats}`}
              target="_blank"
            >
              (61) { props.userWhats }
            </a>
          </div>
        </div>
      </div>
    </article>
  )
};

export default ItemShow;